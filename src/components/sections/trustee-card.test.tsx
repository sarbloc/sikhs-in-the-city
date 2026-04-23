import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrusteeCard } from "./trustee-card";

describe("TrusteeCard", () => {
  it("renders the trustee's name with a portrait photo", () => {
    render(
      <TrusteeCard
        name="Harmander Singh"
        photo="/images/trustees/harmander-singh.png"
      />,
    );

    expect(screen.getByText(/harmander singh/i)).toBeInTheDocument();
    const image = screen.getByRole("img", {
      name: /portrait of harmander singh/i,
    });
    expect(image).toHaveAttribute("src", "/images/trustees/harmander-singh.png");
  });

  it("renders the role label under the name when provided", () => {
    render(
      <TrusteeCard
        name="Harmander Singh"
        role="President"
        photo="/images/trustees/harmander-singh.png"
      />,
    );

    expect(screen.getByText(/harmander singh/i)).toBeInTheDocument();
    expect(screen.getByText(/president/i)).toBeInTheDocument();
  });
});
