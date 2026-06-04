import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

function fillForm() {
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
}

describe("ContactForm", () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders all labelled fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("uses the correct input types and required attributes", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone Number")).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
  });

  it("includes a hidden honeypot field that is off the tab order", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("POSTs the form data to /api/contact and shows a success message", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "07123456789",
      message: "Hello there",
      company: "",
    });

    expect(await screen.findByRole("status")).toBeInTheDocument();
    // Form is replaced by the confirmation, so the fields are gone.
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  it("shows an error message when the API returns ok:false", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: "Please check the form." }),
    });
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.submit(container.querySelector("form")!);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please check the form."
    );
    // Form stays mounted so the user can retry.
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    fetchMock.mockRejectedValue(new Error("network"));
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.submit(container.querySelector("form")!);

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("ignores a second submit while the first is in flight", async () => {
    fetchMock.mockReturnValue(new Promise(() => {}));
    const { container } = render(<ContactForm />);
    fillForm();
    const form = container.querySelector("form")!;
    fireEvent.submit(form);
    fireEvent.submit(form);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });

  it("disables the button while the request is in flight", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    fetchMock.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.submit(container.querySelector("form")!);

    const button = await screen.findByRole("button", { name: "Sending…" });
    expect(button).toBeDisabled();

    resolveFetch({ ok: true, json: async () => ({ ok: true }) });
    await screen.findByRole("status");
  });
});
