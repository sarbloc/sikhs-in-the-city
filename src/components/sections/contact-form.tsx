"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  /** Additional className for the form wrapper */
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const fieldWrapper = "flex flex-col gap-2";
const labelClass = "text-sm font-medium text-foreground";
const inputClass = cn(
  "w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
);

/**
 * ContactForm — "Register Your Interest" form. Submits to the `/api/contact`
 * route handler, which emails the charity inbox via Resend. Includes a hidden
 * honeypot field (`company`) for basic spam filtering.
 */
export function ContactForm({ className }: ContactFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState(""); // bots fill this; humans don't
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  // Synchronous re-entrancy guard: `status` updates asynchronously, so a rapid
  // double-submit (double-click / double-Enter) can pass a state check before
  // the rerender disables the button. A ref flips immediately and prevents the
  // duplicate POST (and the duplicate email it would generate).
  const submittingRef = React.useRef(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, hp_field: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "rounded-2xl bg-background p-6 shadow-sm ring-1 ring-border md:p-8",
          className
        )}
      >
        <h2 className="text-xl font-semibold text-foreground">
          Thanks &mdash; your message is on its way
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          We&apos;ve received your details and will be in touch soon.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

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

      {/* Honeypot: visually hidden and off the a11y tree. Bots fill it; humans don't. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-hp-field">Leave this field empty</label>
        <input
          id="contact-hp-field"
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div>
        <Button type="submit" variant="secondary" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  );
}
