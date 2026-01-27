import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CoursesTrainingSection } from "./courses-training-section";

describe("CoursesTrainingSection", () => {
  it("renders the default title", () => {
    render(<CoursesTrainingSection />);
    expect(
      screen.getByRole("heading", { name: "Courses & Training" })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<CoursesTrainingSection title="Training Programmes" />);
    expect(
      screen.getByRole("heading", { name: "Training Programmes" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<CoursesTrainingSection />);
    expect(
      screen.getByText(/Whether you're just starting out/)
    ).toBeInTheDocument();
  });

  it("renders default courses", () => {
    render(<CoursesTrainingSection />);
    expect(screen.getByText("Couch to 5K")).toBeInTheDocument();
    expect(screen.getByText("5K to 10K")).toBeInTheDocument();
    expect(screen.getByText("Half Marathon Training")).toBeInTheDocument();
    expect(screen.getByText("Marathon Preparation")).toBeInTheDocument();
  });

  it("renders course levels as badges", () => {
    render(<CoursesTrainingSection />);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getAllByText("Intermediate")).toHaveLength(2);
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it("renders course schedules", () => {
    render(<CoursesTrainingSection />);
    expect(screen.getAllByText("Sundays 7am")).toHaveLength(4);
  });

  it("renders custom courses", () => {
    const customCourses = [
      {
        title: "Speed Training",
        description: "Improve your pace",
        level: "Elite",
      },
    ];
    render(<CoursesTrainingSection courses={customCourses} />);
    expect(screen.getByText("Speed Training")).toBeInTheDocument();
    expect(screen.getByText("Elite")).toBeInTheDocument();
  });

  it("renders learn more links for courses with href", () => {
    render(<CoursesTrainingSection />);
    const links = screen.getAllByRole("link", { name: /Learn more/ });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders CTA button with correct link", () => {
    render(<CoursesTrainingSection />);
    const link = screen.getByRole("link", { name: "View all programmes" });
    expect(link).toHaveAttribute("href", "/training");
  });

  it("renders custom CTA", () => {
    render(
      <CoursesTrainingSection ctaText="See More" ctaHref="/programmes" />
    );
    const link = screen.getByRole("link", { name: "See More" });
    expect(link).toHaveAttribute("href", "/programmes");
  });

  it("applies custom className", () => {
    const { container } = render(
      <CoursesTrainingSection className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
