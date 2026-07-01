// Seed starter News Items (the approved sample articles) so the section is
// populated at launch. The charity can edit or delete these. Uploads each
// thumbnail as an asset and gives each article a short rich-text body.
// Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/12-seed-news.mjs
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { api, getVersion, uploadBinary, LOCALE as L, sleep } from "../lib/cma.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

async function upsertAsset(id, { title, filePath, contentType }) {
  const bytes = await readFile(filePath);
  const upload = await uploadBinary(bytes);
  const body = {
    fields: {
      title: { [L]: title },
      file: {
        [L]: {
          contentType,
          fileName: basename(filePath),
          uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } },
        },
      },
    },
  };
  const version = await getVersion(`/assets/${id}`);
  const asset = await api(`/assets/${id}`, { method: "PUT", body, version });
  await api(`/assets/${id}/files/${L}/process`, { method: "PUT", version: asset.sys.version });
  let processed;
  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    processed = await api(`/assets/${id}`);
    if (processed?.fields?.file?.[L]?.url) break;
  }
  if (!processed?.fields?.file?.[L]?.url) throw new Error(`asset ${id} did not process`);
  await api(`/assets/${id}/published`, { method: "PUT", version: processed.sys.version });
  return id;
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
  console.log(`entry '${id}' published`);
}

const assetLink = (aid) => ({ sys: { type: "Link", linkType: "Asset", id: aid } });
const p = (text) => ({
  nodeType: "paragraph",
  data: {},
  content: [{ nodeType: "text", value: text, marks: [], data: {} }],
});
const h2 = (text) => ({
  nodeType: "heading-2",
  data: {},
  content: [{ nodeType: "text", value: text, marks: [], data: {} }],
});
const doc = (nodes) => ({ nodeType: "document", data: {}, content: nodes });

const ITEMS = [
  {
    slug: "clubhouse-appeal-reaches-halfway",
    title: "Fauja Singh Clubhouse Appeal reaches the halfway mark",
    date: "2026-06-18",
    image: "public/images/clubhouse-appeal/clubhouse-vision-1.png",
    contentType: "image/png",
    excerpt:
      "Thanks to an incredible community effort, our appeal to build an eco-friendly community clubhouse has passed 50% of its target. Here's what happens next.",
    body: [
      "Thanks to an incredible community effort, our appeal to build an eco-friendly community clubhouse has passed 50% of its target.",
      "Every donation, sponsored run and share has brought us closer to a permanent home for the club — a space for training, wellbeing and connection for the whole community.",
      { h2: "What happens next" },
      "We'll be sharing regular updates as we work towards the full target. If you'd like to help us get there, every contribution makes a difference.",
    ],
  },
  {
    slug: "summer-samosa-ultra-2026-entries-open",
    title: "Summer Samosa Ultra 2026 — entries are now open",
    date: "2026-06-10",
    image: "public/images/events/summer-somosa.png",
    contentType: "image/png",
    excerpt:
      "Half marathon, marathon and 50km+ ultra distances return this June. Early-bird places are limited, so secure your spot before they're gone.",
    body: [
      "Our Summer Samosa Ultra is back, with three distances to choose from: half marathon, full marathon and the 50km+ ultra.",
      "Whether you're chasing a personal best or taking on your first long-distance challenge, there's a place for you on the start line.",
      { h2: "How to enter" },
      "Early-bird places are limited. Head to the events page to sign up and join us this summer.",
    ],
  },
  {
    slug: "dawn-to-dusk-volunteers-wanted",
    title: "Volunteers wanted for Dawn to Dusk 2026",
    date: "2026-05-28",
    image: "public/images/events/dawn-2-dusk.png",
    contentType: "image/png",
    excerpt:
      "Our flagship endurance event only happens because of our brilliant volunteers. Marshals, lap counters and cheerers — we'd love your help.",
    body: [
      "Our flagship Dawn to Dusk endurance event only happens because of our brilliant team of volunteers.",
      "We're looking for marshals, lap counters and plenty of friendly faces to cheer runners across the line throughout the day.",
      { h2: "Lend a hand" },
      "No experience needed — just enthusiasm. Get in touch and we'll find a role that suits you.",
    ],
  },
  {
    slug: "beginners-group-launches-ilford",
    title: "New beginners' running group launches in Ilford",
    date: "2026-05-15",
    image: "public/images/hero/slide-1.png",
    contentType: "image/png",
    excerpt:
      "From first steps to your first 10K — our new weekly beginners' group is free, friendly and open to everyone in the community.",
    body: [
      "From first steps to your first 10K, our new weekly beginners' group is designed to help you build confidence at your own pace.",
      "It's free, friendly and open to everyone in the community — no matter your background or fitness level.",
      { h2: "Come along" },
      "Sessions run every week. Bring a friend, bring your trainers, and we'll take care of the rest.",
    ],
  },
  {
    slug: "fauja-singh-birthday-challenge-2026-date",
    title: "Fauja Singh Birthday Challenge 2026 date announced",
    date: "2026-04-30",
    image: "public/images/hero/slide-3.jpg",
    contentType: "image/jpeg",
    excerpt:
      "Mark your calendars: the challenge honouring the legendary marathoner returns next spring. Registration and full details to follow soon.",
    body: [
      "The Fauja Singh Birthday Challenge, honouring the legendary marathoner, returns next spring.",
      "It's one of the highlights of our calendar — a celebration of endurance, community and the remarkable man who inspires it.",
      { h2: "Save the date" },
      "Registration and full details will follow soon. Keep an eye on this page and our social channels.",
    ],
  },
  {
    slug: "club-runners-london-marathon",
    title: "Club runners shine at the London Marathon",
    date: "2026-04-22",
    image: "public/images/hero/slide-2.jpg",
    contentType: "image/jpeg",
    excerpt:
      "A record number of Sikhs In The City runners crossed the line this year, raising thousands for the clubhouse appeal along the way.",
    body: [
      "A record number of Sikhs In The City runners crossed the London Marathon finish line this year.",
      "Between them they raised thousands of pounds for the clubhouse appeal, and did it in style.",
      { h2: "Thank you" },
      "To every runner, supporter and donor — thank you. You made this one to remember.",
    ],
  },
];

for (const it of ITEMS) {
  const assetId = `news-thumb-${it.slug}`;
  await upsertAsset(assetId, {
    title: it.title,
    filePath: `${ROOT}${it.image}`,
    contentType: it.contentType,
  });
  const bodyNodes = it.body.map((b) => (typeof b === "string" ? p(b) : h2(b.h2)));
  await upsertEntry(`news-${it.slug}`, "newsItem", {
    title: it.title,
    slug: it.slug,
    date: it.date,
    thumbnail: assetLink(assetId),
    excerpt: it.excerpt,
    body: doc(bodyNodes),
  });
}

console.log(`seed complete (${ITEMS.length} news items).`);
