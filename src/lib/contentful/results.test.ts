import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { RESULTS_TAG, getResultsEvent } from "./results";

const collection = {
  resultsEventCollection: {
    items: [
      {
        title: "Dawn To Dusk",
        slug: "dawn-to-dusk",
        linkedFrom: {
          resultsYearCollection: {
            items: [
              { year: 2024, url: "https://x/d2d24" },
              { year: 2025, url: "https://x/d2d25" },
              { year: 2023, url: "https://x/d2d23" },
            ],
          },
        },
      },
      {
        title: "Summer Samosa",
        slug: "summer-samosa",
        linkedFrom: {
          resultsYearCollection: { items: [{ year: 2025, url: "https://x/ss25" }] },
        },
      },
    ],
  },
};

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockResolvedValue(collection);
});

describe("getResultsEvent", () => {
  it("finds the event by slug, sorts years newest-first, and forwards the tag", async () => {
    const event = await getResultsEvent("dawn-to-dusk");
    expect(event.title).toBe("Dawn To Dusk");
    expect(event.yearLinks).toEqual([
      { year: 2025, url: "https://x/d2d25" },
      { year: 2024, url: "https://x/d2d24" },
      { year: 2023, url: "https://x/d2d23" },
    ]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), { tags: [RESULTS_TAG] });
  });

  it("throws when no event matches the slug", async () => {
    await expect(getResultsEvent("does-not-exist")).rejects.toThrow(/No published resultsEvent/);
  });

  it("throws when the matched event has no published results years", async () => {
    mockQuery.mockResolvedValue({
      resultsEventCollection: {
        items: [
          {
            title: "Empty",
            slug: "empty",
            linkedFrom: { resultsYearCollection: { items: [] } },
          },
        ],
      },
    });
    await expect(getResultsEvent("empty")).rejects.toThrow(/no published results years/);
  });
});
