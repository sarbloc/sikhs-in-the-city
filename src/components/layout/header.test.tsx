import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("renders the logo/brand name", () => {
    render(<Header />);
    expect(screen.getByText("Sikhs In The City")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Our Story" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "How To Join" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Events" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Clubhouse Appeal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contact Us" })
    ).toBeInTheDocument();
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
