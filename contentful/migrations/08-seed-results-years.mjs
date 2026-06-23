// Seed one Results Year entry per (event, year), migrating the existing
// external links to explicit per-year URLs. Idempotent: deterministic ids.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/08-seed-results-years.mjs
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
  console.log(`entry '${id}' upserted + published`);
}

const entryLink = (eid) => ({ sys: { type: "Link", linkType: "Entry", id: eid } });
const yy = (year) => String(year).slice(-2);

const EVENTS = [
  {
    eventId: "results-dawn-to-dusk",
    title: "Dawn To Dusk",
    slug: "dawn-to-dusk",
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013],
    url: (y) => `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d${yy(y)}.clax`,
  },
  {
    eventId: "results-summer-samosa",
    title: "Summer Samosa",
    slug: "summer-samosa",
    years: [2025, 2024, 2023, 2022],
    url: (y) => `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa${yy(y)}.clax`,
  },
];

for (const ev of EVENTS) {
  for (const year of ev.years) {
    await upsertEntry(`results-year-${ev.slug}-${year}`, "resultsYear", {
      title: `${ev.title} ${year}`,
      event: entryLink(ev.eventId),
      year,
      url: ev.url(year),
    });
  }
}

console.log("seed complete.");
