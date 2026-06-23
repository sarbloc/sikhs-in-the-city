import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { ExternalResultsView } from "./external-results-view";

const yearLinks = [
  { year: 2025, url: "https://justiming.co.uk/x?f=d2d25.clax" },
  { year: 2013, url: "https://justiming.co.uk/x?f=d2d13.clax" },
];

describe("ExternalResultsView", () => {
  it("renders the title and a live-results link for the default (first) year", () => {
    render(<ExternalResultsView title="Dawn To Dusk" yearLinks={yearLinks} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Dawn To Dusk" })
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /View Live Results/ });
    expect(link).toHaveAttribute("href", "https://justiming.co.uk/x?f=d2d25.clax");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("recomputes the link when the year changes", async () => {
    const user = userEvent.setup();
    render(<ExternalResultsView title="Dawn To Dusk" yearLinks={yearLinks} />);

    await user.selectOptions(screen.getByRole("combobox"), "2013");

    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute(
      "href",
      "https://justiming.co.uk/x?f=d2d13.clax"
    );
  });

  it("resets to the newest year when reused for a different event, even a shared year", async () => {
    const user = userEvent.setup();
    const a = [
      { year: 2025, url: "a25" },
      { year: 2022, url: "a22" },
    ];
    const b = [
      { year: 2024, url: "b24" },
      { year: 2022, url: "b22" },
    ];
    const { rerender } = render(<ExternalResultsView title="A" yearLinks={a} />);
    await user.selectOptions(screen.getByRole("combobox"), "2022"); // exists in both events

    // Simulate client-side navigation reusing this instance with the other
    // event's links — must reset to B's newest (2024), not the stale 2022.
    rerender(<ExternalResultsView title="B" yearLinks={b} />);

    expect(screen.getByRole("combobox")).toHaveValue("2024");
    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute("href", "b24");
  });
});
