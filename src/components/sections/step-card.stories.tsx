import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepCard } from "./step-card";

const meta = {
  title: "Sections/StepCard",
  component: StepCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#024EB2" }],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stepNumber: 1,
    title: "Register your interest",
    description:
      "Complete our contact form and tell us a little about yourself and your goals.",
  },
};

export const SecondStep: Story = {
  args: {
    stepNumber: 2,
    title: "Come and meet us",
    description:
      "Join us on a Sunday at 7am at Beal High School and get to know the community.",
  },
};

export const ThirdStep: Story = {
  args: {
    stepNumber: 3,
    title: "Start your journey",
    description:
      "Bring your training gear and water. We'll understand your goals and help you follow a plan that suits you.",
  },
};
