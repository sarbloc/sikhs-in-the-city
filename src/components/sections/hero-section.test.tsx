import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("renders the default heading", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { name: "Sikhs In The City" })
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSection heading="Custom Heading" />);
    expect(
      screen.getByRole("heading", { name: "Custom Heading" })
    ).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    render(<HeroSection subheading="Custom subheading text" />);
    expect(screen.getByText("Custom subheading text")).toBeInTheDocument();
  });

  it("renders primary CTA button with correct link", () => {
    render(<HeroSection primaryCta="Get Started" primaryHref="/start" />);
    const link = screen.getByRole("link", { name: "Get Started" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/start");
  });

  it("renders secondary CTA button with correct link", () => {
    render(<HeroSection secondaryCta="Learn More" secondaryHref="/about" />);
    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders background image when provided", () => {
    const { container } = render(
      <HeroSection backgroundImage="/hero-bg.jpg" />
    );
    // Background image has alt="" making it presentational
    const image = container.querySelector('img[src="/hero-bg.jpg"]');
    expect(image).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSection className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
