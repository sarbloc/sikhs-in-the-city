import { contentfulQuery } from "./client";

/** Shape consumed by EventsSection / EventCard. */
export interface EventItem {
  title: string;
  description: string;
  date: string;
  imagePath?: string;
  imageAlt?: string;
  href?: string;
}

/** Cache tag for the Events collection (revalidated by the publish webhook). */
export const EVENTS_TAG = "events";

interface EventsResponse {
  eventCollection: {
    items: Array<{
      title: string;
      description: string;
      date: string;
      imageAlt: string | null;
      href: string | null;
      image: { url: string } | null;
    }>;
  };
}

const EVENTS_QUERY = `
  query Events {
    eventCollection(order: [displayOrder_ASC]) {
      items {
        title
        description
        date
        imageAlt
        href
        image { url }
      }
    }
  }
`;

/** Normalise a Contentful asset URL (protocol-relative -> https). */
function assetUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

/** Fetch published events from Contentful, ordered for display. */
export async function getEvents(): Promise<EventItem[]> {
  const data = await contentfulQuery<EventsResponse>(EVENTS_QUERY, { tags: [EVENTS_TAG] });
  return data.eventCollection.items.map((item) => ({
    title: item.title,
    description: item.description,
    date: item.date,
    imagePath: assetUrl(item.image?.url),
    imageAlt: item.imageAlt ?? undefined,
    href: item.href ?? undefined,
  }));
}
