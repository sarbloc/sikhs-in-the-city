import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowToJoinHero } from "./how-to-join-hero";

describe("HowToJoinHero", () => {
  it("renders the default heading", () => {
    render(<HowToJoinHero />);
    expect(
      screen.getByRole("heading", { name: "Start your running journey" }),
    ).toBeInTheDocument();
  });

  it("renders a custom heading", () => {
    render(<HowToJoinHero title="Custom Heading" />);
    expect(
      screen.getByRole("heading", { name: "Custom Heading" }),
    ).toBeInTheDocument();
  });

  it("renders the default description", () => {
    render(<HowToJoinHero />);
    expect(
      screen.getByText(/Whether you're new to running/),
    ).toBeInTheDocument();
  });

  it("renders CTA linking to /contact by default", () => {
    render(<HowToJoinHero />);
    const link = screen.getByRole("link", { name: "Register Your Interest" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders CTA with custom text and href", () => {
    render(<HowToJoinHero ctaText="Sign Up" ctaHref="/signup" />);
    const link = screen.getByRole("link", { name: "Sign Up" });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("applies a custom className to the section element", () => {
    const { container } = render(<HowToJoinHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
