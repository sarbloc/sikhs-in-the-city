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
    render(
      <ExternalResultsView eventId="dawn-to-dusk" title="Dawn To Dusk" yearLinks={yearLinks} />
    );
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
    render(
      <ExternalResultsView eventId="dawn-to-dusk" title="Dawn To Dusk" yearLinks={yearLinks} />
    );

    await user.selectOptions(screen.getByRole("combobox"), "2013");

    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute(
      "href",
      "https://justiming.co.uk/x?f=d2d13.clax"
    );
  });

  it("resets to the newest year when the event changes, even with identical year lists", async () => {
    const user = userEvent.setup();
    const links = [
      { year: 2025, url: "x25" },
      { year: 2022, url: "x22" },
    ];
    const { rerender } = render(<ExternalResultsView eventId="a" title="A" yearLinks={links} />);
    await user.selectOptions(screen.getByRole("combobox"), "2022");

    // Same year list, different event — must still reset to the newest (2025).
    rerender(<ExternalResultsView eventId="b" title="B" yearLinks={links} />);

    expect(screen.getByRole("combobox")).toHaveValue("2025");
    expect(screen.getByRole("link", { name: /View Live Results/ })).toHaveAttribute("href", "x25");
  });
});
