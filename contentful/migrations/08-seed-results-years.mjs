// Migrate each live resultsEvent into one Results Year entry per (event, year),
// deriving the explicit URL from that event's current years + urlTemplate. Reads
// the live entries (the source of truth) rather than a hard-coded snapshot, so
// it stays correct even if the years/template were edited in Contentful.
// Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/08-seed-results-years.mjs
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

const entryLink = (eid) => ({ sys: { type: "Link", linkType: "Entry", id: eid } });
const yy = (year) => String(year).slice(-2);

const { items: events } = await api(`/entries?content_type=resultsEvent&limit=1000`);

for (const ev of events) {
  const slug = ev.fields.slug?.[L];
  const title = ev.fields.title?.[L];
  const template = ev.fields.urlTemplate?.[L];
  const years = ev.fields.years?.[L] ?? [];
  if (!slug || !template) {
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
      url: template.replaceAll("{yy}", yy(year)),
    });
  }
}

console.log("migration complete.");
