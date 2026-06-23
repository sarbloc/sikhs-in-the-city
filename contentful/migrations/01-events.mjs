// Contentful content model: Event — cards shown in the homepage Events section.
// Idempotent: safe to re-run (upserts by content-type id, then publishes).
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/01-events.mjs
import { api, getVersion } from "../lib/cma.mjs";

const eventType = {
  name: "Event",
  description: "An event card shown in the homepage Events section.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    { id: "description", name: "Description", type: "Text", required: true },
    { id: "date", name: "Date (display text)", type: "Symbol", required: true },
    { id: "image", name: "Image", type: "Link", linkType: "Asset", required: false },
    { id: "imageAlt", name: "Image alt text", type: "Symbol", required: false },
    { id: "href", name: "Link URL", type: "Symbol", required: false },
    { id: "displayOrder", name: "Display order", type: "Integer", required: false },
  ],
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

await upsertContentType("event", eventType);
console.log("done.");
