// Contentful content model: Results Event — events whose per-year results link
// out to an external timing site. (Fauja Singh's internal tables stay on the
// code/CSV flow and are intentionally not modelled here.)
// Idempotent: safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/05-results.mjs
import { api, getVersion } from "../lib/cma.mjs";

const resultsEventType = {
  name: "Results Event",
  description:
    "An event whose per-year results link out to an external timing site.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    {
      id: "slug",
      name: "Slug (page id)",
      type: "Symbol",
      required: true,
      validations: [{ unique: true }],
    },
    {
      id: "urlTemplate",
      name: "Results URL template ({yy} = 2-digit year)",
      type: "Symbol",
      required: true,
    },
    {
      id: "years",
      name: "Years (newest first)",
      type: "Array",
      items: { type: "Symbol" },
      required: true,
    },
    { id: "displayOrder", name: "Display order", type: "Integer", required: false },
  ],
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

await upsertContentType("resultsEvent", resultsEventType);
console.log("done.");
