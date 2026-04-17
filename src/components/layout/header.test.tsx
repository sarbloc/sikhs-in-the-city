import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("renders the logo/brand name", () => {
    render(<Header />);
    expect(screen.getByAltText("Sikhs In The City")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Store" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our Story" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "How To Join" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Events" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "ClubHouse Appeal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contact Us" })
    ).toBeInTheDocument();
  });

  it("renders a Results dropdown trigger in desktop nav", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /results/i })
    ).toBeInTheDocument();
  });

  it("shows Results dropdown items when trigger is activated", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", { name: /results/i });
    await user.click(trigger);

    expect(
      screen.getByRole("link", { name: "Dawn To Dusk" })
    ).toHaveAttribute("href", "/results/dawn-to-dusk");
    expect(
      screen.getByRole("link", { name: "Summer Samosa" })
    ).toHaveAttribute("href", "/results/summer-samosa");
    expect(
      screen.getByRole("link", { name: "Fauja Singh Birthday Challenge" })
    ).toHaveAttribute("href", "/results/fauja-singh-birthday-challenge");
  });

  it("renders mobile menu trigger button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: "Open menu" })
    ).toBeInTheDocument();
  });

  it("opens mobile menu when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    await user.click(menuButton);

    // Mobile menu should show navigation title
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("toggles mobile Results disclosure to reveal sub-links", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    // Scope lookup to the mobile sheet dialog so we don't match the desktop
    // NavigationMenuTrigger (also a button with "Results" text) that exists in
    // the DOM but is hidden at mobile breakpoints via Tailwind classes.
    const sheetDialog = screen.getByRole("dialog");
    const resultsToggle = within(sheetDialog).getByRole("button", {
      name: /^results$/i,
    });
    expect(resultsToggle).toHaveAttribute("aria-expanded", "false");

    await user.click(resultsToggle);
    expect(resultsToggle).toHaveAttribute("aria-expanded", "true");

    const submenuEl = document.getElementById("mobile-results-submenu");
    expect(submenuEl).not.toBeNull();
    const submenuScope = within(submenuEl as HTMLElement);
    expect(
      submenuScope.getByRole("link", { name: "Dawn To Dusk" })
    ).toHaveAttribute("href", "/results/dawn-to-dusk");
    expect(
      submenuScope.getByRole("link", { name: "Summer Samosa" })
    ).toHaveAttribute("href", "/results/summer-samosa");
    expect(
      submenuScope.getByRole("link", {
        name: "Fauja Singh Birthday Challenge",
      })
    ).toHaveAttribute("href", "/results/fauja-singh-birthday-challenge");

    // collapse again
    await user.click(resultsToggle);
    expect(resultsToggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-results-submenu")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<Header className="custom-class" />);
    expect(container.querySelector("header")).toHaveClass("custom-class");
  });

  it("logo links to home page", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /sikhs in the city/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
