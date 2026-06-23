// Contentful content model: Hero Slide — slides in the homepage hero carousel.
// Idempotent: safe to re-run (upserts by content-type id, then publishes).
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/03-hero.mjs
import { api, getVersion } from "../lib/cma.mjs";

const heroSlideType = {
  name: "Hero Slide",
  description: "A slide in the homepage hero carousel.",
  displayField: "heading",
  fields: [
    { id: "heading", name: "Heading", type: "Symbol", required: true },
    { id: "subheading", name: "Subheading", type: "Text", required: true },
    { id: "backgroundImage", name: "Background image", type: "Link", linkType: "Asset", required: false },
    { id: "primaryCta", name: "Primary CTA text", type: "Symbol", required: false },
    { id: "primaryHref", name: "Primary CTA link", type: "Symbol", required: false },
    { id: "secondaryCta", name: "Secondary CTA text", type: "Symbol", required: false },
    { id: "secondaryHref", name: "Secondary CTA link", type: "Symbol", required: false },
    { id: "displayOrder", name: "Display order", type: "Integer", required: false },
  ],
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

await upsertContentType("heroSlide", heroSlideType);
console.log("done.");
