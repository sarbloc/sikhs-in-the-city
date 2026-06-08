// Server-side handler for the "Register Your Interest" contact form.
// Emails the charity inbox via Resend. The recipient is fixed here and is
// never read from the request body, so this endpoint cannot be abused as an
// open relay to arbitrary addresses.

import { Resend } from "resend";

const TO_EMAIL = "info@sikhsinthecity.org";

// Field length caps: bound the payload and reject obvious garbage.
const LIMITS = { name: 100, email: 200, phone: 50, message: 5000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Input sanitisation -----------------------------------------------------
// parseInput validates (accept/reject); these strip characters that could
// distort the outgoing email. The body is sent as plain text via Resend's JSON
// API (not raw SMTP), so this is defence-in-depth — chiefly it keeps CR/LF out
// of the subject and single-line fields, and future-proofs an HTML switch.
const TAB = 0x09;
const LF = 0x0a;
const CR = 0x0d;
const DEL = 0x7f;

function isControl(code: number): boolean {
  return code < 0x20 || code === DEL;
}

/** Collapse a value to a single clean line (no control chars, single spaces). */
function oneLine(v: string): string {
  let out = "";
  for (const ch of v) {
    out += isControl(ch.charCodeAt(0)) ? " " : ch;
  }
  return out.replace(/\s+/g, " ").trim();
}

/** Strip control characters from the message body but keep tabs and newlines. */
function cleanBody(v: string): string {
  let out = "";
  for (const ch of v) {
    const code = ch.charCodeAt(0);
    if (code === CR) continue; // drop CR so CRLF collapses to LF
    if (isControl(code) && code !== TAB && code !== LF) continue;
    out += ch;
  }
  return out;
}

// --- Best-effort rate limiting ----------------------------------------------
// One successful submission per IP per window. NOTE: this Map is in-memory, so
// on Vercel's ephemeral, horizontally-scaled functions it resets on cold start
// and is not shared across instances — deterrence against casual floods, not a
// hard guarantee. The blast radius is small (only ever emails the fixed charity
// inbox, and Resend's own send cap is the real ceiling). If real abuse appears,
// swap this for a shared store (e.g. Upstash Redis free tier) behind the same
// two call sites.
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 send per IP per day
const lastSendByIp = new Map<string, number>();

/** Clear the in-memory limiter — exported for tests only. */
export function resetRateLimitStore(): void {
  lastSendByIp.clear();
}

// Vercel sets x-real-ip at the edge to the trusted client address; unlike the
// first x-forwarded-for hop, a client cannot spoof it. Returns null when no
// trusted IP is available (e.g. local dev) so callers can fail open rather than
// bucket every such request under one shared key.
function clientIp(request: Request): string | null {
  const realIp = request.headers.get("x-real-ip");
  return realIp ? realIp.trim() || null : null;
}

function isRateLimited(ip: string, now: number): boolean {
  const last = lastSendByIp.get(ip);
  if (last === undefined) return false;
  if (now - last < RATE_LIMIT_WINDOW_MS) return true;
  lastSendByIp.delete(ip); // window elapsed; prune the stale entry
  return false;
}

interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — a hidden field real users never fill. */
  honeypot: string;
}

/** Validate and normalise the untrusted request body. Returns null if invalid. */
function parseInput(body: unknown): ContactInput | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(b.name);
  const email = str(b.email);
  const phone = str(b.phone);
  const message = str(b.message);
  // Honeypot wire name avoids the `company`/organization autofill token so
  // password managers don't fill it for real users (which would drop the send).
  const honeypot = typeof b.hp_field === "string" ? b.hp_field : "";

  if (!name || name.length > LIMITS.name) return null;
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return null;
  if (!phone || phone.length > LIMITS.phone) return null;
  if (!message || message.length > LIMITS.message) return null;

  return { name, email, phone, message, honeypot };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const input = parseInput(body);
  if (!input) {
    return Response.json(
      { ok: false, error: "Please complete every field with a valid email address." },
      { status: 400 }
    );
  }

  // Honeypot tripped: accept silently (so bots get no signal) but send nothing.
  // Returns before the rate limiter so it never consumes a real user's allowance.
  if (input.honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  // Both must be set in production. CONTACT_FROM_EMAIL must be an address on a
  // domain verified in Resend — there is no safe default. onboarding@resend.dev
  // only delivers to the Resend account owner, so it would 502 on real
  // submissions to the charity inbox; a missing sender is a misconfiguration.
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    console.error(
      "[contact] Email is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL); cannot send"
    );
    return Response.json(
      { ok: false, error: "Email is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  // Gate the actual send. Only valid, non-honeypot, sendable requests reach
  // here, so validation failures never burn a user's allowance. When no trusted
  // client IP is available we fail open (skip the limiter) rather than throttle
  // every anonymous request under a single shared bucket.
  const ip = clientIp(request);
  const now = Date.now();
  if (ip) {
    if (isRateLimited(ip, now)) {
      return Response.json(
        {
          ok: false,
          error:
            "You've already sent a message recently. Please email info@sikhsinthecity.org directly.",
        },
        { status: 429 }
      );
    }
    // Record optimistically so concurrent requests can't both pass; rolled back
    // below if the send fails, so a transient error doesn't cost the allowance.
    lastSendByIp.set(ip, now);
  }

  const { name, email, phone, message } = input;
  const cleanName = oneLine(name);
  const text =
    `Name: ${cleanName}\n` +
    `Email: ${email}\n` +
    `Phone: ${oneLine(phone)}\n\n` +
    cleanBody(message);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Sikhs In The City <${fromEmail}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `SITC Website Enquiry - ${cleanName}`,
      text,
    });

    if (error) {
      if (ip) lastSendByIp.delete(ip); // send failed — let them retry
      console.error("[contact] Resend returned an error:", error);
      return Response.json(
        { ok: false, error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    if (ip) lastSendByIp.delete(ip); // send threw — let them retry
    console.error("[contact] Resend threw while sending:", err);
    return Response.json(
      { ok: false, error: "We couldn't send your message. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
