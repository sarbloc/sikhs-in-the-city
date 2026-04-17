import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ClubhouseAppealPage from "./page";

describe("ClubhouseAppealPage", () => {
  it("renders the hero heading and disclaimer", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", {
        name: "Fauja Singh Clubhouse Appeal",
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Registered Charity No 1179621/)
    ).toBeInTheDocument();
  });

  it("renders the Honouring a Legacy section", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", {
        name: /Honouring a Legacy\. Building for the Future\./,
      })
    ).toBeInTheDocument();
  });

  it("renders the three video embeds with captions", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /Words from Fauja Singh and the team/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fauja Singh on the clubhouse vision")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Harmander Singh on building a lasting legacy")
    ).toBeInTheDocument();
    expect(
      screen.getByText("The SITC team on community impact")
    ).toBeInTheDocument();
  });

  it("renders the map embed for the clubhouse location", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /A place with meaning/ })
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("Proposed clubhouse location")
    ).toBeInTheDocument();
  });

  it("renders at least two Donate Now buttons", () => {
    render(<ClubhouseAppealPage />);
    const donateLinks = screen.getAllByRole("link", { name: "Donate Now" });
    expect(donateLinks.length).toBeGreaterThanOrEqual(2);
  });
});
