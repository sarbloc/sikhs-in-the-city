import { render, screen, fireEvent } from "@testing-library/react";
import type { Mock } from "vitest";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ContactForm, buildMailto } from "./contact-form";

const TARGET = "info@sikhsinthecity.com";

describe("buildMailto", () => {
  it("composes a mailto: URL with subject and encoded body", () => {
    const href = buildMailto({
      targetEmail: TARGET,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "07123 456789",
      message: "Hello there",
    });

    expect(href.startsWith(`mailto:${TARGET}?`)).toBe(true);
    expect(href).toContain("subject=Register%20Your%20Interest");
    // Body is URL-encoded; CRLFs become %0D%0A.
    expect(href).toContain(
      "body=Name%3A%20Jane%20Doe%0D%0AEmail%3A%20jane%40example.com%0D%0APhone%3A%2007123%20456789%0D%0A%0D%0AHello%20there"
    );
  });

  it("encodes spaces as %20, not +", () => {
    const href = buildMailto({
      targetEmail: TARGET,
      name: "a b",
      email: "a@b.com",
      phone: "1",
      message: "c d",
    });
    expect(href).not.toMatch(/\+/);
  });
});

describe("ContactForm", () => {
  let hrefSetter: Mock<(value: string) => void>;
  let originalLocation: Location;

  beforeEach(() => {
    // jsdom's window.location.href assignment triggers navigation which
    // it doesn't support. Replace with a mock that records writes.
    originalLocation = window.location;
    hrefSetter = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        set href(value: string) {
          hrefSetter(value);
        },
        get href() {
          return hrefSetter.mock.calls.at(-1)?.[0] ?? "about:blank";
        },
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("renders all labelled fields", () => {
    render(<ContactForm targetEmail={TARGET} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("uses the correct input types for validation", () => {
    render(<ContactForm targetEmail={TARGET} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone Number")).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Phone Number")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
  });

  it("sets window.location.href to a mailto URL on submit", () => {
    const { container } = render(<ContactForm targetEmail={TARGET} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "07123456789" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello there" },
    });

    const form = container.querySelector("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(hrefSetter).toHaveBeenCalledTimes(1);
    const href = hrefSetter.mock.calls[0][0] as string;
    expect(href).toMatch(/^mailto:info@sikhsinthecity\.com\?/);
    expect(href).toContain("subject=Register%20Your%20Interest");
    expect(href).toContain("Name%3A%20Jane%20Doe");
    expect(href).toContain("Email%3A%20jane%40example.com");
    expect(href).toContain("Phone%3A%2007123456789");
    expect(href).toContain("Hello%20there");
  });

  it("prevents default navigation so submit is handled in JS", () => {
    const { container } = render(<ContactForm targetEmail={TARGET} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hi" },
    });

    const form = container.querySelector("form") as HTMLFormElement;
    const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
    const notPrevented = form.dispatchEvent(submitEvent);
    // Our handler calls preventDefault → dispatchEvent returns false.
    expect(notPrevented).toBe(false);
  });
});
