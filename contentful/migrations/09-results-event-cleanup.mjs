// Remove the now-unused urlTemplate + years fields from resultsEvent. Per-year
// data now lives in resultsYear (one entry per year, each with its own URL), so
// these fields are obsolete and only confuse editors. Contentful requires a
// field to be omitted before it can be deleted, so this runs in two publish
// steps. Idempotent: no-op once the fields are gone.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/09-results-event-cleanup.mjs
import { api, getVersion } from "../lib/cma.mjs";

const ID = "resultsEvent";
const META = {
  name: "Results Event",
  description: "An event whose per-year results link out to an external timing site.",
  displayField: "title",
};
const REMOVE = new Set(["urlTemplate", "years"]);
const FINAL_FIELDS = [
  { id: "title", name: "Title", type: "Symbol", required: true },
  {
    id: "slug",
    name: "Slug (page id)",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
  },
  { id: "displayOrder", name: "Display order", type: "Integer", required: false },
];

async function putAndPublish(fields) {
  const version = await getVersion(`/content_types/${ID}`);
  const saved = await api(`/content_types/${ID}`, { method: "PUT", body: { ...META, fields }, version });
  await api(`/content_types/${ID}/published`, { method: "PUT", version: saved.sys.version });
}

const current = await api(`/content_types/${ID}`);
if (!current.fields.some((f) => REMOVE.has(f.id))) {
  console.log("urlTemplate/years already removed; nothing to do.");
} else {
  // Step 1: omit the fields (required before deletion).
  await putAndPublish(current.fields.map((f) => (REMOVE.has(f.id) ? { ...f, omitted: true } : f)));
  console.log("step 1: omitted urlTemplate + years");
  // Step 2: remove them from the schema.
  await putAndPublish(FINAL_FIELDS);
  console.log("step 2: removed urlTemplate + years");
}
console.log("done.");
