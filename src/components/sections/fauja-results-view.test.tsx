import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaujaResultsView } from "./fauja-results-view";

const years = [
  {
    year: 2025,
    error: false,
    rows: [{ name: "Angela Cowell", laps: 21, distance: "42.29", time: "6:26.45" }],
  },
  { year: 2022, error: false, rows: [] },
  { year: 2019, error: true, rows: [] },
];

describe("FaujaResultsView", () => {
  it("renders the title, dropdown and the newest year's table", () => {
    render(<FaujaResultsView years={years} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Fauja Singh Birthday Challenge" })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("2025");
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByText("Angela Cowell")).toBeInTheDocument();
  });

  it("shows the empty state for a year with no rows", async () => {
    const user = userEvent.setup();
    render(<FaujaResultsView years={years} />);
    await user.selectOptions(screen.getByRole("combobox"), "2022");
    expect(screen.getByText("Results for 2022 not yet available.")).toBeInTheDocument();
    expect(screen.queryByText("Angela Cowell")).not.toBeInTheDocument();
  });

  it("shows the editor-facing error state for a year whose CSV failed", async () => {
    const user = userEvent.setup();
    render(<FaujaResultsView years={years} />);
    await user.selectOptions(screen.getByRole("combobox"), "2019");
    expect(
      screen.getByText(/Results for 2019 couldn’t be loaded — please check the CSV file/)
    ).toBeInTheDocument();
  });
});
