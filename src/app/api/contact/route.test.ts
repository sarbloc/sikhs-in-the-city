import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("resend", () => ({
  // Must be constructable (`new Resend(...)`), so use a class, not an arrow fn.
  Resend: class {
    emails = { send: mockSend };
  },
}));

import { POST, resetRateLimitStore } from "./route";

function postRequest(body: unknown, raw = false, ip?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (ip) headers["x-real-ip"] = ip;
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "07123456789",
  message: "I'd like to join.",
};

// Built from char codes so the test source stays free of literal control chars.
const CRLF = String.fromCharCode(13, 10);

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test_key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "noreply@sikhsinthecity.org");
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockSend.mockReset();
    mockSend.mockResolvedValue({ data: { id: "email_1" }, error: null });
    resetRateLimitStore();
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
    expect(payload.from).toContain("noreply@sikhsinthecity.org");
    expect(payload.replyTo).toBe("jane@example.com");
    expect(payload.subject).toContain("SITC Website Enquiry");
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
    const res = await POST(postRequest({ ...valid, hp_field: "Spammer Inc" }));
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

  it("returns 500 when the from address is not configured", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
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

  it("strips CR/LF and control characters from the subject and body", async () => {
    await POST(
      postRequest(
        {
          ...valid,
          name: `Jane${CRLF}Bcc: evil@example.com`,
          message: `line1${CRLF}line2`,
        },
        false,
        "203.0.113.1"
      )
    );
    const payload = mockSend.mock.calls[0][0];
    const subjectCodes = [...(payload.subject as string)].map((c) =>
      c.charCodeAt(0)
    );
    expect(subjectCodes).not.toContain(13); // CR
    expect(subjectCodes).not.toContain(10); // LF
    expect(payload.subject).toContain("Jane");
    // Body keeps newlines but drops the CR from CRLF.
    expect([...(payload.text as string)].map((c) => c.charCodeAt(0))).not.toContain(
      13
    );
  });

  it("rate-limits a second send from the same IP", async () => {
    const first = await POST(postRequest(valid, false, "198.51.100.7"));
    expect(first.status).toBe(200);

    const second = await POST(postRequest(valid, false, "198.51.100.7"));
    expect(second.status).toBe(429);
    await expect(second.json()).resolves.toMatchObject({ ok: false });
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("allows sends from different IPs", async () => {
    const a = await POST(postRequest(valid, false, "198.51.100.1"));
    const b = await POST(postRequest(valid, false, "198.51.100.2"));
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("does not rate-limit when no trusted client IP is available (fail open)", async () => {
    const first = await POST(postRequest(valid));
    const second = await POST(postRequest(valid));
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("does not consume the allowance when the send fails", async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: "boom", name: "application_error" },
    });
    const first = await POST(postRequest(valid, false, "198.51.100.9"));
    expect(first.status).toBe(502);

    const second = await POST(postRequest(valid, false, "198.51.100.9"));
    expect(second.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(2);
  });
});
