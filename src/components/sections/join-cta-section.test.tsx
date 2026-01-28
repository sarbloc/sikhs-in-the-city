import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JoinCtaSection } from "./join-cta-section";

describe("JoinCtaSection", () => {
  it("renders the default heading", () => {
    render(<JoinCtaSection />);
    expect(
      screen.getByRole("heading", { name: "Ready to Start Running?" })
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<JoinCtaSection heading="Get Started Today" />);
    expect(
      screen.getByRole("heading", { name: "Get Started Today" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<JoinCtaSection />);
    expect(
      screen.getByText(/Join our welcoming community/)
    ).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<JoinCtaSection description="Custom description here" />);
    expect(screen.getByText("Custom description here")).toBeInTheDocument();
  });

  it("renders CTA button with correct link", () => {
    render(<JoinCtaSection />);
    const link = screen.getByRole("link", { name: "Join Us Today" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders custom CTA", () => {
    render(<JoinCtaSection ctaText="Sign Up Now" ctaHref="/signup" />);
    const link = screen.getByRole("link", { name: "Sign Up Now" });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("applies custom className", () => {
    const { container } = render(<JoinCtaSection className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
