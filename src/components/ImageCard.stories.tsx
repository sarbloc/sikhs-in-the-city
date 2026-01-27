import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageCard } from "./ImageCard";

const meta = {
  title: "Components/ImageCard",
  component: ImageCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    imagePath: {
      control: "text",
      description: "Path to the image",
    },
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card description text",
    },
    buttonText: {
      control: "text",
      description: "Button label",
    },
    buttonHref: {
      control: "text",
      description: "Button link destination",
    },
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imagePath: "https://placehold.co/600x400/1a1a1a/ffffff?text=Event+Image",
    title: "Summer Somosa Ultra",
    description:
      "Sign up for our Summer event. A multiple lap comprising three distances (Half Marathon, Full Marathon and Ultra Marathon 50km plus)",
    buttonText: "Sign up now",
    buttonHref: "/events/summer-somosa",
  },
};

export const ShortContent: Story = {
  args: {
    imagePath: "https://placehold.co/600x400/2d4a3e/ffffff?text=Running",
    title: "Weekly Training",
    description: "Join us every Sunday at 7am.",
    buttonText: "Learn More",
    buttonHref: "/training",
  },
};

export const LongDescription: Story = {
  args: {
    imagePath: "https://placehold.co/600x400/4a2d4a/ffffff?text=Community",
    title: "Fauja Singh Clubhouse Appeal",
    description:
      "We're working to build an eco-friendly community clubhouse that supports health, wellbeing, and connection. With your support, we can turn this vision into a lasting space for the local community. Every donation helps us get closer to our goal.",
    buttonText: "Donate Now",
    buttonHref: "/clubhouse-appeal",
  },
};
