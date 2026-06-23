import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import FaujaSinghResultsPage from "./fauja-singh-birthday-challenge/page";

// Dawn To Dusk and Summer Samosa are now async server components that fetch from
// Contentful; their interactive behaviour is covered by ExternalResultsView's
// test. Fauja Singh stays code-driven and is tested directly here.
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
