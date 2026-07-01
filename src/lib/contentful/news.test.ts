import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { NEWS_TAG, getNewsItem, getNewsItems } from "./news";

beforeEach(() => {
  mockQuery.mockReset();
});

const list = {
  newsItemCollection: {
    items: [
      {
        slug: "a",
        title: "A",
        date: "2026-06-01",
        excerpt: "ex a",
        thumbnail: { url: "https://x/a.jpg" },
      },
      { slug: "b", title: "B", date: "2026-05-01", excerpt: "ex b", thumbnail: null },
    ],
  },
};

describe("getNewsItems", () => {
  it("maps list items (null thumbnail -> undefined) and forwards the news tag", async () => {
    mockQuery.mockResolvedValue(list);
    const items = await getNewsItems();
    expect(items).toEqual([
      { slug: "a", title: "A", date: "2026-06-01", excerpt: "ex a", thumbnail: "https://x/a.jpg" },
      { slug: "b", title: "B", date: "2026-05-01", excerpt: "ex b", thumbnail: undefined },
    ]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), { tags: [NEWS_TAG] });
  });

  it("applies the limit", async () => {
    mockQuery.mockResolvedValue(list);
    const items = await getNewsItems(1);
    expect(items).toHaveLength(1);
    expect(items[0].slug).toBe("a");
  });
});

describe("getNewsItem", () => {
  it("returns the article with body and passes the slug variable", async () => {
    const doc = { nodeType: "document", data: {}, content: [] };
    mockQuery.mockResolvedValue({
      newsItemCollection: {
        items: [
          {
            slug: "a",
            title: "A",
            date: "2026-06-01",
            thumbnail: { url: "https://x/a.jpg" },
            body: { json: doc },
          },
        ],
      },
    });
    const article = await getNewsItem("a");
    expect(article).toEqual({
      slug: "a",
      title: "A",
      date: "2026-06-01",
      thumbnail: "https://x/a.jpg",
      body: doc,
    });
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), {
      tags: [NEWS_TAG],
      variables: { slug: "a" },
    });
  });

  it("returns null when no article matches the slug", async () => {
    mockQuery.mockResolvedValue({ newsItemCollection: { items: [] } });
    expect(await getNewsItem("missing")).toBeNull();
  });
});
