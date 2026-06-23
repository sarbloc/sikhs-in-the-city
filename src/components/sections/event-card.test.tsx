import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventCard } from "./event-card";

describe("EventCard", () => {
  it("renders the signup CTA when href is provided", () => {
    render(
      <EventCard
        title="Summer Race"
        description="A race."
        date="1 Jan 2027"
        href="https://example.com/signup"
      />
    );
    expect(screen.getByRole("link", { name: "Sign Up Now" })).toHaveAttribute(
      "href",
      "https://example.com/signup"
    );
  });

  it("omits the CTA when href is absent, so there is no dead link", () => {
    render(<EventCard title="Summer Race" description="A race." date="1 Jan 2027" />);
    expect(screen.queryByRole("link", { name: "Sign Up Now" })).toBeNull();
    // The event itself is still shown.
    expect(screen.getByText("Summer Race")).toBeInTheDocument();
  });
});
