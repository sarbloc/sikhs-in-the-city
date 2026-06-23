import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { HERO_TAG, getHeroSlides } from "./hero";

beforeEach(() => {
  mockQuery.mockReset();
});

describe("getHeroSlides", () => {
  it("maps the GraphQL collection to HeroSlideItem[] and forwards the cache tag", async () => {
    mockQuery.mockResolvedValue({
      heroSlideCollection: {
        items: [
          {
            heading: "Sikhs In The City",
            subheading: "A running charity.",
            backgroundImage: { url: "https://images.ctfassets.net/x/y/slide-1.png" },
            primaryCta: "Join The Run",
            primaryHref: "/how-to-join",
            secondaryCta: "Learn About Us",
            secondaryHref: "/our-story",
          },
        ],
      },
    });

    const slides = await getHeroSlides();

    expect(slides).toEqual([
      {
        heading: "Sikhs In The City",
        subheading: "A running charity.",
        backgroundImage: "https://images.ctfassets.net/x/y/slide-1.png",
        primaryCta: "Join The Run",
        primaryHref: "/how-to-join",
        secondaryCta: "Learn About Us",
        secondaryHref: "/our-story",
      },
    ]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), { tags: [HERO_TAG] });
  });

  it("coerces missing optional fields (image / CTAs) to undefined", async () => {
    mockQuery.mockResolvedValue({
      heroSlideCollection: {
        items: [
          {
            heading: "Bare Slide",
            subheading: "No extras.",
            backgroundImage: null,
            primaryCta: null,
            primaryHref: null,
            secondaryCta: null,
            secondaryHref: null,
          },
        ],
      },
    });

    const [slide] = await getHeroSlides();
    expect(slide.backgroundImage).toBeUndefined();
    expect(slide.primaryCta).toBeUndefined();
    expect(slide.secondaryHref).toBeUndefined();
  });
});
