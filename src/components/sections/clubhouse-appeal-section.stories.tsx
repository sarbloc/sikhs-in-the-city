import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClubhouseAppealSection } from "./clubhouse-appeal-section";

const meta = {
  title: "Sections/ClubhouseAppealSection",
  component: ClubhouseAppealSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClubhouseAppealSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: "Help Build Our New Home",
    description:
      "Join us in creating a permanent space for our running community. Every contribution brings us closer to our goal.",
    primaryCtaText: "Contribute",
    primaryCtaHref: "/contribute",
    secondaryCtaText: "See Progress",
    secondaryCtaHref: "/progress",
  },
};
