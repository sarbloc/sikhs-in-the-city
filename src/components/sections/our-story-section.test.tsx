import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OurStorySection } from "./our-story-section";

describe("OurStorySection", () => {
  it("renders the default title", () => {
    render(<OurStorySection />);
    expect(
      screen.getByRole("heading", { name: "Our Story" })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<OurStorySection title="About Us" />);
    expect(
      screen.getByRole("heading", { name: "About Us" })
    ).toBeInTheDocument();
  });

  it("renders default paragraphs", () => {
    render(<OurStorySection />);
    expect(screen.getByText(/Sikhs In the City is a community-led/)).toBeInTheDocument();
    expect(screen.getByText(/Based in East London/)).toBeInTheDocument();
  });

  it("renders custom paragraphs", () => {
    render(<OurStorySection paragraphs={["Custom paragraph one.", "Custom paragraph two."]} />);
    expect(screen.getByText("Custom paragraph one.")).toBeInTheDocument();
    expect(screen.getByText("Custom paragraph two.")).toBeInTheDocument();
  });

  it("renders the read more link", () => {
    render(<OurStorySection />);
    const link = screen.getByRole("link", { name: /Read the full story/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/our-story");
  });

  it("renders custom link text and href", () => {
    render(<OurStorySection linkText="Learn more" linkHref="/about" />);
    const link = screen.getByRole("link", { name: /Learn more/ });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders image when provided", () => {
    const { container } = render(
      <OurStorySection imagePath="/story-image.jpg" imageAlt="Our team" />
    );
    const image = container.querySelector('img[src="/story-image.jpg"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Our team");
  });

  it("applies custom className", () => {
    const { container } = render(<OurStorySection className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
