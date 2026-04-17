"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  /** Target email address for the mailto: submission */
  targetEmail: string;
  /** Additional className for the form wrapper */
  className?: string;
}

const MAILTO_SUBJECT = "Register Your Interest";

/**
 * Build the `mailto:` URL for the contact form submission.
 * Exported for unit tests.
 */
export function buildMailto({
  targetEmail,
  name,
  email,
  phone,
  message,
}: {
  targetEmail: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const body =
    `Name: ${name}\r\n` +
    `Email: ${email}\r\n` +
    `Phone: ${phone}\r\n` +
    `\r\n` +
    message;

  const params = new URLSearchParams({
    subject: MAILTO_SUBJECT,
    body,
  });
  // URLSearchParams uses `+` for spaces; mailto bodies should use %20 for
  // best client compatibility.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${targetEmail}?${query}`;
}

const fieldWrapper = "flex flex-col gap-2";
const labelClass = "text-sm font-medium text-foreground";
const inputClass = cn(
  "w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
);

/**
 * ContactForm — "Register Your Interest" form that submits via `mailto:`.
 * JS-only: on submit we assemble the mailto URL client-side and set
 * `window.location.href`. With JS disabled the form is inert; there is no
 * non-JS fallback (acknowledged tradeoff — avoids leaking the target
 * email into the rendered HTML via `action`).
 */
export function ContactForm({ targetEmail, className }: ContactFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const href = buildMailto({
      targetEmail,
      name,
      email,
      phone,
      message,
    });
    window.location.href = href;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-5 rounded-2xl bg-background p-6 shadow-sm ring-1 ring-border md:p-8",
        className
      )}
      noValidate={false}
    >
      <div className={fieldWrapper}>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className={fieldWrapper}>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className={fieldWrapper}>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className={fieldWrapper}>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputClass, "resize-y")}
        />
      </div>

      <div>
        <Button type="submit" variant="secondary" size="lg">
          Send
        </Button>
      </div>
    </form>
  );
}
