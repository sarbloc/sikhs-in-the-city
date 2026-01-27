import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OurStorySection } from "./our-story-section";

const meta = {
  title: "Sections/OurStorySection",
  component: OurStorySection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OurStorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    imagePath: "https://placehold.co/800x600/1a1a1a/333333?text=Running+Community",
  },
};

export const CustomContent: Story = {
  args: {
    title: "About Our Community",
    paragraphs: [
      "We are a diverse group of runners from all backgrounds and abilities.",
      "Every Sunday morning, we gather to run, support each other, and build lasting friendships.",
    ],
    linkText: "Discover more",
    linkHref: "/about",
  },
};
