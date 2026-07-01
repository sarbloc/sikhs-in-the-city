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
    total: number;
    items: Array<{
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      thumbnail: { url: string } | null;
    }>;
  };
}

// Bodies are not fetched here (cards don't need them); cached under the news tag.
const LIST_QUERY = `
  query NewsList($limit: Int!, $skip: Int!) {
    newsItemCollection(order: [date_DESC], limit: $limit, skip: $skip) {
      total
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

/**
 * Published news items, newest first. Pass a limit for the homepage teaser.
 * Pages through the collection (Contentful caps each request at 100) so the
 * full archive is returned even past 100 posts.
 */
export async function getNewsItems(limit?: number): Promise<NewsListItemData[]> {
  const PAGE = 100;
  const all: NewsListItemData[] = [];
  for (let skip = 0; ; skip += PAGE) {
    const data = await contentfulQuery<ListResponse>(LIST_QUERY, {
      tags: [NEWS_TAG],
      variables: { limit: PAGE, skip },
    });
    for (const i of data.newsItemCollection.items) {
      all.push({
        slug: i.slug,
        title: i.title,
        date: i.date,
        excerpt: i.excerpt,
        thumbnail: assetUrl(i.thumbnail?.url),
      });
    }
    const done =
      data.newsItemCollection.items.length < PAGE ||
      all.length >= data.newsItemCollection.total ||
      (typeof limit === "number" && all.length >= limit);
    if (done) break;
  }
  return typeof limit === "number" ? all.slice(0, limit) : all;
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
