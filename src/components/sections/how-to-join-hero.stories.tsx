import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HowToJoinHero } from "./how-to-join-hero";

const meta = {
  title: "Sections/HowToJoinHero",
  component: HowToJoinHero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HowToJoinHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomCopy: Story = {
  args: {
    title: "Run with purpose",
    description:
      "From your first jog to your first marathon, we'll meet you where you are.",
    ctaText: "Get Involved",
    ctaHref: "/contact",
  },
};
