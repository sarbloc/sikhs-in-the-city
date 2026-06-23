import { contentfulQuery } from "./client";

/** Shape consumed by HeroSection. */
export interface HeroSlideItem {
  heading: string;
  subheading: string;
  backgroundImage?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

/** Cache tag for the hero slides (revalidated by the publish webhook). */
export const HERO_TAG = "hero";

interface HeroResponse {
  heroSlideCollection: {
    items: Array<{
      heading: string;
      subheading: string;
      backgroundImage: { url: string } | null;
      primaryCta: string | null;
      primaryHref: string | null;
      secondaryCta: string | null;
      secondaryHref: string | null;
    }>;
  };
}

const HERO_QUERY = `
  query Hero {
    heroSlideCollection(order: [displayOrder_ASC]) {
      items {
        heading
        subheading
        backgroundImage { url }
        primaryCta
        primaryHref
        secondaryCta
        secondaryHref
      }
    }
  }
`;

/** Normalise a Contentful asset URL (protocol-relative -> https). */
function assetUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

/** Fetch the homepage hero slides from Contentful, ordered for display. */
export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const data = await contentfulQuery<HeroResponse>(HERO_QUERY, { tags: [HERO_TAG] });
  return data.heroSlideCollection.items.map((item) => ({
    heading: item.heading,
    subheading: item.subheading,
    backgroundImage: assetUrl(item.backgroundImage?.url),
    primaryCta: item.primaryCta ?? undefined,
    primaryHref: item.primaryHref ?? undefined,
    secondaryCta: item.secondaryCta ?? undefined,
    secondaryHref: item.secondaryHref ?? undefined,
  }));
}
