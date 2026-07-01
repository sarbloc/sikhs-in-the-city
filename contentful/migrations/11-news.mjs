// Contentful content model: News Item — a news / announcement article.
// Also configures the editor interface for easy administration: the slug is
// auto-generated from the title, the date is a date-only picker, and every
// field has help text. Idempotent.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/11-news.mjs
import { api, getVersion } from "../lib/cma.mjs";

const ID = "newsItem";

const newsItemType = {
  name: "News Item",
  description: "A news or announcement article, shown on the homepage and /news.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    {
      id: "slug",
      name: "Slug (URL)",
      type: "Symbol",
      required: true,
      validations: [
        { unique: true },
        {
          regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
          message: "Use lowercase letters, numbers and hyphens only.",
        },
      ],
    },
    { id: "date", name: "Date", type: "Date", required: true },
    { id: "thumbnail", name: "Thumbnail", type: "Link", linkType: "Asset", required: false },
    {
      id: "excerpt",
      name: "Excerpt",
      type: "Text",
      required: true,
      validations: [{ size: { max: 300 } }],
    },
    {
      id: "body",
      name: "Body",
      type: "RichText",
      required: true,
      // Constrain to the node set the article renderer supports, so editors
      // can't insert content (embedded entries/assets, tables) that would render
      // broken. Extend the renderer first if you widen this.
      validations: [
        {
          enabledMarks: ["bold", "italic", "underline"],
          message: "Only bold, italic and underline are allowed.",
        },
        {
          enabledNodeTypes: [
            "heading-2",
            "heading-3",
            "ordered-list",
            "unordered-list",
            "hr",
            "blockquote",
            "hyperlink",
          ],
          message: "Allowed: headings, lists, quotes, horizontal rules and links.",
        },
      ],
    },
  ],
};

const editorInterface = {
  controls: [
    {
      fieldId: "title",
      widgetNamespace: "builtin",
      widgetId: "singleLine",
      settings: { helpText: "The article headline." },
    },
    {
      fieldId: "slug",
      widgetNamespace: "builtin",
      widgetId: "slugEditor",
      settings: {
        trackingFieldId: "title",
        helpText:
          "Auto-generated from the title. This is the article's URL (/news/your-slug) — only change it if you need a custom link.",
      },
    },
    {
      fieldId: "date",
      widgetNamespace: "builtin",
      widgetId: "datePicker",
      settings: {
        format: "dateonly",
        helpText: "Publish date. Shown on the article and used to order news (newest first).",
      },
    },
    {
      fieldId: "thumbnail",
      widgetNamespace: "builtin",
      widgetId: "assetLinkEditor",
      settings: { helpText: "Optional image, shown on the cards and at the top of the article." },
    },
    {
      fieldId: "excerpt",
      widgetNamespace: "builtin",
      widgetId: "multipleLine",
      settings: {
        helpText: "Short summary (1-2 sentences) shown on the homepage and listing cards.",
      },
    },
    {
      fieldId: "body",
      widgetNamespace: "builtin",
      widgetId: "richTextEditor",
      settings: { helpText: "The full article content." },
    },
  ],
};

async function upsertContentType(id, definition) {
  const version = await getVersion(`/content_types/${id}`);
  const saved = await api(`/content_types/${id}`, { method: "PUT", body: definition, version });
  await api(`/content_types/${id}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`content type '${id}' upserted + published`);
}

async function setEditorInterface(id, ei) {
  const version = await getVersion(`/content_types/${id}/editor_interface`);
  await api(`/content_types/${id}/editor_interface`, { method: "PUT", body: ei, version });
  console.log("editor interface configured (auto-slug + help text)");
}

await upsertContentType(ID, newsItemType);
await setEditorInterface(ID, editorInterface);
console.log("done.");
