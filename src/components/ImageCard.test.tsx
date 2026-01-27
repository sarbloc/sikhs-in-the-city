import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ImageCard } from "./ImageCard";

describe("ImageCard", () => {
  const defaultProps = {
    imagePath: "/test-image.jpg",
    title: "Test Title",
    description: "Test description for the card",
    buttonText: "Learn More",
    buttonHref: "/test-link",
  };

  it("renders the title", () => {
    render(<ImageCard {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ImageCard {...defaultProps} />);
    expect(
      screen.getByText("Test description for the card")
    ).toBeInTheDocument();
  });

  it("renders the button with correct text and link", () => {
    render(<ImageCard {...defaultProps} />);
    const link = screen.getByRole("link", { name: "Learn More" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-link");
  });

  it("renders the image with correct alt text", () => {
    render(<ImageCard {...defaultProps} />);
    const image = screen.getByRole("img", { name: "Test Title" });
    expect(image).toBeInTheDocument();
  });
});
