// Migrate the hardcoded Fauja Singh results (src/data/fauja-singh-results.ts)
// into Contentful: one CSV asset + one Fauja Results Year entry per year.
// The data file rows were generated with a fixed shape, which this script
// parses directly. Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/16-seed-fauja-results.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { api, getVersion, uploadBinary, LOCALE as L, sleep } from "../lib/cma.mjs";

const DATA = fileURLToPath(new URL("../../src/data/fauja-singh-results.ts", import.meta.url));

/** Parse the generated data file into { year: rows[] }. */
async function loadRows() {
  const src = await readFile(DATA, "utf8");
  const byYear = {};
  let year = null;
  for (const line of src.split(/\r?\n/)) {
    const y = line.match(/^  (\d{4}): \[$/);
    if (y) {
      year = Number(y[1]);
      byYear[year] = [];
      continue;
    }
    const r = line.match(
      /\{ name: "((?:[^"\\]|\\.)*)", laps: (\d+), distance: "([^"]*)", time: "([^"]*)" \}/
    );
    if (r && year != null) {
      byYear[year].push({
        name: JSON.parse(`"${r[1]}"`),
        laps: Number(r[2]),
        distance: r[3],
        time: r[4],
      });
    }
  }
  return byYear;
}

/** RFC4180-style CSV field escaping. */
const esc = (v) => {
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

function toCsv(rows) {
  const lines = ["Name,Laps,Distance,Time"];
  for (const r of rows) lines.push([r.name, r.laps, r.distance, r.time].map(esc).join(","));
  return lines.join("\r\n") + "\r\n";
}

async function upsertCsvAsset(id, title, csvText) {
  const upload = await uploadBinary(Buffer.from(csvText, "utf8"));
  const body = {
    fields: {
      title: { [L]: title },
      file: {
        [L]: {
          contentType: "text/csv",
          fileName: `${id}.csv`,
          uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } },
        },
      },
    },
  };
  // On re-runs the asset already has a URL from the previous upload; wait for
  // the URL to CHANGE (each processed upload gets a new hashed URL), not merely
  // exist, so we never publish a stale file.
  let prevUrl;
  try {
    prevUrl = (await api(`/assets/${id}`))?.fields?.file?.[L]?.url;
  } catch {
    prevUrl = undefined; // new asset
  }
  const version = await getVersion(`/assets/${id}`);
  const asset = await api(`/assets/${id}`, { method: "PUT", body, version });
  await api(`/assets/${id}/files/${L}/process`, { method: "PUT", version: asset.sys.version });
  let processed;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    processed = await api(`/assets/${id}`);
    const url = processed?.fields?.file?.[L]?.url;
    if (url && url !== prevUrl) break;
  }
  const finalUrl = processed?.fields?.file?.[L]?.url;
  if (!finalUrl || finalUrl === prevUrl) throw new Error(`asset ${id} did not finish processing`);
  await api(`/assets/${id}/published`, { method: "PUT", version: processed.sys.version });
}

async function upsertEntry(id, fields) {
  const localized = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, { [L]: v }])
  );
  const version = await getVersion(`/entries/${id}`);
  const entry = await api(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Content-Type": "faujaResultsYear" },
    body: { fields: localized },
    version,
  });
  await api(`/entries/${id}/published`, { method: "PUT", version: entry.sys.version });
}

const byYear = await loadRows();
const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
if (years.length === 0) throw new Error("no rows parsed from fauja-singh-results.ts");

for (const year of years) {
  const rows = byYear[year];
  if (rows.length === 0) {
    console.log(`skip ${year}: no rows`);
    continue;
  }
  const assetId = `fauja-results-csv-${year}`;
  await upsertCsvAsset(assetId, `Fauja Singh ${year} results (CSV)`, toCsv(rows));
  await upsertEntry(`fauja-results-year-${year}`, {
    title: `Fauja Singh ${year} results`,
    year,
    csvFile: { sys: { type: "Link", linkType: "Asset", id: assetId } },
  });
  console.log(`year ${year}: ${rows.length} rows -> CSV asset + entry published`);
}

console.log("migration complete.");
