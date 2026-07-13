// Seed the Dawn To Dusk course records with the CORRECTED data supplied by the
// charity (the previous hardcoded values contained copy-paste errors: Half
// Marathon carried Ultra distances, and one Marathon lap count was wrong).
// Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/14-seed-course-records.mjs
import { api, getVersion, LOCALE as L } from "../lib/cma.mjs";

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

const link = (eid) => ({ sys: { type: "Link", linkType: "Entry", id: eid } });

const CATEGORIES = [
  {
    id: "record-category-ultra",
    name: "Ultra",
    requirement:
      "To receive the Ultra Marathon medal the participants will have to complete 25 or more laps (minimum 50k)",
    displayOrder: 1,
    holders: [
      { id: "jose-rodriguez", name: "Jose Rodriguez", laps: 50, distance: "100.7 km", time: "7h28:01", year: 2023 },
      { id: "toni-mcintosh", name: "Toni Mcintosh", laps: 41, distance: "82.57 km", time: "7h48:19", year: 2019 },
    ],
  },
  {
    id: "record-category-marathon",
    name: "Marathon",
    requirement:
      "To receive the Marathon medal the participants will have to complete 21 laps (Total distance of 42k)",
    displayOrder: 2,
    holders: [
      { id: "lee-rogers", name: "Lee Rogers", laps: 21, time: "2h42:16", year: 2025 },
      { id: "charley-jennings", name: "Charley Jennings", laps: 21, time: "3h36:31", year: 2023 },
    ],
  },
  {
    id: "record-category-half-marathon",
    name: "Half Marathon",
    requirement:
      "To receive the Half Marathon medal the participants will have to complete 11 laps (Total distance of 22k)",
    displayOrder: 3,
    holders: [
      { id: "paul-quinton", name: "Paul Quinton", laps: 11, time: "1h23:50", year: 2015 },
      { id: "hilary-wood", name: "Hilary Wood", laps: 11, time: "1h49:27", year: 2021 },
    ],
  },
  {
    id: "record-category-10k",
    name: "10K",
    requirement: "To receive the 10k medal the participants will have to complete 5 laps",
    displayOrder: 4,
    holders: [
      { id: "gary-towers", name: "Gary Towers", laps: 5, time: "34m:46.0", year: 2021 },
      { id: "sharon-wright", name: "Sharon Wright", laps: 5, time: "43m:55.0", year: 2016 },
    ],
  },
];

for (const cat of CATEGORIES) {
  await upsertEntry(cat.id, "recordCategory", {
    name: cat.name,
    requirement: cat.requirement,
    displayOrder: cat.displayOrder,
  });
  let order = 1;
  for (const h of cat.holders) {
    await upsertEntry(`course-record-${h.id}`, "courseRecord", {
      name: h.name,
      category: link(cat.id),
      laps: h.laps,
      distance: h.distance,
      time: h.time,
      year: h.year,
      displayOrder: order++,
    });
  }
}

console.log("seed complete (4 categories, 8 records).");
