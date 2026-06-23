// Correct the Dawn To Dusk resultsYear URLs from the old site's results list.
// Each year links somewhere different (justiming variants in recent years, then
// Google Drive files for older ones), which is exactly why per-year entries
// replaced the urlTemplate. The source URLs are wrapped in a web.archive.org
// snapshot; we strip that wrapper before saving. Idempotent.
//
//   set -a; . ./.env; set +a
//   node contentful/migrations/10-d2d-results-links.mjs
import { api, LOCALE as L } from "../lib/cma.mjs";

const SLUG = "dawn-to-dusk";

// Verbatim hrefs from the old site (web.archive.org-wrapped), keyed by year.
const ARCHIVED = {
  2025: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d25.clax",
  2024: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d24.clax",
  2023: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2dwinter23.clax",
  2022: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/2022/tpevents/g-live.html?f=D2Dwinter22.clax",
  2021: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/2021/d2d27.6.21/g-live.html?f=D2Dwinter21.clax",
  2020: "https://web.archive.org/web/20260301132941/https://justiming.co.uk/liveresults/2021/d2d27.6.21/g-live.html?f=D2Dsummer21.clax",
  2019: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1MucReFJt4mdMwuXP6fotmb4P_8UTFG0a/view?usp=sharing",
  2018: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1CRwfBvcHA0AmtJejIw-BAA751iBY2-Oo/view?usp=sharing",
  2017: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1jsmUwYzfMLSUgKe1Mi9jX5FWMAU-qnU0/view?usp=sharing",
  2016: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1XhVBIuyDyfhw1Zxl9NsnN0mT-5HKdMjN/view?usp=sharing",
  2015: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1i8DcNi-W9gnOCN3D22oBmvSVIP3k4gNg/view?usp=sharing",
  2014: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1YZZv21rGhc3pywN3BfD3lI8YQfGWKKfj/view?usp=sharing",
  2013: "https://web.archive.org/web/20260301132941/https://drive.google.com/file/d/1ZnDrkROPaD6i3M6joIVTb41fVTZEylnd/view?usp=sharing",
};

// Strip the web.archive.org/web/<timestamp>/ prefix, leaving the original URL.
const strip = (u) => u.replace(/^https:\/\/web\.archive\.org\/web\/\d+\//, "");

async function setUrl(entryId, url) {
  const entry = await api(`/entries/${entryId}`);
  const { version, publishedVersion } = entry.sys;
  // Skip entries with unpublished draft edits, so this URL fix never also
  // publishes someone's unrelated in-progress changes.
  if (publishedVersion != null && version > publishedVersion + 1) {
    console.warn(`skip ${entryId}: has unpublished draft changes`);
    return;
  }
  entry.fields.url = { [L]: url };
  const saved = await api(`/entries/${entryId}`, {
    method: "PUT",
    body: { fields: entry.fields },
    version,
  });
  await api(`/entries/${entryId}/published`, { method: "PUT", version: saved.sys.version });
  console.log(`updated ${entryId} -> ${url}`);
}

for (const [year, archived] of Object.entries(ARCHIVED)) {
  await setUrl(`results-year-${SLUG}-${year}`, strip(archived));
}

console.log(`done (${Object.keys(ARCHIVED).length} Dawn To Dusk years).`);
