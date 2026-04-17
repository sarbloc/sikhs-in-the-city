import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PolaroidImage } from "./polaroid-image";

describe("PolaroidImage", () => {
  it("renders the image with src and alt", () => {
    render(
      <PolaroidImage
        src="/founders.jpg"
        alt="The founders"
        width={400}
        height={300}
      />
    );
    const img = screen.getByRole("img", { name: "The founders" });
    expect(img).toHaveAttribute("src", "/founders.jpg");
  });

  it("defaults rotate to -2 degrees", () => {
    const { container } = render(
      <PolaroidImage src="/a.jpg" alt="a" width={100} height={100} />
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.transform).toBe("rotate(-2deg)");
  });

  it("applies a custom rotate value", () => {
    const { container } = render(
      <PolaroidImage
        src="/a.jpg"
        alt="a"
        width={100}
        height={100}
        rotate={5}
      />
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.transform).toBe("rotate(5deg)");
  });

  it("applies white frame and bottom-weighted padding", () => {
    const { container } = render(
      <PolaroidImage src="/a.jpg" alt="a" width={100} height={100} />
    );
    const frame = container.firstChild as HTMLElement;
    expect(frame.className).toMatch(/bg-white/);
    expect(frame.className).toMatch(/p-3/);
    expect(frame.className).toMatch(/pb-8/);
  });

  it("forwards className to the frame", () => {
    const { container } = render(
      <PolaroidImage
        src="/a.jpg"
        alt="a"
        width={100}
        height={100}
        className="custom"
      />
    );
    expect(container.firstChild).toHaveClass("custom");
  });

  it("passes width and height to the image", () => {
    render(
      <PolaroidImage src="/a.jpg" alt="a" width={320} height={240} />
    );
    const img = screen.getByRole("img", { name: "a" });
    expect(img).toHaveAttribute("width", "320");
    expect(img).toHaveAttribute("height", "240");
  });
});
