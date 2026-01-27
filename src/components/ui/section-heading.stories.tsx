import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "radio",
      options: ["left", "center"],
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Our Story",
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "A Project to honour Fauja Singh BEM",
    title: "Fauja Singh Clubhouse Appeal",
  },
};

export const WithDescription: Story = {
  args: {
    title: "How To Join",
    description:
      "Joining Sikhs In the City is simple and you don't need any previous running experience. Whether you're taking your first steps into running or building towards a 10K and beyond, we'll support you every step of the way.",
  },
};

export const FullExample: Story = {
  args: {
    eyebrow: "Dawn To Dusk",
    title: "Course Records",
    description:
      "Record completion times for the Ultra, Marathon, Half Marathon, and 10k distances.",
  },
};

export const Centered: Story = {
  args: {
    title: "Join Sikhs In the City",
    description:
      "Ready to start running with a supportive community? Register your interest and we'll share the details for Sunday morning training.",
    align: "center",
  },
};

export const CenteredWithEyebrow: Story = {
  args: {
    eyebrow: "Get Started",
    title: "Register Your Interest",
    description: "Complete our contact form and tell us about your goals.",
    align: "center",
  },
};
