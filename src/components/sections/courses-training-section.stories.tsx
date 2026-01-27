import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CoursesTrainingSection } from "./courses-training-section";

const meta = {
  title: "Sections/CoursesTrainingSection",
  component: CoursesTrainingSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CoursesTrainingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const TwoCourses: Story = {
  args: {
    courses: [
      {
        title: "Beginner Running",
        description: "Start your running journey with us.",
        level: "Beginner",
        schedule: "Saturdays 9am",
        href: "/training/beginner",
      },
      {
        title: "Advanced Intervals",
        description: "High-intensity interval training for experienced runners.",
        level: "Advanced",
        schedule: "Tuesdays 6pm",
        href: "/training/intervals",
      },
    ],
  },
};

export const NoSchedule: Story = {
  args: {
    courses: [
      {
        title: "Flexible Training",
        description: "Train at your own pace with our self-guided programme.",
        level: "All Levels",
        href: "/training/flexible",
      },
    ],
  },
};
