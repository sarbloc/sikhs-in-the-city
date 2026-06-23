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

/** Cache tag for results (events + years), revalidated by the publish webhook. */
export const RESULTS_TAG = "results";

interface ResultsResponse {
  resultsEventCollection: {
    items: Array<{
      title: string;
      slug: string;
      linkedFrom: {
        resultsYearCollection: {
          items: Array<{ year: number | null; url: string | null }>;
        };
      } | null;
    }>;
  };
}

// The collection is tiny, so fetch all events with their linked years under one
// cache tag and pick the slug in code — no GraphQL variables. Each year carries
// its own explicit URL (resultsYear.url).
const RESULTS_QUERY = `
  query ResultsEvents {
    resultsEventCollection {
      items {
        title
        slug
        linkedFrom {
          resultsYearCollection(limit: 100) {
            items {
              year
              url
            }
          }
        }
      }
    }
  }
`;

/** Fetch a single external-results event by slug, with its per-year links. */
export async function getResultsEvent(slug: string): Promise<ResultsEvent> {
  const data = await contentfulQuery<ResultsResponse>(RESULTS_QUERY, { tags: [RESULTS_TAG] });
  const item = data.resultsEventCollection.items.find((i) => i.slug === slug);
  if (!item) {
    throw new Error(`No published resultsEvent for slug "${slug}"`);
  }
  const yearLinks = (item.linkedFrom?.resultsYearCollection.items ?? [])
    .filter((y): y is ResultsYearLink => typeof y.year === "number" && Boolean(y.url))
    .sort((a, b) => b.year - a.year); // newest first
  if (yearLinks.length === 0) {
    throw new Error(`resultsEvent "${slug}" has no published results years`);
  }
  return { title: item.title, yearLinks };
}
