// Server-side handler for the "Register Your Interest" contact form.
// Emails the charity inbox via Resend. The recipient is fixed here and is
// never read from the request body, so this endpoint cannot be abused as an
// open relay to arbitrary addresses.

import { Resend } from "resend";

const TO_EMAIL = "info@sikhsinthecity.org";

// Field length caps: bound the payload and reject obvious garbage.
const LIMITS = { name: 100, email: 200, phone: 50, message: 5000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — a hidden field real users never fill. */
  company: string;
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
  const company = typeof b.company === "string" ? b.company : "";

  if (!name || name.length > LIMITS.name) return null;
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return null;
  if (!phone || phone.length > LIMITS.phone) return null;
  if (!message || message.length > LIMITS.message) return null;

  return { name, email, phone, message, company };
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
  if (input.company.trim() !== "") {
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

  const { name, email, phone, message } = input;
  const text =
    `Name: ${name}\n` + `Email: ${email}\n` + `Phone: ${phone}\n\n` + message;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Sikhs In The City <${fromEmail}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Register Your Interest — ${name}`,
      text,
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error);
      return Response.json(
        { ok: false, error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Resend threw while sending:", err);
    return Response.json(
      { ok: false, error: "We couldn't send your message. Please try again." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
