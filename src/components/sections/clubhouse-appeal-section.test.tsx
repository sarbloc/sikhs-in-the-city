import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClubhouseAppealSection } from "./clubhouse-appeal-section";

describe("ClubhouseAppealSection", () => {
  it("renders the default title", () => {
    render(<ClubhouseAppealSection />);
    expect(
      screen.getByRole("heading", { name: "Support Our Clubhouse Appeal" })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<ClubhouseAppealSection title="Help Us Build" />);
    expect(
      screen.getByRole("heading", { name: "Help Us Build" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ClubhouseAppealSection />);
    expect(
      screen.getByText(/We're raising funds to build a dedicated clubhouse/)
    ).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ClubhouseAppealSection description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders primary CTA with correct link", () => {
    render(<ClubhouseAppealSection />);
    const link = screen.getByRole("link", { name: "Donate Now" });
    expect(link).toHaveAttribute("href", "/donate");
  });

  it("renders secondary CTA with correct link", () => {
    render(<ClubhouseAppealSection />);
    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toHaveAttribute("href", "/clubhouse-appeal");
  });

  it("renders custom CTAs", () => {
    render(
      <ClubhouseAppealSection
        primaryCtaText="Give Now"
        primaryCtaHref="/give"
        secondaryCtaText="Read More"
        secondaryCtaHref="/about"
      />
    );
    const primaryLink = screen.getByRole("link", { name: "Give Now" });
    const secondaryLink = screen.getByRole("link", { name: "Read More" });
    expect(primaryLink).toHaveAttribute("href", "/give");
    expect(secondaryLink).toHaveAttribute("href", "/about");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ClubhouseAppealSection className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
