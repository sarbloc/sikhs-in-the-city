import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JoinCtaSection } from "./join-cta-section";

describe("JoinCtaSection", () => {
  it("renders the default heading", () => {
    render(<JoinCtaSection />);
    expect(
      screen.getByRole("heading", { name: "Join Sikhs In the City" })
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
      screen.getByText(/Ready to start running/)
    ).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<JoinCtaSection description="Custom description here" />);
    expect(screen.getByText("Custom description here")).toBeInTheDocument();
  });

  it("renders CTA button with correct link", () => {
    render(<JoinCtaSection />);
    const link = screen.getByRole("link", { name: "Register Your Interest" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders the yellow card container", () => {
    const { container } = render(<JoinCtaSection />);
    expect(container.querySelector(".bg-secondary")).not.toBeNull();
  });

  it("renders the image when imagePath is provided", () => {
    render(<JoinCtaSection imageAlt="Runners celebrating" />);
    expect(screen.getByAltText("Runners celebrating")).toBeInTheDocument();
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
