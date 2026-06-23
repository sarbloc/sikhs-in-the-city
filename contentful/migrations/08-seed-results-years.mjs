// Migrate each live resultsEvent into one Results Year entry per (event, year),
// deriving the explicit URL from that event's current years + urlTemplate.
//
// Reads the PUBLISHED resultsEvent entries via the Delivery API (CDA) — not the
// CMA, which would return unpublished drafts — so the seeded resultsYear data
// matches what is actually live on the site. Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/08-seed-results-years.mjs
import { api, getVersion, LOCALE as L, ENV } from "../lib/cma.mjs";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const CDA = process.env.CONTENTFUL_DELIVERY_TOKEN;
if (!SPACE || !CDA) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN in env.");
  process.exit(1);
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

/** Published resultsEvent entries (CDA returns fields as direct values). */
async function publishedResultsEvents() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries?content_type=resultsEvent&limit=1000`,
    { headers: { Authorization: `Bearer ${CDA}` } }
  );
  if (!res.ok) throw new Error(`CDA read failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).items;
}

const entryLink = (eid) => ({ sys: { type: "Link", linkType: "Entry", id: eid } });
const yy = (year) => String(year).slice(-2);

for (const ev of await publishedResultsEvents()) {
  const { slug, title, urlTemplate, years = [] } = ev.fields;
  if (!slug || !urlTemplate) {
    console.warn(`skip ${ev.sys.id}: missing slug or urlTemplate`);
    continue;
  }
  for (const raw of years) {
    const year = Number(raw);
    if (!Number.isFinite(year)) continue;
    await upsertEntry(`results-year-${slug}-${year}`, "resultsYear", {
      title: `${title} ${year}`,
      event: entryLink(ev.sys.id),
      year,
      url: urlTemplate.replaceAll("{yy}", yy(year)),
    });
  }
}

console.log("migration complete.");
