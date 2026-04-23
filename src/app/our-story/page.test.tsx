import { render, screen, within } from "@testing-library/react";
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

  it("renders all section headings in order", () => {
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
        "Get In Touch",
        "Our Trustees",
      ])
    );
  });

  it("renders the story imagery: beginning + founders + dedication cluster + events polaroid", () => {
    render(<OurStoryPage />);
    // At least: 1 beginning + 1 founders + 4 dedication + 1 events = 7 images.
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThanOrEqual(7);
  });

  it("renders both feature cards linking to clubhouse appeal and events", () => {
    render(<OurStoryPage />);
    const featureLinks = screen.getAllByRole("link", {
      name: /find out more/i,
    });
    expect(featureLinks).toHaveLength(2);
    const hrefs = featureLinks.map((l) => l.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining(["/clubhouse-appeal", "/events"])
    );
  });

  it("renders the Get In Touch Contact Us button pointing at /contact", () => {
    render(<OurStoryPage />);
    const getInTouchHeading = screen.getByRole("heading", {
      level: 2,
      name: /get in touch/i,
    });
    const section = getInTouchHeading.closest("section");
    expect(section).not.toBeNull();
    const contactLink = within(section as HTMLElement).getByRole("link", {
      name: /contact us/i,
    });
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders the eight current trustee cards alphabetically", () => {
    render(<OurStoryPage />);
    const trusteesHeading = screen.getByRole("heading", {
      level: 2,
      name: /our trustees/i,
    });
    const trusteesSection = trusteesHeading.closest("section");
    expect(trusteesSection).not.toBeNull();
    const articles = within(trusteesSection as HTMLElement).getAllByRole(
      "article"
    );
    expect(articles).toHaveLength(8);
    expect(
      within(trusteesSection as HTMLElement).queryByText(/contact us to apply/i)
    ).not.toBeInTheDocument();
  });

  it("renders the events info section with course details", () => {
    render(<OurStoryPage />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /sitc events to suit all abilities/i,
    });
    expect(heading).toBeInTheDocument();
    const section = heading.closest("section") as HTMLElement;
    expect(within(section).getByText("Distances")).toBeInTheDocument();
    expect(within(section).getByText("Course Format")).toBeInTheDocument();
    expect(within(section).getByText("Timing")).toBeInTheDocument();
  });
});
