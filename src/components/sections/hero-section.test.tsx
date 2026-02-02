import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("renders the default first slide heading", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { name: "Sikhs In The City" })
    ).toBeInTheDocument();
  });

  it("renders custom slides", () => {
    const slides = [
      {
        heading: "Custom Heading",
        subheading: "Custom subheading text",
      },
    ];
    render(<HeroSection slides={slides} />);
    expect(
      screen.getByRole("heading", { name: "Custom Heading" })
    ).toBeInTheDocument();
    expect(screen.getByText("Custom subheading text")).toBeInTheDocument();
  });

  it("renders CTA buttons from slide", () => {
    const slides = [
      {
        heading: "Test",
        subheading: "Test sub",
        primaryCta: "Get Started",
        primaryHref: "/start",
        secondaryCta: "Learn More",
        secondaryHref: "/about",
      },
    ];
    render(<HeroSection slides={slides} />);
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
      "href",
      "/start"
    );
    expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("renders background image when provided", () => {
    const slides = [
      {
        heading: "Test",
        subheading: "Test sub",
        backgroundImage: "/hero-bg.jpg",
      },
    ];
    const { container } = render(<HeroSection slides={slides} />);
    const image = container.querySelector('img[src="/hero-bg.jpg"]');
    expect(image).toBeInTheDocument();
  });

  it("renders multiple slides", () => {
    const slides = [
      { heading: "Slide 1", subheading: "Sub 1" },
      { heading: "Slide 2", subheading: "Sub 2" },
      { heading: "Slide 3", subheading: "Sub 3" },
    ];
    render(<HeroSection slides={slides} />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("button", { name: "Previous slide" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" })
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSection className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
