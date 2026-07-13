import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockRevalidateTag } = vi.hoisted(() => ({ mockRevalidateTag: vi.fn() }));
vi.mock("next/cache", () => ({ revalidateTag: mockRevalidateTag }));

import { POST } from "./route";

const SECRET = "test-secret";

function webhook(body: unknown, secret?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret !== undefined) headers["x-contentful-webhook-secret"] = secret;
  return new Request("http://localhost/api/revalidate/contentful", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const eventPayload = { sys: { contentType: { sys: { id: "event" } } } };

describe("POST /api/revalidate/contentful", () => {
  beforeEach(() => {
    vi.stubEnv("CONTENTFUL_REVALIDATE_SECRET", SECRET);
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockRevalidateTag.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("revalidates the events tag for an event publish with the correct secret", async () => {
    const res = await POST(webhook(eventPayload, SECRET));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, tags: ["events"] });
    expect(mockRevalidateTag).toHaveBeenCalledWith("events", { expire: 0 });
  });

  it("revalidates the hero tag for a heroSlide publish", async () => {
    const res = await POST(
      webhook({ sys: { contentType: { sys: { id: "heroSlide" } } } }, SECRET)
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, tags: ["hero"] });
    expect(mockRevalidateTag).toHaveBeenCalledWith("hero", { expire: 0 });
  });

  it("revalidates the results tag for a resultsEvent publish", async () => {
    const res = await POST(
      webhook({ sys: { contentType: { sys: { id: "resultsEvent" } } } }, SECRET)
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, tags: ["results"] });
    expect(mockRevalidateTag).toHaveBeenCalledWith("results", { expire: 0 });
  });

  it("revalidates the results tag for a resultsYear publish", async () => {
    const res = await POST(
      webhook({ sys: { contentType: { sys: { id: "resultsYear" } } } }, SECRET)
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, tags: ["results"] });
    expect(mockRevalidateTag).toHaveBeenCalledWith("results", { expire: 0 });
  });

  it("revalidates the news tag for a newsItem publish", async () => {
    const res = await POST(
      webhook({ sys: { contentType: { sys: { id: "newsItem" } } } }, SECRET)
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, tags: ["news"] });
    expect(mockRevalidateTag).toHaveBeenCalledWith("news", { expire: 0 });
  });

  it("revalidates the course-records tag for recordCategory and courseRecord publishes", async () => {
    for (const id of ["recordCategory", "courseRecord"]) {
      mockRevalidateTag.mockReset();
      const res = await POST(webhook({ sys: { contentType: { sys: { id } } } }, SECRET));
      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({
        revalidated: true,
        tags: ["course-records"],
      });
      expect(mockRevalidateTag).toHaveBeenCalledWith("course-records", { expire: 0 });
    }
  });

  it("rejects a missing secret with 401 and revalidates nothing", async () => {
    const res = await POST(webhook(eventPayload));
    expect(res.status).toBe(401);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a wrong secret with 401 and revalidates nothing", async () => {
    const res = await POST(webhook(eventPayload, "wrong-secret"));
    expect(res.status).toBe(401);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("falls back to all known tags when the payload has no content type (asset)", async () => {
    const res = await POST(webhook({ sys: { type: "Asset" } }, SECRET));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      revalidated: true,
      tags: ["events", "hero", "results", "news", "course-records"],
    });
    expect(mockRevalidateTag).toHaveBeenCalledWith("events", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("hero", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("results", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("news", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("course-records", { expire: 0 });
  });

  it("revalidates all known tags when the body is not valid JSON", async () => {
    const res = await POST(webhook("{not json", SECRET));
    expect(res.status).toBe(200);
    expect(mockRevalidateTag).toHaveBeenCalledWith("events", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("hero", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("results", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("news", { expire: 0 });
    expect(mockRevalidateTag).toHaveBeenCalledWith("course-records", { expire: 0 });
  });

  it("returns 500 and revalidates nothing when the secret is not configured", async () => {
    vi.stubEnv("CONTENTFUL_REVALIDATE_SECRET", "");
    const res = await POST(webhook(eventPayload, SECRET));
    expect(res.status).toBe(500);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });
});
