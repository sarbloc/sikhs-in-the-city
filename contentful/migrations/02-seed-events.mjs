// Seed the two existing homepage events into Contentful, uploading their
// images as assets. Idempotent: deterministic ids, safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/02-seed-events.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { api, getVersion, uploadBinary, LOCALE as L, sleep } from "../lib/cma.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

async function upsertAsset(id, { title, fileName, contentType, filePath }) {
  const bytes = await readFile(filePath);
  const upload = await uploadBinary(bytes);
  const body = {
    fields: {
      title: { [L]: title },
      file: {
        [L]: {
          contentType,
          fileName,
          uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } },
        },
      },
    },
  };
  const version = await getVersion(`/assets/${id}`);
  const asset = await api(`/assets/${id}`, { method: "PUT", body, version });
  await api(`/assets/${id}/files/${L}/process`, { method: "PUT", version: asset.sys.version });

  let processed;
  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    processed = await api(`/assets/${id}`);
    if (processed?.fields?.file?.[L]?.url) break;
  }
  if (!processed?.fields?.file?.[L]?.url) throw new Error(`asset ${id} did not finish processing`);
  await api(`/assets/${id}/published`, { method: "PUT", version: processed.sys.version });
  console.log(`asset '${id}' uploaded + published`);
  return id;
}

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

const assetLink = (aid) => ({ sys: { type: "Link", linkType: "Asset", id: aid } });

const summerImg = await upsertAsset("event-summer-samosa-img", {
  title: "Summer Samosa Ultra",
  fileName: "summer-somosa.png",
  contentType: "image/png",
  filePath: `${ROOT}public/images/events/summer-somosa.png`,
});
const dawnImg = await upsertAsset("event-dawn-2-dusk-img", {
  title: "Dawn 2 Dusk Ultra",
  fileName: "dawn-2-dusk.png",
  contentType: "image/png",
  filePath: `${ROOT}public/images/events/dawn-2-dusk.png`,
});

await upsertEntry("event-summer-samosa-ultra", "event", {
  title: "Summer Samosa Ultra",
  description:
    "Sign up for our Summer Samosa Ultra — a multi-lap race with three distances to choose from: Half Marathon, Full Marathon and Ultra Marathon (50km+).",
  date: "28th June 2026",
  image: assetLink(summerImg),
  imageAlt: "Runners at the Summer Samosa Ultra event",
  href: "https://www.evententry.co.uk/sikhs-in-the-city-summer-samosa-ultra-2026",
  displayOrder: 1,
});

await upsertEntry("event-dawn-2-dusk-ultra", "event", {
  title: "Dawn 2 Dusk Ultra",
  description:
    "Sign up for our flagship Dawn 2 Dusk Ultra — a multi-lap endurance event offering Half Marathon, Full Marathon and Ultra Marathon (50km+) distances.",
  date: "6th December 2026",
  image: assetLink(dawnImg),
  imageAlt: "Runners at the Dawn 2 Dusk Ultra event",
  href: "https://www.evententry.co.uk/sikhs-in-the-city-dawn-to-dusk-marathon-ultra-2026",
  displayOrder: 2,
});

console.log("seed complete.");
