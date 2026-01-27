import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./hero-section";

const meta = {
  title: "Sections/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomContent: Story = {
  args: {
    heading: "Run With Us",
    subheading:
      "Join our community of runners every Sunday morning in East London.",
    primaryCta: "Register Now",
    primaryHref: "/register",
    secondaryCta: "View Events",
    secondaryHref: "/events",
  },
};

export const WithBackgroundImage: Story = {
  args: {
    backgroundImage: "https://placehold.co/1920x1080/1a1a1a/333333?text=Hero+Background",
  },
};

export const MinimalContent: Story = {
  args: {
    heading: "Welcome",
    subheading: "Start your running journey today.",
  },
};
