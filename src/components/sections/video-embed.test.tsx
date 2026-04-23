import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VideoEmbed } from "./video-embed";

describe("VideoEmbed", () => {
  it("renders a Vimeo iframe pointing at the given video id", () => {
    render(<VideoEmbed videoId="332851874" title="Fauja Singh speaks" />);
    const iframe = screen.getByTitle("Fauja Singh speaks");
    expect(iframe).toHaveAttribute(
      "src",
      "https://player.vimeo.com/video/332851874"
    );
    expect(iframe).toHaveAttribute("loading", "lazy");
  });

  it("appends the privacy hash when the video is unlisted", () => {
    render(
      <VideoEmbed
        videoId="332850326"
        hash="228ff61275"
        title="Appeal video"
      />
    );
    expect(screen.getByTitle("Appeal video")).toHaveAttribute(
      "src",
      "https://player.vimeo.com/video/332850326?h=228ff61275"
    );
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
