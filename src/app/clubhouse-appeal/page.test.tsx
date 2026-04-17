import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ClubhouseAppealPage from "./page";
import { clubhouseAmenities } from "@/data/clubhouse-amenities";

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

  it("renders the Bringing the Vision to Life section", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /Bringing the Vision to Life/ })
    ).toBeInTheDocument();
  });

  it("renders all nine amenity cards with their labels", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", {
        name: /Designed for Wellbeing, Accessibility, and Community Use/,
      })
    ).toBeInTheDocument();
    expect(clubhouseAmenities).toHaveLength(9);
    for (const amenity of clubhouseAmenities) {
      expect(
        screen.getByRole("heading", { name: amenity.label, level: 3 })
      ).toBeInTheDocument();
    }
    expect(
      screen.getByText("Male, female and accessible WC facilities")
    ).toBeInTheDocument();
  });

  it("renders the Funding the Build section with a Donate Now button", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /Funding the Build/ })
    ).toBeInTheDocument();
  });

  it("renders the Carrying Fauja Singh's Values Forward section", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", {
        name: /Carrying Fauja Singh.s Values Forward/,
      })
    ).toBeInTheDocument();
  });
});
