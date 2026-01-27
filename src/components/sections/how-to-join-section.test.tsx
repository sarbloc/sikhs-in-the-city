import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowToJoinSection } from "./how-to-join-section";
import { StepCard } from "./step-card";

describe("StepCard", () => {
  it("renders the step number", () => {
    render(
      <StepCard stepNumber={1} title="Step Title" description="Step desc" />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders the title and description", () => {
    render(
      <StepCard
        stepNumber={2}
        title="Test Title"
        description="Test description"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });
});

describe("HowToJoinSection", () => {
  it("renders the default title", () => {
    render(<HowToJoinSection />);
    expect(
      screen.getByRole("heading", { name: "How To Join" })
    ).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<HowToJoinSection title="Get Started" />);
    expect(
      screen.getByRole("heading", { name: "Get Started" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<HowToJoinSection />);
    expect(
      screen.getByText(/Joining Sikhs In the City is simple/)
    ).toBeInTheDocument();
  });

  it("renders default steps", () => {
    render(<HowToJoinSection />);
    // Check step numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    // Check step titles (Register your interest appears twice - as step and CTA)
    expect(screen.getAllByText("Register your interest")).toHaveLength(2);
    expect(screen.getByText("Come and meet us")).toBeInTheDocument();
    expect(screen.getByText("Start your journey")).toBeInTheDocument();
  });

  it("renders custom steps", () => {
    const customSteps = [
      { title: "Step A", description: "Description A" },
      { title: "Step B", description: "Description B" },
    ];
    render(<HowToJoinSection steps={customSteps} />);
    expect(screen.getByText("Step A")).toBeInTheDocument();
    expect(screen.getByText("Step B")).toBeInTheDocument();
  });

  it("renders CTA button with correct link", () => {
    render(<HowToJoinSection ctaText="Sign Up" ctaHref="/signup" />);
    const link = screen.getByRole("link", { name: "Sign Up" });
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("applies custom className", () => {
    const { container } = render(
      <HowToJoinSection className="custom-class" />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
