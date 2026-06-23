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
        urlTemplate: "https://x.test/g.html?f=d2d{yy}.clax",
        years: ["2024", "2025", "2023"],
      },
      {
        title: "Summer Samosa",
        slug: "summer-samosa",
        urlTemplate: "https://x.test/g.html?f=SummerSamosa{yy}.clax",
        years: ["2025"],
      },
    ],
  },
};

beforeEach(() => {
  mockQuery.mockReset();
  mockQuery.mockResolvedValue(collection);
});

describe("getResultsEvent", () => {
  it("finds the event by slug, sorts years newest-first, and builds URLs", async () => {
    const event = await getResultsEvent("dawn-to-dusk");
    expect(event.title).toBe("Dawn To Dusk");
    expect(event.yearLinks).toEqual([
      { year: 2025, url: "https://x.test/g.html?f=d2d25.clax" },
      { year: 2024, url: "https://x.test/g.html?f=d2d24.clax" },
      { year: 2023, url: "https://x.test/g.html?f=d2d23.clax" },
    ]);
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), { tags: [RESULTS_TAG] });
  });

  it("throws when no event matches the slug", async () => {
    await expect(getResultsEvent("does-not-exist")).rejects.toThrow(/No published resultsEvent/);
  });
});
