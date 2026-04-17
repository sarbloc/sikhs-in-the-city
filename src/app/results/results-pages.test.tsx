import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import FaujaSinghResultsPage from "./fauja-singh-birthday-challenge/page";
import DawnToDuskResultsPage from "./dawn-to-dusk/page";
import SummerSamosaResultsPage from "./summer-samosa/page";

describe("Fauja Singh Birthday Challenge results page", () => {
  it("renders the page title and year dropdown", () => {
    render(<FaujaSinghResultsPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Fauja Singh Birthday Challenge",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("2025");
  });

  it("renders the 2025 results table with the first row", () => {
    render(<FaujaSinghResultsPage />);
    expect(
      screen.getByRole("columnheader", { name: "Name" })
    ).toBeInTheDocument();
    expect(screen.getByText("Angela Cowell")).toBeInTheDocument();
  });

  it("shows an empty-state message when a year with no data is selected", async () => {
    const user = userEvent.setup();
    render(<FaujaSinghResultsPage />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "2022");

    expect(select).toHaveValue("2022");
    expect(
      screen.getByText("Results for 2022 not yet available.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Angela Cowell")).not.toBeInTheDocument();
  });
});

describe("Dawn To Dusk results page", () => {
  it("renders the title and a live-results link for the default year", () => {
    render(<DawnToDuskResultsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Dawn To Dusk" })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /View Live Results/ });
    expect(link).toHaveAttribute(
      "href",
      "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d25.clax"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("recomputes the link URL when the year changes (YY = 2-digit year)", async () => {
    const user = userEvent.setup();
    render(<DawnToDuskResultsPage />);

    await user.selectOptions(screen.getByRole("combobox"), "2013");

    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute(
      "href",
      "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d13.clax"
    );
  });
});

describe("Summer Samosa results page", () => {
  it("renders the title and a live-results link for the default year", () => {
    render(<SummerSamosaResultsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Summer Samosa" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute(
      "href",
      "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa25.clax"
    );
  });

  it("recomputes the link URL when the year changes", async () => {
    const user = userEvent.setup();
    render(<SummerSamosaResultsPage />);

    await user.selectOptions(screen.getByRole("combobox"), "2022");

    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute(
      "href",
      "https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa22.clax"
    );
  });
});
