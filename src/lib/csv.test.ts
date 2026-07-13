import { describe, expect, it } from "vitest";
import { parseCsv } from "./csv";

describe("parseCsv", () => {
  it("parses simple rows with CRLF and LF endings", () => {
    expect(parseCsv("a,b\r\nc,d\ne,f\r\n")).toEqual([
      ["a", "b"],
      ["c", "d"],
      ["e", "f"],
    ]);
  });

  it("handles quoted fields with commas and escaped quotes", () => {
    expect(parseCsv('"Doe, Jane",21\n"She said ""hi""",5')).toEqual([
      ["Doe, Jane", "21"],
      ['She said "hi"', "5"],
    ]);
  });

  it("handles newlines inside quoted fields", () => {
    expect(parseCsv('"line1\nline2",x')).toEqual([["line1\nline2", "x"]]);
  });

  it("skips fully empty lines and handles a missing trailing newline", () => {
    expect(parseCsv("a,b\n\nc,d")).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  it("returns [] for empty input", () => {
    expect(parseCsv("")).toEqual([]);
    expect(parseCsv("\r\n")).toEqual([]);
  });
});
