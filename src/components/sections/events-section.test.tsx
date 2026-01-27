import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EventsSection } from "./events-section";
import { EventCard } from "./event-card";

describe("EventCard", () => {
  it("renders the title and description", () => {
    render(
      <EventCard
        title="Test Event"
        description="Test description"
        date="Jan 2024"
      />
    );
    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders the date", () => {
    render(
      <EventCard
        title="Test Event"
        description="Description"
        date="March 2024"
      />
    );
    expect(screen.getByText("March 2024")).toBeInTheDocument();
  });

  it("renders the category badge when provided", () => {
    render(
      <EventCard
        title="Test Event"
        description="Description"
        date="Jan 2024"
        category="Training"
      />
    );
    expect(screen.getByText("Training")).toBeInTheDocument();
  });

  it("renders the link with correct href", () => {
    render(
      <EventCard
        title="Test Event"
        description="Description"
        date="Jan 2024"
        href="/events/test"
        linkText="Learn more"
      />
    );
    const link = screen.getByRole("link", { name: /Learn more/ });
    expect(link).toHaveAttribute("href", "/events/test");
  });

  it("renders image when imagePath is provided", () => {
    const { container } = render(
      <EventCard
        title="Test Event"
        description="Description"
        date="Jan 2024"
        imagePath="/test-image.jpg"
        imageAlt="Test image"
      />
    );
    const img = container.querySelector('img[src="/test-image.jpg"]');
    expect(img).toBeInTheDocument();
  });
});

describe("EventsSection", () => {
  it("renders the default title", () => {
    render(<EventsSection />);
    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<EventsSection title="Upcoming Events" />);
    expect(
      screen.getByRole("heading", { name: "Upcoming Events" })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<EventsSection />);
    expect(screen.getByText(/Join us at our upcoming events/)).toBeInTheDocument();
  });

  it("renders default events", () => {
    render(<EventsSection />);
    expect(screen.getByText("Spring 10K Training Programme")).toBeInTheDocument();
    expect(screen.getByText("Community Fun Run")).toBeInTheDocument();
    expect(screen.getByText("Running Technique Workshop")).toBeInTheDocument();
  });

  it("renders custom events", () => {
    const customEvents = [
      {
        title: "Custom Event",
        description: "Custom description",
        date: "Dec 2024",
      },
    ];
    render(<EventsSection events={customEvents} />);
    expect(screen.getByText("Custom Event")).toBeInTheDocument();
  });

  it("renders 'See all events' link by default", () => {
    render(<EventsSection />);
    const link = screen.getByRole("link", { name: /See all events/ });
    expect(link).toHaveAttribute("href", "/events");
  });

  it("hides 'See all events' link when showAllLink is false", () => {
    render(<EventsSection showAllLink={false} />);
    expect(
      screen.queryByRole("link", { name: /See all events/ })
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<EventsSection className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
