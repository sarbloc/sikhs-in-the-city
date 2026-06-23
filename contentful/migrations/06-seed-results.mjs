// Seed the two external-results events (Dawn To Dusk, Summer Samosa) into
// Contentful. Years are strings so editors can add a new year without touching
// the URL template. Idempotent: deterministic ids, safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/06-seed-results.mjs
import { api, getVersion, LOCALE as L } from "../lib/cma.mjs";

async function upsertEntry(id, contentType, fields) {
  const localized = Object.fromEntries(
    Object.entries(fields)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, { [L]: v }])
  );
  const version = await getVersion(`/entries/${id}`);
  const entry = await api(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Content-Type": contentType },
    body: { fields: localized },
    version,
  });
  await api(`/entries/${id}/published`, { method: "PUT", version: entry.sys.version });
  console.log(`entry '${id}' upserted + published`);
}

const DAWN_TO_DUSK_YEARS = [
  "2025", "2024", "2023", "2022", "2021", "2020", "2019",
  "2018", "2017", "2016", "2015", "2014", "2013",
];
const SUMMER_SAMOSA_YEARS = ["2025", "2024", "2023", "2022"];

await upsertEntry("results-dawn-to-dusk", "resultsEvent", {
  title: "Dawn To Dusk",
  slug: "dawn-to-dusk",
  urlTemplate: "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d{yy}.clax",
  years: DAWN_TO_DUSK_YEARS,
  displayOrder: 1,
});

await upsertEntry("results-summer-samosa", "resultsEvent", {
  title: "Summer Samosa",
  slug: "summer-samosa",
  urlTemplate: "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa{yy}.clax",
  years: SUMMER_SAMOSA_YEARS,
  displayOrder: 2,
});

console.log("seed complete.");
