import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultsTable } from "./results-table";

const columns = [
  { key: "name", label: "Name" },
  { key: "laps", label: "Laps" },
  { key: "distance", label: "Distance (km)" },
  { key: "time", label: "Time" },
];

const rows = [
  { name: "Angela Cowell", laps: 21, distance: "42.29", time: "6:16:50" },
  { name: "Anna Prowse", laps: 21, distance: "42.29", time: "1:50:06" },
  { name: "Anne Purdham", laps: 21, distance: "42.29", time: "5:22:07" },
];

describe("ResultsTable", () => {
  it("renders each column header", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    for (const col of columns) {
      expect(
        screen.getByRole("columnheader", { name: col.label })
      ).toBeInTheDocument();
    }
  });

  it("renders one row per data row", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    // header row + data rows
    expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1);
  });

  it("renders cell values in the correct column order", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    const dataRows = screen.getAllByRole("row").slice(1);
    const firstRowCells = within(dataRows[0]).getAllByRole("cell");
    expect(firstRowCells[0]).toHaveTextContent("Angela Cowell");
    expect(firstRowCells[1]).toHaveTextContent("21");
    expect(firstRowCells[2]).toHaveTextContent("42.29");
    expect(firstRowCells[3]).toHaveTextContent("6:16:50");
  });

  it("applies hover classes on data rows", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    const dataRow = screen.getAllByRole("row")[1];
    expect(dataRow.className).toMatch(/hover:bg-yellow-100/);
    expect(dataRow.className).toMatch(/hover:font-bold/);
  });

  it("applies alternating row background via even:", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    const dataRow = screen.getAllByRole("row")[1];
    expect(dataRow.className).toMatch(/even:bg-muted\/40/);
  });

  it("uses the brand primary for the header row", () => {
    render(<ResultsTable columns={columns} rows={rows} />);
    const headerRow = screen.getAllByRole("row")[0];
    expect(headerRow.className).toMatch(/bg-primary/);
  });

  it("renders a visually-hidden caption when provided", () => {
    render(
      <ResultsTable columns={columns} rows={rows} caption="Results table" />
    );
    expect(screen.getByText("Results table")).toHaveClass("sr-only");
  });

  it("applies a className on the scroll wrapper", () => {
    const { container } = render(
      <ResultsTable columns={columns} rows={rows} className="mt-8" />
    );
    expect(container.firstChild).toHaveClass("mt-8", "overflow-x-auto");
  });

  it("applies column className to headers and body cells", () => {
    const cols = [
      { key: "name", label: "Name" },
      { key: "time", label: "Time", className: "text-right" },
    ];
    const data = [{ name: "Angela", time: "6:16:50" }];
    render(<ResultsTable columns={cols} rows={data} />);
    expect(screen.getByRole("columnheader", { name: "Time" })).toHaveClass(
      "text-right"
    );
    const dataRow = screen.getAllByRole("row")[1];
    const cells = within(dataRow).getAllByRole("cell");
    expect(cells[1]).toHaveClass("text-right");
  });

  it("renders nothing in tbody when rows is empty", () => {
    const { container } = render(
      <ResultsTable columns={columns} rows={[]} />
    );
    const tbody = container.querySelector("tbody");
    expect(tbody?.children.length).toBe(0);
  });
});
