import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { EVENTS_TAG, getEvents } from "./events";

beforeEach(() => {
  mockQuery.mockReset();
});

describe("getEvents", () => {
  it("maps the GraphQL collection to EventItem[] and forwards the cache tag", async () => {
    mockQuery.mockResolvedValue({
      eventCollection: {
        items: [
          {
            title: "Summer Samosa Ultra",
            description: "Three distances.",
            date: "28th June 2026",
            imageAlt: "Runners",
            href: "https://example.com/samosa",
            image: { url: "https://images.ctfassets.net/x/y/samosa.png" },
          },
        ],
      },
    });

    const events = await getEvents();

    expect(events).toEqual([
      {
        title: "Summer Samosa Ultra",
        description: "Three distances.",
        date: "28th June 2026",
        imagePath: "https://images.ctfassets.net/x/y/samosa.png",
        imageAlt: "Runners",
        href: "https://example.com/samosa",
      },
    ]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), { tags: [EVENTS_TAG] });
  });

  it("coerces missing optional fields (image/imageAlt/href) to undefined", async () => {
    mockQuery.mockResolvedValue({
      eventCollection: {
        items: [
          {
            title: "Bare Event",
            description: "No extras.",
            date: "1st Jan 2027",
            imageAlt: null,
            href: null,
            image: null,
          },
        ],
      },
    });

    const [event] = await getEvents();
    expect(event.imagePath).toBeUndefined();
    expect(event.imageAlt).toBeUndefined();
    expect(event.href).toBeUndefined();
  });

  it("normalises a protocol-relative asset URL to https", async () => {
    mockQuery.mockResolvedValue({
      eventCollection: {
        items: [
          {
            title: "Proto",
            description: "x",
            date: "d",
            imageAlt: null,
            href: null,
            image: { url: "//images.ctfassets.net/x/y/z.png" },
          },
        ],
      },
    });

    const [event] = await getEvents();
    expect(event.imagePath).toBe("https://images.ctfassets.net/x/y/z.png");
  });
});
