// Minimal GraphQL client for the Contentful Content Delivery API.
// Uses the native fetch cache so responses are cached and revalidated by tag
// from the publish webhook (src/app/api/revalidate/contentful). The delivery
// token is read-only; never use the management (CFPAT) token at runtime.

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;

// Backstop cache lifetime for a missed webhook — not the primary freshness
// mechanism (the publish webhook revalidates by tag the moment content changes).
const DEFAULT_REVALIDATE_SECONDS = 3600;

export interface ContentfulQueryOptions {
  /** Cache tags for on-publish revalidation via revalidateTag. */
  tags?: string[];
  /** Override the backstop cache lifetime, in seconds. */
  revalidate?: number;
  /** GraphQL query variables. */
  variables?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/** Run a GraphQL query against the Contentful CDA. Throws on transport or GraphQL errors. */
export async function contentfulQuery<T>(
  query: string,
  options: ContentfulQueryOptions = {}
): Promise<T> {
  if (!SPACE || !TOKEN) {
    throw new Error(
      "Contentful is not configured: set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN"
    );
  }

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query, variables: options.variables }),
      next: {
        revalidate: options.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
        tags: options.tags ?? [],
      },
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Contentful query failed: ${res.status} ${detail.slice(0, 300)}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(
      `Contentful GraphQL errors: ${json.errors.map((e) => e.message).join("; ").slice(0, 300)}`
    );
  }
  if (!json.data) {
    throw new Error("Contentful query returned no data");
  }
  return json.data;
}
