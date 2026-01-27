import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders the Quick Links section", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our Story" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "How to Join" })
    ).toBeInTheDocument();
  });

  it("renders the Address section", () => {
    render(<Footer />);
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Beal High School")).toBeInTheDocument();
    expect(screen.getByText("Sundays at 7am")).toBeInTheDocument();
  });

  it("renders the Supported By section", () => {
    render(<Footer />);
    expect(screen.getByText("Supported By")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
  });

  it("renders the copyright text with charity number", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Sikhs In The City.*Registered Charity Number 1179621/i)
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Footer className="custom-class" />);
    expect(container.querySelector("footer")).toHaveClass("custom-class");
  });
});
