import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VideoEmbed } from "./video-embed";

describe("VideoEmbed", () => {
  it("renders an iframe pointing at the given YouTube video id", () => {
    render(<VideoEmbed videoId="dQw4w9WgXcQ" title="Fauja Singh speaks" />);
    const iframe = screen.getByTitle("Fauja Singh speaks");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    );
    expect(iframe).toHaveAttribute("loading", "lazy");
  });

  it("renders the caption when provided", () => {
    render(
      <VideoEmbed
        videoId="abc"
        title="Team video"
        caption="The team on the project"
      />
    );
    expect(screen.getByText("The team on the project")).toBeInTheDocument();
  });

  it("omits the caption element when not provided", () => {
    const { container } = render(
      <VideoEmbed videoId="abc" title="No caption" />
    );
    expect(container.querySelector("figcaption")).toBeNull();
  });
});
