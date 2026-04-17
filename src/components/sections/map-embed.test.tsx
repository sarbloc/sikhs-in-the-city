import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MapEmbed } from "./map-embed";

describe("MapEmbed", () => {
  const src = "https://maps.google.com/maps?q=IG4+5PS&output=embed";

  it("renders an iframe with the given src", () => {
    render(<MapEmbed title="Training meeting point map" src={src} />);
    const iframe = screen.getByTitle("Training meeting point map");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", src);
  });

  it("sets the aria-label for accessibility", () => {
    render(<MapEmbed title="Map of IG4 5PS" src={src} />);
    expect(screen.getByLabelText("Map of IG4 5PS")).toBeInTheDocument();
  });

  it("applies the default 16:9 aspect ratio when none provided", () => {
    const { container } = render(<MapEmbed title="t" src={src} />);
    expect(container.firstChild).toHaveClass("aspect-[16/9]");
  });

  it("allows overriding the aspect ratio", () => {
    const { container } = render(
      <MapEmbed title="t" src={src} aspectRatio="aspect-square" />
    );
    expect(container.firstChild).toHaveClass("aspect-square");
  });

  it("applies a custom className to the wrapper", () => {
    const { container } = render(
      <MapEmbed title="t" src={src} className="mt-8" />
    );
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
