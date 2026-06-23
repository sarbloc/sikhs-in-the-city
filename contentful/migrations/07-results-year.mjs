// Contentful content model: Results Year — one entry per (event, year), each
// with its own explicit external results URL. Replaces the resultsEvent
// urlTemplate/years approach so a given year's link can be anything.
// Idempotent: safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/07-results-year.mjs
import { api, getVersion } from "../lib/cma.mjs";

const resultsYearType = {
  name: "Results Year",
  description:
    "One year of an event's results, linking out to that year's external results page.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    {
      id: "event",
      name: "Event",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [{ linkContentType: ["resultsEvent"] }],
    },
    { id: "year", name: "Year", type: "Integer", required: true },
    { id: "url", name: "Results URL", type: "Symbol", required: true },
  ],
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

await upsertContentType("resultsYear", resultsYearType);
console.log("done.");
