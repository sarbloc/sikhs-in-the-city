import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseRecordsSection } from "./course-records-section";
import { RecordCategory } from "./record-category";
import { RecordHolder } from "./record-holder";

describe("RecordHolder", () => {
  it("renders runner name uppercased with laps/year subtitle and details", () => {
    render(
      <RecordHolder
        name="Jose Rodriguez"
        laps={50}
        distance="100.7 km"
        time="7h 28:01"
        year={2023}
      />
    );
    const name = screen.getByText("Jose Rodriguez");
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("uppercase");
    expect(screen.getByText("50 laps | 2023")).toBeInTheDocument();
    expect(screen.getByText("Total distance:")).toBeInTheDocument();
    expect(screen.getByText("100.7 km")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("7h 28:01")).toBeInTheDocument();
  });

  it("does not render the legacy 'Achieved in' row", () => {
    render(
      <RecordHolder
        name="Jose Rodriguez"
        laps={50}
        distance="100.7 km"
        time="7h 28:01"
        year={2023}
      />
    );
    expect(screen.queryByText(/Achieved in/)).not.toBeInTheDocument();
    expect(screen.queryByText(/The record held at/)).not.toBeInTheDocument();
  });

  it("renders without distance row when distance is omitted", () => {
    render(
      <RecordHolder name="Lee Rodgers" laps={50} time="2h 42:16" year={2025} />
    );
    expect(screen.getByText("Lee Rodgers")).toBeInTheDocument();
    expect(screen.queryByText("Total distance:")).not.toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("2h 42:16")).toBeInTheDocument();
  });
});

describe("RecordCategory", () => {
  it("renders a blue header with category name and requirement", () => {
    const { container } = render(
      <RecordCategory
        category="Ultra"
        requirement="25+ laps (minimum 50k)"
        holders={[
          { name: "Test Runner", laps: 50, time: "7h 28:01", year: 2023 },
        ]}
      />
    );
    const header = container.querySelector(".bg-primary");
    expect(header).not.toBeNull();
    expect(header).toHaveTextContent("Ultra");
    expect(header).toHaveTextContent("25+ laps (minimum 50k)");
  });

  it("renders multiple holders in the content card", () => {
    render(
      <RecordCategory
        category="Marathon"
        requirement="21 laps (42k)"
        holders={[
          { name: "Runner A", laps: 50, time: "2h 42:16", year: 2025 },
          { name: "Runner B", laps: 41, time: "3h 36:31", year: 2023 },
        ]}
      />
    );
    expect(screen.getByText("Runner A")).toBeInTheDocument();
    expect(screen.getByText("Runner B")).toBeInTheDocument();
    expect(screen.getByText("50 laps | 2025")).toBeInTheDocument();
    expect(screen.getByText("41 laps | 2023")).toBeInTheDocument();
  });
});

describe("CourseRecordsSection", () => {
  it("renders the default title", () => {
    render(<CourseRecordsSection />);
    expect(
      screen.getByRole("heading", { name: "Dawn To Dusk Course Records" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText(/Record completion times/)).toBeInTheDocument();
  });

  it("renders all four categories", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText("Ultra")).toBeInTheDocument();
    expect(screen.getByText("Marathon")).toBeInTheDocument();
    expect(screen.getByText("Half Marathon")).toBeInTheDocument();
    expect(screen.getByText("10K")).toBeInTheDocument();
  });

  it("renders corrected Half Marathon record data (11 laps, 2015)", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText("Paul Quinton")).toBeInTheDocument();
    expect(screen.getByText("11 laps | 2015")).toBeInTheDocument();
    expect(screen.getByText("11 laps | 2021")).toBeInTheDocument();
  });

  it("renders corrected 10K record data (5 laps, 10 km)", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText("Gary Towers")).toBeInTheDocument();
    expect(screen.getByText("5 laps | 2021")).toBeInTheDocument();
    expect(screen.getByText("5 laps | 2016")).toBeInTheDocument();
    expect(screen.getAllByText("10 km")).toHaveLength(2);
  });

  it("renders Marathon distance of 42 km for both holders", () => {
    render(<CourseRecordsSection />);
    expect(screen.getAllByText("42 km")).toHaveLength(2);
  });

  it("renders custom records", () => {
    const records = [
      {
        category: "5K",
        requirement: "Complete 2.5 laps",
        holders: [{ name: "Fast Runner", laps: 3, time: "18:00", year: 2024 }],
      },
    ];
    render(<CourseRecordsSection records={records} />);
    expect(screen.getByText("5K")).toBeInTheDocument();
    expect(screen.getByText("Fast Runner")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CourseRecordsSection className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
