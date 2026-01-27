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
        category: "1 Mile",
        male: { name: "Fast Runner", time: "4:45" },
        female: { name: "Quick Runner", time: "5:30" },
      },
      {
        category: "5K",
        male: { name: "Speed Demon", time: "16:00" },
        female: { name: "Swift Runner", time: "18:30" },
      },
    ],
  },
};

export const MaleOnly: Story = {
  args: {
    records: [
      {
        category: "5K",
        male: { name: "John Smith", time: "17:30" },
      },
      {
        category: "10K",
        male: { name: "Mike Jones", time: "36:45" },
      },
    ],
  },
};
