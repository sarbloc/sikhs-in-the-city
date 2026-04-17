import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ShowerHead } from "lucide-react";
import { AmenityCard } from "./amenity-card";

describe("AmenityCard", () => {
  it("renders the label as a heading", () => {
    render(
      <AmenityCard
        icon={ShowerHead}
        label="SHOWERS"
        description="Male and female changing rooms with showers"
      />
    );
    expect(
      screen.getByRole("heading", { name: "SHOWERS" })
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(
      <AmenityCard
        icon={ShowerHead}
        label="SHOWERS"
        description="Male and female changing rooms with showers"
      />
    );
    expect(
      screen.getByText("Male and female changing rooms with showers")
    ).toBeInTheDocument();
  });

  it("renders the icon with aria-hidden", () => {
    const { container } = render(
      <AmenityCard
        icon={ShowerHead}
        label="SHOWERS"
        description="desc"
      />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies a custom className", () => {
    const { container } = render(
      <AmenityCard
        icon={ShowerHead}
        label="SHOWERS"
        description="desc"
        className="col-span-2"
      />
    );
    expect(container.firstChild).toHaveClass("col-span-2");
  });

  it("styles the label uppercase and bold", () => {
    render(
      <AmenityCard
        icon={ShowerHead}
        label="Showers"
        description="desc"
      />
    );
    const heading = screen.getByRole("heading", { name: "Showers" });
    expect(heading).toHaveClass("uppercase", "font-bold");
  });
});
