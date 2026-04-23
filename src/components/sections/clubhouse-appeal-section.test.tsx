import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClubhouseAppealSection } from "./clubhouse-appeal-section";

describe("ClubhouseAppealSection", () => {
  it("renders the default title", () => {
    render(<ClubhouseAppealSection />);
    expect(
      screen.getByRole("heading", { name: /Fauja Singh/i })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<ClubhouseAppealSection title="Help Us Build" />);
    expect(
      screen.getByRole("heading", { name: "Help Us Build" })
    ).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<ClubhouseAppealSection />);
    expect(
      screen.getByText("A Project to honour Fauja Singh BEM")
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ClubhouseAppealSection />);
    expect(
      screen.getByText(/eco-friendly community clubhouse/)
    ).toBeInTheDocument();
  });

  it("renders primary CTA with correct link", () => {
    render(<ClubhouseAppealSection />);
    const link = screen.getByRole("link", { name: "Donate Now" });
    expect(link).toHaveAttribute(
      "href",
      "https://www.gofundme.com/f/fauja-singh-clubhouse-appeal"
    );
  });

  it("renders secondary CTA with correct link", () => {
    render(<ClubhouseAppealSection />);
    const link = screen.getByRole("link", { name: /Find Out More/ });
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
    const secondaryLink = screen.getByRole("link", { name: /Read More/ });
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
