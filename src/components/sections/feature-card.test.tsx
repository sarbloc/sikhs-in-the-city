import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "./feature-card";

describe("FeatureCard", () => {
  it("renders the title, description, and link with the default label", () => {
    render(
      <FeatureCard
        title="Credibility"
        description="A trusted running community with decades of impact."
        href="/clubhouse-appeal"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: /credibility/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a trusted running community/i),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /find out more/i });
    expect(link).toHaveAttribute("href", "/clubhouse-appeal");
  });

  it("honours a custom link label", () => {
    render(
      <FeatureCard
        title="Events For Everyone"
        description="Open races for runners of every background."
        href="/events"
        linkText="See Events →"
      />,
    );

    const link = screen.getByRole("link", { name: /see events/i });
    expect(link).toHaveAttribute("href", "/events");
  });
});
