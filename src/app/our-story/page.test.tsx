import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OurStoryPage from "./page";

describe("OurStoryPage", () => {
  it("renders the main page heading", () => {
    render(<OurStoryPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /about sikhs in the city/i })
    ).toBeInTheDocument();
  });

  it("renders the lede paragraph about the Interfaith Relay marathon", () => {
    render(<OurStoryPage />);
    expect(
      screen.getByText(/Interfaith Relay marathon in Luxembourg since 2008/i)
    ).toBeInTheDocument();
  });

  it("renders all four section headings in order", () => {
    render(<OurStoryPage />);
    const headings = screen
      .getAllByRole("heading")
      .filter((h) => h.tagName === "H2" || h.tagName === "H1")
      .map((h) => h.textContent);

    expect(headings).toEqual(
      expect.arrayContaining([
        "About Sikhs In The City",
        "The Beginning",
        "The Founders",
        "Dedication",
      ])
    );
  });

  it("renders four polaroid images in the Dedication cluster", () => {
    render(<OurStoryPage />);
    // 1 portrait (Beginning) + 1 founders + 4 dedication = 6 images total.
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThanOrEqual(6);
  });
});
