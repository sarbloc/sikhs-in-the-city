import { contentfulQuery } from "./client";

export interface ResultsYearLink {
  year: number;
  url: string;
}

/** Shape consumed by the external-results pages. */
export interface ResultsEvent {
  title: string;
  yearLinks: ResultsYearLink[];
}

/** Cache tag for results events (revalidated by the publish webhook). */
export const RESULTS_TAG = "results";

interface ResultsResponse {
  resultsEventCollection: {
    items: Array<{
      title: string;
      slug: string;
      urlTemplate: string;
      years: string[] | null;
    }>;
  };
}

// The collection is tiny (one entry per external-results event), so we fetch it
// all under one cache tag and pick the slug in code — no GraphQL variables.
const RESULTS_QUERY = `
  query ResultsEvents {
    resultsEventCollection {
      items {
        title
        slug
        urlTemplate
        years
      }
    }
  }
`;

/** Build a per-year results URL from the template ({yy} -> 2-digit year). */
function buildUrl(template: string, year: number): string {
  return template.replaceAll("{yy}", String(year).slice(-2));
}

/** Fetch a single external-results event by slug, with per-year links built. */
export async function getResultsEvent(slug: string): Promise<ResultsEvent> {
  const data = await contentfulQuery<ResultsResponse>(RESULTS_QUERY, { tags: [RESULTS_TAG] });
  const item = data.resultsEventCollection.items.find((i) => i.slug === slug);
  if (!item) {
    throw new Error(`No published resultsEvent for slug "${slug}"`);
  }
  const yearLinks = (item.years ?? [])
    .map((y) => Number(y))
    .filter((y) => Number.isFinite(y))
    .sort((a, b) => b - a) // newest first
    .map((year) => ({ year, url: buildUrl(item.urlTemplate, year) }));
  // A results event with no valid years can't render a useful page, so fail
  // loudly (consistent with the hero) rather than building a broken dropdown.
  if (yearLinks.length === 0) {
    throw new Error(`resultsEvent "${slug}" has no valid years`);
  }
  return { title: item.title, yearLinks };
}
