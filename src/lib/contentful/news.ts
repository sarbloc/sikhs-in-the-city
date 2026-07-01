import type { Document } from "@contentful/rich-text-types";
import { contentfulQuery } from "./client";

/** News list item (homepage + listing cards). */
export interface NewsListItemData {
  slug: string;
  title: string;
  /** ISO date. */
  date: string;
  thumbnail?: string;
  excerpt: string;
}

/** A full news article (the /news/[slug] page). */
export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  thumbnail?: string;
  body: Document;
}

/** Cache tag for news, revalidated by the publish webhook. */
export const NEWS_TAG = "news";

function assetUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

interface ListResponse {
  newsItemCollection: {
    items: Array<{
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      thumbnail: { url: string } | null;
    }>;
  };
}

// One query (fetch all, newest first) serves both the homepage (sliced) and the
// full listing — deduped and cached under the news tag. Bodies are not fetched
// here (cards don't need them).
const LIST_QUERY = `
  query NewsList {
    newsItemCollection(order: [date_DESC]) {
      items {
        slug
        title
        date
        excerpt
        thumbnail { url }
      }
    }
  }
`;

/** Published news items, newest first. Pass a limit for the homepage teaser. */
export async function getNewsItems(limit?: number): Promise<NewsListItemData[]> {
  const data = await contentfulQuery<ListResponse>(LIST_QUERY, { tags: [NEWS_TAG] });
  const items = data.newsItemCollection.items.map((i) => ({
    slug: i.slug,
    title: i.title,
    date: i.date,
    excerpt: i.excerpt,
    thumbnail: assetUrl(i.thumbnail?.url),
  }));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

interface ArticleResponse {
  newsItemCollection: {
    items: Array<{
      slug: string;
      title: string;
      date: string;
      thumbnail: { url: string } | null;
      body: { json: Document } | null;
    }>;
  };
}

const ARTICLE_QUERY = `
  query NewsArticle($slug: String!) {
    newsItemCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        title
        date
        thumbnail { url }
        body { json }
      }
    }
  }
`;

/** A single article by slug, with its rich-text body. Null if not found. */
export async function getNewsItem(slug: string): Promise<NewsArticle | null> {
  const data = await contentfulQuery<ArticleResponse>(ARTICLE_QUERY, {
    tags: [NEWS_TAG],
    variables: { slug },
  });
  const item = data.newsItemCollection.items[0];
  if (!item?.body) return null;
  return {
    slug: item.slug,
    title: item.title,
    date: item.date,
    thumbnail: assetUrl(item.thumbnail?.url),
    body: item.body.json,
  };
}
