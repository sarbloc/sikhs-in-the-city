import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseRecordsSection } from "./course-records-section";
import { RecordCategory } from "./record-category";
import { RecordHolder } from "./record-holder";

describe("RecordHolder", () => {
  it("renders runner name and details", () => {
    render(
      <RecordHolder name="Jose Rodriguez" laps={50} distance="100.7 km" time="7h 28:01" year={2023} />
    );
    expect(screen.getByText("Jose Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("The record held at 50 lap")).toBeInTheDocument();
    expect(screen.getByText("100.7 km")).toBeInTheDocument();
    expect(screen.getByText("7h 28:01")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("renders without distance", () => {
    render(
      <RecordHolder name="Lee Rodgers" laps={50} time="2h 42:16" year={2025} />
    );
    expect(screen.getByText("Lee Rodgers")).toBeInTheDocument();
    expect(screen.queryByText("Total distance:")).not.toBeInTheDocument();
  });
});

describe("RecordCategory", () => {
  it("renders category name and requirement", () => {
    render(
      <RecordCategory
        category="Ultra"
        requirement="Complete 25 or more laps"
        holders={[
          { name: "Test Runner", laps: 50, time: "7h 28:01", year: 2023 },
        ]}
      />
    );
    expect(screen.getByText("Ultra")).toBeInTheDocument();
    expect(screen.getByText("Complete 25 or more laps")).toBeInTheDocument();
  });

  it("renders multiple holders", () => {
    render(
      <RecordCategory
        category="Marathon"
        requirement="Complete 21 laps"
        holders={[
          { name: "Runner A", laps: 50, time: "2h 42:16", year: 2025 },
          { name: "Runner B", laps: 41, time: "3h 36:31", year: 2023 },
        ]}
      />
    );
    expect(screen.getByText("Runner A")).toBeInTheDocument();
    expect(screen.getByText("Runner B")).toBeInTheDocument();
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
    expect(
      screen.getByText(/Record completion times/)
    ).toBeInTheDocument();
  });

  it("renders all four categories", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText("Ultra")).toBeInTheDocument();
    expect(screen.getByText("Marathon")).toBeInTheDocument();
    expect(screen.getByText("Half Marathon")).toBeInTheDocument();
    expect(screen.getByText("10K")).toBeInTheDocument();
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
