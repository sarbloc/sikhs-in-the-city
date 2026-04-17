import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResultsTable } from "./results-table";

const meta = {
  title: "UI/ResultsTable",
  component: ResultsTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResultsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { key: "name", label: "Name" },
  { key: "laps", label: "Laps" },
  { key: "distance", label: "Distance (km)" },
  { key: "time", label: "Time" },
];

const rows = [
  { name: "Angela Cowell", laps: 21, distance: "42.29", time: "6:16:50" },
  { name: "Anna Prowse", laps: 21, distance: "42.29", time: "1:50:06" },
  { name: "Anne Purdham", laps: 21, distance: "42.29", time: "5:22:07" },
  { name: "Cindy Koon", laps: 16, distance: "42.29", time: "5:22:07" },
  { name: "Claire Louise", laps: 15, distance: "30.21", time: "3:55:00" },
  { name: "David Davidson", laps: 21, distance: "42.29", time: "6:28:16" },
  { name: "Dawanie Chuithong", laps: 14, distance: "28.19", time: "3:06:00" },
  { name: "Dawn Harvey", laps: 15, distance: "30.21", time: "4:29:00" },
  { name: "Ghanaya Talewar", laps: 21, distance: "42.29", time: "4:57:43" },
  { name: "Gurcharan Kaur", laps: 7, distance: "14.10", time: "1:50:06" },
];

export const Default: Story = {
  args: {
    columns,
    rows,
    caption: "Fauja Singh Birthday Challenge 2025 results",
  },
};

export const TwoRows: Story = {
  args: {
    columns,
    rows: rows.slice(0, 2),
  },
};

export const Empty: Story = {
  args: {
    columns,
    rows: [],
  },
};

export const NarrowContainer: Story = {
  args: {
    columns,
    rows: rows.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};
