import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CtaLink } from "./cta-link";

describe("CtaLink", () => {
  it("renders the label and an aria-hidden trailing arrow", () => {
    const { container } = render(
      <CtaLink href="/target">Find Out More</CtaLink>,
    );
    const link = screen.getByRole("link", { name: /Find Out More/ });
    expect(link).toHaveAttribute("href", "/target");

    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).not.toBeNull();
    expect(arrow?.textContent).toBe("→");
  });

  it("applies the default variant classes when no variant is passed", () => {
    render(<CtaLink href="/a">Default</CtaLink>);
    const link = screen.getByRole("link", { name: /Default/ });
    expect(link.className).toMatch(/text-primary/);
    expect(link.className).toMatch(/text-base/);
  });

  it("applies variant-specific classes", () => {
    render(
      <CtaLink href="/a" variant="inverse">
        Inverse
      </CtaLink>,
    );
    expect(screen.getByRole("link", { name: /Inverse/ }).className).toMatch(
      /text-white/,
    );

    render(
      <CtaLink href="/b" variant="foreground">
        Foreground
      </CtaLink>,
    );
    expect(screen.getByRole("link", { name: /Foreground/ }).className).toMatch(
      /text-foreground/,
    );
  });

  it("merges a caller-supplied className with the variant classes", () => {
    render(
      <CtaLink href="/a" className="mt-6">
        Spaced
      </CtaLink>,
    );
    const link = screen.getByRole("link", { name: /Spaced/ });
    expect(link.className).toMatch(/mt-6/);
    expect(link.className).toMatch(/text-primary/);
  });
});
