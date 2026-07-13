import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { COURSE_RECORDS_TAG, getCourseRecords } from "./course-records";

beforeEach(() => {
  mockQuery.mockReset();
});

describe("getCourseRecords", () => {
  it("maps categories with holders sorted by displayOrder and forwards the tag", async () => {
    mockQuery.mockResolvedValue({
      recordCategoryCollection: {
        items: [
          {
            name: "Ultra",
            requirement: "25+ laps",
            linkedFrom: {
              courseRecordCollection: {
                items: [
                  {
                    name: "Second",
                    laps: 41,
                    distance: "82.57 km",
                    time: "7h48:19",
                    year: 2019,
                    displayOrder: 2,
                  },
                  {
                    name: "First",
                    laps: 50,
                    distance: "100.7 km",
                    time: "7h28:01",
                    year: 2023,
                    displayOrder: 1,
                  },
                ],
              },
            },
          },
          {
            name: "10K",
            requirement: "5 laps",
            linkedFrom: {
              courseRecordCollection: {
                items: [
                  { name: "Only", laps: 5, distance: null, time: "34m:46.0", year: 2021, displayOrder: 1 },
                ],
              },
            },
          },
        ],
      },
    });

    const records = await getCourseRecords();

    expect(records).toHaveLength(2);
    expect(records[0].category).toBe("Ultra");
    expect(records[0].holders.map((h) => h.name)).toEqual(["First", "Second"]);
    expect(records[1].holders[0].distance).toBeUndefined(); // null -> undefined
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), {
      tags: [COURSE_RECORDS_TAG],
    });
  });

  it("throws when Contentful returns no categories", async () => {
    mockQuery.mockResolvedValue({ recordCategoryCollection: { items: [] } });
    await expect(getCourseRecords()).rejects.toThrow(/no published record categories/);
  });
});
