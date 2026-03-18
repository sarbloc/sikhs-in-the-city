import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CourseRecordsSection } from "./course-records-section";

const meta = {
  title: "Sections/CourseRecordsSection",
  component: CourseRecordsSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CourseRecordsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomRecords: Story = {
  args: {
    title: "Club Best Times",
    description: "Personal bests achieved by our club members.",
    records: [
      {
        category: "5K",
        requirement: "Complete 2.5 laps",
        holders: [
          { name: "Fast Runner", laps: 3, time: "18:00", year: 2024 },
        ],
      },
    ],
  },
};
