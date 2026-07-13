// Contentful content model: Course Records — Dawn To Dusk record holders,
// shown in the homepage Course Records section.
// Two types (same linked pattern as results):
//   recordCategory: Ultra / Marathon / Half Marathon / 10K
//   courseRecord:   one record holder, linked to its category
// Idempotent: safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/13-course-records.mjs
import { api, getVersion } from "../lib/cma.mjs";

const recordCategoryType = {
  name: "Record Category",
  description: "A Dawn To Dusk course-record category (Ultra, Marathon, ...).",
  displayField: "name",
  fields: [
    { id: "name", name: "Name", type: "Symbol", required: true },
    {
      id: "requirement",
      name: "Medal requirement",
      type: "Text",
      required: true,
    },
    { id: "displayOrder", name: "Display order", type: "Integer", required: true },
  ],
};

const courseRecordType = {
  name: "Course Record",
  description: "One Dawn To Dusk record holder, linked to a Record Category.",
  displayField: "name",
  fields: [
    { id: "name", name: "Runner's name", type: "Symbol", required: true },
    {
      id: "category",
      name: "Category",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [{ linkContentType: ["recordCategory"] }],
    },
    { id: "laps", name: "Laps", type: "Integer", required: true },
    { id: "distance", name: "Total distance (optional)", type: "Symbol", required: false },
    { id: "time", name: "Time", type: "Symbol", required: true },
    { id: "year", name: "Year achieved", type: "Integer", required: true },
    { id: "displayOrder", name: "Display order (within category)", type: "Integer", required: true },
  ],
};

const helpTexts = {
  recordCategory: {
    name: "Category title shown on the blue card (e.g. Ultra, Marathon).",
    requirement: "Medal requirement text shown under the category title.",
    displayOrder: "Order of the category columns, left to right (1, 2, 3, ...).",
  },
  courseRecord: {
    name: "The record holder's name.",
    category: "Which category this record belongs to.",
    laps: "Laps completed. For Marathon / Half Marathon / 10K this is the category's fixed lap count (21 / 11 / 5).",
    distance: "Only for Ultra records (e.g. 100.7 km). Leave empty for time-only records.",
    time: "Record time exactly as it should display (e.g. 7h28:01 or 34m:46.0).",
    year: "Year the record was set.",
    displayOrder: "Order within the category, top to bottom (1, 2, ...).",
  },
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

async function setHelpText(id, texts) {
  const version = await getVersion(`/content_types/${id}/editor_interface`);
  const controls = Object.entries(texts).map(([fieldId, helpText]) => ({
    fieldId,
    widgetNamespace: "builtin",
    settings: { helpText },
  }));
  await api(`/content_types/${id}/editor_interface`, {
    method: "PUT",
    body: { controls },
    version,
  });
  console.log(`editor help text set for '${id}'`);
}

await upsertContentType("recordCategory", recordCategoryType);
await upsertContentType("courseRecord", courseRecordType);
await setHelpText("recordCategory", helpTexts.recordCategory);
await setHelpText("courseRecord", helpTexts.courseRecord);
console.log("done.");
