import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Clock, MapPin } from "lucide-react";
import { InfoRow } from "./info-row";

describe("InfoRow", () => {
  it("renders children text", () => {
    render(<InfoRow icon={MapPin}>Junction of Roding Lane South</InfoRow>);
    expect(
      screen.getByText("Junction of Roding Lane South")
    ).toBeInTheDocument();
  });

  it("renders the icon with aria-hidden", () => {
    const { container } = render(<InfoRow icon={Clock}>Sunday 6am</InfoRow>);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies a custom className to the wrapper", () => {
    const { container } = render(
      <InfoRow icon={MapPin} className="mt-6">
        Address
      </InfoRow>
    );
    expect(container.firstChild).toHaveClass("mt-6");
  });

  it("renders arbitrary ReactNode children", () => {
    render(
      <InfoRow icon={MapPin}>
        <strong data-testid="strong">Address</strong>
        <span>line 2</span>
      </InfoRow>
    );
    expect(screen.getByTestId("strong")).toHaveTextContent("Address");
    expect(screen.getByText("line 2")).toBeInTheDocument();
  });

  it("styles the icon circle with secondary (yellow) bg", () => {
    const { container } = render(<InfoRow icon={Clock}>x</InfoRow>);
    const circle = container.querySelector("span");
    expect(circle?.className).toMatch(/bg-secondary/);
    expect(circle?.className).toMatch(/rounded-full/);
  });
});
