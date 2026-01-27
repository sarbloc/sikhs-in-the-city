import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders the title", () => {
    render(<SectionHeading title="Our Story" />);
    expect(
      screen.getByRole("heading", { name: "Our Story" })
    ).toBeInTheDocument();
  });

  it("renders the eyebrow text when provided", () => {
    render(<SectionHeading title="Events" eyebrow="Upcoming" />);
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <SectionHeading
        title="How To Join"
        description="Join our running community today"
      />
    );
    expect(
      screen.getByText("Join our running community today")
    ).toBeInTheDocument();
  });

  it("applies center alignment class when align is center", () => {
    const { container } = render(
      <SectionHeading title="Join Us" align="center" />
    );
    expect(container.firstChild).toHaveClass("items-center", "text-center");
  });

  it("applies left alignment by default", () => {
    const { container } = render(<SectionHeading title="Join Us" />);
    expect(container.firstChild).not.toHaveClass("items-center");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionHeading title="Test" className="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});
