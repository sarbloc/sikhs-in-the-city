import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EventsPage from "./page";

describe("EventsPage", () => {
  it("renders the hero heading", () => {
    render(<EventsPage />);
    expect(
      screen.getByRole("heading", {
        name: "Events That Move The Community",
      })
    ).toBeInTheDocument();
  });

  it("renders the Register Your Interest CTA linking to /contact", () => {
    render(<EventsPage />);
    const ctas = screen.getAllByRole("link", {
      name: "Register Your Interest",
    });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((link) => expect(link).toHaveAttribute("href", "/contact"));
  });

  it("renders the Events section heading", () => {
    render(<EventsPage />);
    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
  });

  it("renders both event cards", () => {
    render(<EventsPage />);
    expect(screen.getByText("Summer Samosa Ultra")).toBeInTheDocument();
    expect(screen.getByText("28th June 2026")).toBeInTheDocument();
    expect(screen.getByText("Dawn 2 Dusk Ultra")).toBeInTheDocument();
    expect(screen.getByText("6th December 2026")).toBeInTheDocument();
  });

  it("renders the Join CTA section", () => {
    render(<EventsPage />);
    expect(
      screen.getByRole("heading", { name: "Join Sikhs In the City" })
    ).toBeInTheDocument();
  });
});
