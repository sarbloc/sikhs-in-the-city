import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("resend", () => ({
  // Must be constructable (`new Resend(...)`), so use a class, not an arrow fn.
  Resend: class {
    emails = { send: mockSend };
  },
}));

import { POST } from "./route";

function postRequest(body: unknown, raw = false) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "07123456789",
  message: "I'd like to join.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test_key");
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: "email_1" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends an email and returns ok for a valid submission", async () => {
    const res = await POST(postRequest(valid));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    expect(mockSend).toHaveBeenCalledTimes(1);
    const payload = mockSend.mock.calls[0][0];
    expect(payload.to).toBe("info@sikhsinthecity.org");
    expect(payload.replyTo).toBe("jane@example.com");
    expect(payload.subject).toContain("Jane Doe");
    expect(payload.text).toContain("I'd like to join.");
    expect(payload.text).toContain("jane@example.com");
  });

  it("rejects a missing name without sending", async () => {
    const res = await POST(postRequest({ ...valid, name: "" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an invalid email without sending", async () => {
    const res = await POST(postRequest({ ...valid, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects an over-long message without sending", async () => {
    const res = await POST(postRequest({ ...valid, message: "x".repeat(5001) }));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("silently accepts but does not send when the honeypot is filled", async () => {
    const res = await POST(postRequest({ ...valid, company: "Spammer Inc" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 400 for an unparseable body", async () => {
    const res = await POST(postRequest("{not json", true));
    expect(res.status).toBe(400);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 500 when the API key is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(postRequest(valid));
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 502 when Resend reports an error", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: "boom", name: "application_error" },
    });
    const res = await POST(postRequest(valid));
    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
  });

  it("returns 502 when Resend throws", async () => {
    mockSend.mockRejectedValue(new Error("network down"));
    const res = await POST(postRequest(valid));
    expect(res.status).toBe(502);
  });
});
