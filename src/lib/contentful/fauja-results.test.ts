import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockQuery } = vi.hoisted(() => ({ mockQuery: vi.fn() }));
vi.mock("./client", () => ({ contentfulQuery: mockQuery }));

import { FAUJA_RESULTS_TAG, csvToRows, getFaujaResults } from "./fauja-results";

const CSV = "Name,Laps,Distance,Time\r\nJane Doe,21,42.29,5:12:33\r\nJo Bloggs,5,10.07,1:10:23\r\n";

describe("csvToRows", () => {
  it("maps columns by header name, case-insensitive and reordered", () => {
    const rows = csvToRows("TIME,name,LAPS,Distance (km)\n5:12:33,Jane,21,42.29");
    expect(rows).toEqual([{ name: "Jane", laps: 21, distance: "42.29", time: "5:12:33" }]);
  });

  it("accepts the 'Gun Time' alias and does NOT bind 'Timestamp' to time", () => {
    const ok = csvToRows("Name,Laps,Distance,Gun Time\nJo,3,d,1:00:00");
    expect(ok?.[0].time).toBe("1:00:00");
    // Timestamp must not satisfy the time column (no prefix matching).
    expect(csvToRows("Timestamp,Name,Laps,Distance\nx,Jo,3,d")).toBeNull();
  });

  it("skips rows without a name or numeric laps (incl. blank laps)", () => {
    const rows = csvToRows("Name,Laps,Distance,Time\n,21,x,y\nJo,DNS,x,y\nBlank,,x,y\nOk,3,d,t");
    expect(rows).toEqual([{ name: "Ok", laps: 3, distance: "d", time: "t" }]);
  });

  it("propagates a malformed-CSV parse error (caught upstream as error:true)", () => {
    expect(() => csvToRows('Name,Laps,Distance,Time\n"unclosed,3,d,t')).toThrow(/unterminated/);
  });

  it("strips a UTF-8 BOM before matching the header (Excel exports)", () => {
    const rows = csvToRows("﻿Name,Laps,Distance,Time\nJo,3,d,t");
    expect(rows).toEqual([{ name: "Jo", laps: 3, distance: "d", time: "t" }]);
  });

  it("returns null when a required column is missing", () => {
    expect(csvToRows("Name,Laps,Time\nJo,3,t")).toBeNull();
    expect(csvToRows("")).toBeNull();
  });
});

describe("getFaujaResults", () => {
  const realFetch = global.fetch;

  beforeEach(() => {
    mockQuery.mockReset();
    mockQuery.mockResolvedValue({
      faujaResultsYearCollection: {
        items: [
          { year: 2025, csvFile: { url: "//assets.ctfassets.net/x/2025.csv" } },
          { year: 2019, csvFile: null },
        ],
      },
    });
  });

  afterEach(() => {
    global.fetch = realFetch;
  });

  it("fetches + parses CSVs per year and flags missing files as errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => CSV });

    const years = await getFaujaResults();

    expect(years.map((y) => y.year)).toEqual([2025, 2019]);
    expect(years[0].error).toBe(false);
    expect(years[0].rows).toHaveLength(2);
    expect(years[0].rows[0]).toEqual({
      name: "Jane Doe",
      laps: 21,
      distance: "42.29",
      time: "5:12:33",
    });
    expect(years[1]).toEqual({ year: 2019, rows: [], error: true });

    // CSV fetched over https with the cache tag.
    expect(global.fetch).toHaveBeenCalledWith(
      "https://assets.ctfassets.net/x/2025.csv",
      expect.objectContaining({
        next: expect.objectContaining({ tags: [FAUJA_RESULTS_TAG] }),
      })
    );
    expect(mockQuery).toHaveBeenCalledWith(expect.any(String), {
      tags: [FAUJA_RESULTS_TAG],
    });
  });

  it("throws when Contentful returns no published years at all", async () => {
    mockQuery.mockResolvedValue({ faujaResultsYearCollection: { items: [] } });
    await expect(getFaujaResults()).rejects.toThrow(/no published Fauja results years/);
  });

  it("flags a failed CSV fetch as an error without throwing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404, text: async () => "" });

    const years = await getFaujaResults();
    expect(years[0]).toEqual({ year: 2025, rows: [], error: true });
  });
});
