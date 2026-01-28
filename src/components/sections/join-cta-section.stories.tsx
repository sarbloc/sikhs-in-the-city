import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JoinCtaSection } from "./join-cta-section";

const meta = {
  title: "Sections/JoinCtaSection",
  component: JoinCtaSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof JoinCtaSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    heading: "Start Your Running Journey",
    description:
      "Whether you want to run your first 5K or train for a marathon, we're here to help you reach your goals.",
    ctaText: "Get Started",
    ctaHref: "/register",
  },
};

export const ShortDescription: Story = {
  args: {
    heading: "Join the Community",
    description: "Become part of our running family today.",
    ctaText: "Join Now",
    ctaHref: "/join",
  },
};
