// Contentful content model: Fauja Results Year — one year of Fauja Singh
// Birthday Challenge results, uploaded as a CSV file and rendered as a table.
// Admin flow: add entry -> set year -> attach CSV -> publish.
// Idempotent: safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/15-fauja-results.mjs
import { api, getVersion } from "../lib/cma.mjs";

const faujaResultsYearType = {
  name: "Fauja Results Year",
  description:
    "One year of Fauja Singh Birthday Challenge results, uploaded as a CSV file.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    {
      id: "year",
      name: "Year",
      type: "Integer",
      required: true,
      validations: [{ unique: true }],
    },
    {
      id: "csvFile",
      name: "Results CSV file",
      type: "Link",
      linkType: "Asset",
      required: true,
      // Only text-like assets: blocks attaching an image/PDF by mistake.
      // ("spreadsheet" included because Excel-exported CSVs often carry a
      // spreadsheet MIME type rather than text/csv.)
      validations: [{ linkMimetypeGroup: ["plaintext", "spreadsheet"] }],
    },
  ],
};

const helpTexts = {
  title: "Display name for this entry, e.g. \"Fauja Singh 2026 results\".",
  year: "The event year. Years appear in the page's dropdown, newest first.",
  csvFile:
    "A .csv file with a header row: Name,Laps,Distance,Time (any column order, case-insensitive). One finisher per row. Example row: Jane Doe,21,42.29,5:12:33",
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
  await api(`/content_types/${id}/editor_interface`, { method: "PUT", body: { controls }, version });
  console.log("editor help text set");
}

await upsertContentType("faujaResultsYear", faujaResultsYearType);
await setHelpText("faujaResultsYear", helpTexts);
console.log("done.");
