import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CourseRecordsSection } from "./course-records-section";
import { RecordCategory } from "./record-category";
import { RecordHolder } from "./record-holder";

describe("RecordHolder", () => {
  it("renders the name and time", () => {
    render(<RecordHolder name="John Doe" time="25:30" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("25:30")).toBeInTheDocument();
  });
});

describe("RecordCategory", () => {
  it("renders the category name", () => {
    render(<RecordCategory category="5K" />);
    expect(screen.getByText("5K")).toBeInTheDocument();
  });

  it("renders male record holder", () => {
    render(
      <RecordCategory category="5K" male={{ name: "Test Runner", time: "20:00" }} />
    );
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Test Runner")).toBeInTheDocument();
    expect(screen.getByText("20:00")).toBeInTheDocument();
  });

  it("renders female record holder", () => {
    render(
      <RecordCategory category="5K" female={{ name: "Jane Doe", time: "22:00" }} />
    );
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("22:00")).toBeInTheDocument();
  });

  it("renders both male and female records", () => {
    render(
      <RecordCategory
        category="10K"
        male={{ name: "Male Runner", time: "40:00" }}
        female={{ name: "Female Runner", time: "45:00" }}
      />
    );
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
  });
});

describe("CourseRecordsSection", () => {
  it("renders the default title", () => {
    render(<CourseRecordsSection />);
    expect(
      screen.getByRole("heading", { name: "Course Records" })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<CourseRecordsSection title="Club Records" />);
    expect(
      screen.getByRole("heading", { name: "Club Records" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<CourseRecordsSection />);
    expect(
      screen.getByText(/Celebrating our fastest runners/)
    ).toBeInTheDocument();
  });

  it("renders default record categories", () => {
    render(<CourseRecordsSection />);
    expect(screen.getByText("5K")).toBeInTheDocument();
    expect(screen.getByText("10K")).toBeInTheDocument();
    expect(screen.getByText("Half Marathon")).toBeInTheDocument();
    expect(screen.getByText("Marathon")).toBeInTheDocument();
  });

  it("renders custom records", () => {
    const customRecords = [
      {
        category: "Ultra",
        male: { name: "Ultra Runner", time: "8:00:00" },
      },
    ];
    render(<CourseRecordsSection records={customRecords} />);
    expect(screen.getByText("Ultra")).toBeInTheDocument();
    expect(screen.getByText("Ultra Runner")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CourseRecordsSection className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
