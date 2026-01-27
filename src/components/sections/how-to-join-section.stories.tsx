import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HowToJoinSection } from "./how-to-join-section";

const meta = {
  title: "Sections/HowToJoinSection",
  component: HowToJoinSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HowToJoinSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomSteps: Story = {
  args: {
    title: "Getting Started",
    description: "Follow these simple steps to join our running community.",
    steps: [
      {
        title: "Apply Online",
        description: "Fill out our quick application form.",
      },
      {
        title: "Attend Orientation",
        description: "Join us for an introduction session.",
      },
      {
        title: "Start Running",
        description: "Begin your journey with weekly group runs.",
      },
      {
        title: "Track Progress",
        description: "Monitor your improvement over time.",
      },
    ],
    ctaText: "Apply Now",
    ctaHref: "/apply",
  },
};

export const TwoSteps: Story = {
  args: {
    steps: [
      { title: "Sign Up", description: "Create your account." },
      { title: "Join a Run", description: "Pick a session that works for you." },
    ],
  },
};
