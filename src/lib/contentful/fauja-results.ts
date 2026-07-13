import { contentfulQuery } from "./client";
import { parseCsv } from "@/lib/csv";

/** One finisher row (matches the ResultsTable columns on the page). */
export interface FaujaResultRow {
  name: string;
  laps: number;
  distance: string;
  time: string;
}

/** One year of results. `error` is set when the CSV couldn't be used. */
export interface FaujaYearResults {
  year: number;
  rows: FaujaResultRow[];
  /** True when the attached CSV was missing/unparseable — the page shows an
   * editor-facing error state for this year instead of failing the build. */
  error: boolean;
}

/** Cache tag for Fauja Singh results (revalidated by the publish webhook). */
export const FAUJA_RESULTS_TAG = "fauja-results";

// Backstop TTL; the webhook is the primary freshness mechanism.
const REVALIDATE_SECONDS = 3600;

interface YearsResponse {
  faujaResultsYearCollection: {
    items: Array<{ year: number; csvFile: { url: string } | null }>;
  };
}

const YEARS_QUERY = `
  query FaujaYears {
    faujaResultsYearCollection(order: [year_DESC], limit: 100) {
      items {
        year
        csvFile { url }
      }
    }
  }
`;

// Exact header aliases (lowercased). Prefix matching is deliberately avoided:
// it would bind e.g. "Timestamp" to "time" and silently render wrong columns.
const HEADER_ALIASES: Record<"name" | "laps" | "distance" | "time", string[]> = {
  name: ["name"],
  laps: ["laps"],
  distance: ["distance", "distance (km)", "distance km", "distance (miles)"],
  time: ["time", "gun time"], // the charity's old tables used "Gun Time"
};
const REQUIRED = Object.keys(HEADER_ALIASES) as Array<keyof typeof HEADER_ALIASES>;

/**
 * Parse CSV text into result rows. Header row maps columns by name
 * (case-insensitive, any order). Returns null when the header is unusable.
 * Rows missing a name or a numeric laps value are skipped.
 */
export function csvToRows(text: string): FaujaResultRow[] | null {
  // Excel-exported UTF-8 CSVs are commonly BOM-prefixed; strip it so the
  // first header cell still matches.
  const table = parseCsv(text.replace(/^﻿/, ""));
  if (table.length < 1) return null;
  const header = table[0].map((h) => h.trim().toLowerCase());
  const idx: Record<string, number> = {};
  for (const key of REQUIRED) {
    const i = header.findIndex((h) => HEADER_ALIASES[key].includes(h));
    if (i === -1) return null;
    idx[key] = i;
  }
  const rows: FaujaResultRow[] = [];
  for (const raw of table.slice(1)) {
    const name = raw[idx.name]?.trim();
    const lapsRaw = raw[idx.laps]?.trim();
    const laps = Number(lapsRaw);
    // lapsRaw must be non-empty: Number("") is 0, which would turn DNS/blank
    // rows into phantom 0-lap finishers.
    if (!name || !lapsRaw || !Number.isFinite(laps)) continue;
    rows.push({
      name,
      laps,
      distance: raw[idx.distance]?.trim() ?? "",
      time: raw[idx.time]?.trim() ?? "",
    });
  }
  return rows;
}

/**
 * All published Fauja Singh result years, newest first, with their CSVs
 * fetched and parsed. A year with a missing/unusable CSV comes back with
 * `error: true` (rendered as a per-year message) rather than throwing —
 * an editor's bad upload must not take down the page or the build.
 */
export async function getFaujaResults(): Promise<FaujaYearResults[]> {
  const data = await contentfulQuery<YearsResponse>(YEARS_QUERY, {
    tags: [FAUJA_RESULTS_TAG],
  });

  // No published years at all -> the page has no dropdown to render; that's an
  // unseeded/broken state, so fail loud (consistent with the other results
  // pages). Per-year CSV problems stay editor-friendly (error flags) below.
  if (data.faujaResultsYearCollection.items.length === 0) {
    throw new Error("Contentful returned no published Fauja results years");
  }

  return Promise.all(
    data.faujaResultsYearCollection.items.map(async ({ year, csvFile }) => {
      if (!csvFile?.url) return { year, rows: [], error: true };
      const url = csvFile.url.startsWith("//") ? `https:${csvFile.url}` : csvFile.url;
      try {
        const res = await fetch(url, {
          next: { revalidate: REVALIDATE_SECONDS, tags: [FAUJA_RESULTS_TAG] },
        });
        if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
        const rows = csvToRows(await res.text());
        if (rows === null) return { year, rows: [], error: true };
        return { year, rows, error: false };
      } catch (err) {
        console.error(`[fauja-results] year ${year}: could not load CSV`, err);
        return { year, rows: [], error: true };
      }
    })
  );
}
