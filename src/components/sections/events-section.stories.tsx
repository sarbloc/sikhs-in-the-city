import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventsSection } from "./events-section";

const meta = {
  title: "Sections/EventsSection",
  component: EventsSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EventsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SingleEvent: Story = {
  args: {
    events: [
      {
        title: "Annual Charity Run",
        description:
          "Our flagship annual event supporting local charities. All levels welcome.",
        date: "September 2024",
        category: "Charity",
        href: "/events/charity-run",
      },
    ],
  },
};

export const WithImages: Story = {
  args: {
    events: [
      {
        title: "Morning Park Run",
        description: "Join us for a scenic run through the local park.",
        date: "Every Saturday",
        category: "Weekly",
        imagePath: "/placeholder-event.jpg",
        imageAlt: "Runners in the park",
        href: "/events/park-run",
      },
      {
        title: "Evening Track Session",
        description: "Speed work and interval training at the local track.",
        date: "Every Wednesday",
        category: "Training",
        imagePath: "/placeholder-event.jpg",
        imageAlt: "Track training",
        href: "/events/track",
      },
    ],
  },
};

export const NoAllEventsLink: Story = {
  args: {
    showAllLink: false,
  },
};
