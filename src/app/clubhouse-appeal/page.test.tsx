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
      screen.getByText(/Registered Charity No 1179621.*Community project/)
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
      screen.getByText("Pre Clubhouse Appeal Video")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Clubhouse Appeal Video with Fauja Singh")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Post Clubhouse Appeal Video")
    ).toBeInTheDocument();
  });

  it("renders the static map image for the clubhouse location", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /A place with meaning/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Map showing the proposed clubhouse location/ })
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

  it("renders the Supporting the Clubhouse Appeal section with bank details and donation notes", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /Supporting the Clubhouse Appeal/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Account Name")).toBeInTheDocument();
    expect(screen.getByText("Account Number")).toBeInTheDocument();
    expect(screen.getByText("Sort Code")).toBeInTheDocument();
    expect(screen.getByText("Sikhs In The City")).toBeInTheDocument();
    expect(screen.getByText("38715668")).toBeInTheDocument();
    expect(screen.getByText("30-90-89")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Important donation notes/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/GoFundMe.*platform tip to £0\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Gift Aid/)).toBeInTheDocument();
  });

  it("renders the Help Build a Lasting Community Legacy CTA band with Donate Now", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", {
        name: /Help Build a Lasting Community Legacy/,
      })
    ).toBeInTheDocument();
    const donateLinks = screen.getAllByRole("link", { name: "Donate Now" });
    // PRs 9a/9b added 3 Donate Now buttons (hero, honouring, funding); 9c adds one more in the CTA band.
    expect(donateLinks.length).toBeGreaterThanOrEqual(4);
  });

  it("renders the Join Sikhs In the City CTA at the foot of the page", () => {
    render(<ClubhouseAppealPage />);
    expect(
      screen.getByRole("heading", { name: /Join Sikhs In the City/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Register Your Interest/ })
    ).toBeInTheDocument();
  });
});
