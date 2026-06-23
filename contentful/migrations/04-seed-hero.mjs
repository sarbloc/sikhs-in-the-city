// Seed the two existing homepage hero slides into Contentful, uploading their
// background images as assets. Idempotent: deterministic ids, safe to re-run.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/04-seed-hero.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { api, getVersion, uploadBinary, LOCALE as L, sleep } from "../lib/cma.mjs";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

async function upsertAsset(id, { title, fileName, contentType, filePath }) {
  const bytes = await readFile(filePath);
  const upload = await uploadBinary(bytes);
  const body = {
    fields: {
      title: { [L]: title },
      file: {
        [L]: {
          contentType,
          fileName,
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
  if (!processed?.fields?.file?.[L]?.url) throw new Error(`asset ${id} did not finish processing`);
  await api(`/assets/${id}/published`, { method: "PUT", version: processed.sys.version });
  console.log(`asset '${id}' uploaded + published`);
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
  console.log(`entry '${id}' upserted + published`);
}

const assetLink = (aid) => ({ sys: { type: "Link", linkType: "Asset", id: aid } });

const slide1Img = await upsertAsset("hero-slide-1-img", {
  title: "Sikhs In The City hero",
  fileName: "slide-1.png",
  contentType: "image/png",
  filePath: `${ROOT}public/images/hero/slide-1.png`,
});
const slide2Img = await upsertAsset("hero-slide-2-img", {
  title: "Fauja Singh Clubhouse Appeal hero",
  fileName: "slide-2.jpg",
  contentType: "image/jpeg",
  filePath: `${ROOT}public/images/hero/slide-2.jpg`,
});

await upsertEntry("hero-slide-1", "heroSlide", {
  heading: "Sikhs In The City",
  subheading:
    "A community-led running charity bringing people and cultures together through running. From first steps to 10K and beyond.",
  backgroundImage: assetLink(slide1Img),
  primaryCta: "Join The Run",
  primaryHref: "/how-to-join",
  secondaryCta: "Learn About Us",
  secondaryHref: "/our-story",
  displayOrder: 1,
});

await upsertEntry("hero-slide-2", "heroSlide", {
  heading: "Fauja Singh Clubhouse Appeal",
  subheading:
    "We're working to build an eco-friendly community clubhouse that supports health, wellbeing, and connection. With your support, we can turn this vision into a lasting space for the local community.",
  backgroundImage: assetLink(slide2Img),
  primaryCta: "Donate Now",
  primaryHref: "https://www.gofundme.com/f/fauja-singh-clubhouse-appeal",
  secondaryCta: "Find Out More",
  secondaryHref: "/clubhouse-appeal",
  displayOrder: 2,
});

console.log("seed complete.");
