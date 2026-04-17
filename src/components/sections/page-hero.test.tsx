import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHero } from "./page-hero";

describe("PageHero", () => {
  it("renders title and description", () => {
    render(
      <PageHero title="Test Title" description="Test description text." />
    );
    expect(
      screen.getByRole("heading", { name: "Test Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Test description text.")).toBeInTheDocument();
  });

  it("renders CTA link with default text and href", () => {
    render(<PageHero title="Hero" description="Desc" />);
    const link = screen.getByRole("link", { name: "Register Your Interest" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders custom CTA text and href", () => {
    render(
      <PageHero
        title="Hero"
        description="Desc"
        ctaText="Sign Up"
        ctaHref="/signup"
      />
    );
    expect(
      screen.getByRole("link", { name: "Sign Up" })
    ).toHaveAttribute("href", "/signup");
  });

  it("renders background image when provided", () => {
    const { container } = render(
      <PageHero
        title="Hero"
        description="Desc"
        backgroundImage="/images/hero.jpg"
        backgroundImageAlt="Hero background"
      />
    );
    const img = container.querySelector('img[src="/images/hero.jpg"]');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "Hero background");
  });

  it("does not render an image in the default variant", () => {
    const { container } = render(
      <PageHero title="Hero" description="Desc" />
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });
});
