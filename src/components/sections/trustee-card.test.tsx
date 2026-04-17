import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TrusteeCard } from "./trustee-card";

describe("TrusteeCard", () => {
  it("renders the trustee's name and role with a portrait photo", () => {
    render(
      <TrusteeCard
        name="Harmander Singh"
        role="President"
        photo="/images/trustees/harmander-singh.jpg"
      />,
    );

    expect(screen.getByText(/harmander singh/i)).toBeInTheDocument();
    expect(screen.getByText(/president/i)).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /portrait of harmander singh/i });
    expect(image).toHaveAttribute("src", "/images/trustees/harmander-singh.jpg");
  });

  it("renders the vacancy variant with the apply prompt and no photo", () => {
    render(<TrusteeCard name="Vacancy" variant="vacancy" />);

    expect(screen.getByText(/vacancy/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us to apply/i)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
