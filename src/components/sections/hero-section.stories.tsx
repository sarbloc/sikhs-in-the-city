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

export const SingleSlide: Story = {
  args: {
    slides: [
      {
        heading: "Welcome to SITC",
        subheading: "Join our running community today.",
        primaryCta: "Join Now",
        primaryHref: "/join",
      },
    ],
  },
};

export const WithBackgroundImages: Story = {
  args: {
    slides: [
      {
        heading: "Run Together",
        subheading: "Join us every Sunday morning for a community run.",
        backgroundImage:
          "https://placehold.co/1920x1080/1a1a1a/333333?text=Slide+1",
        primaryCta: "Join Us",
        primaryHref: "/join",
      },
      {
        heading: "Train With Us",
        subheading: "From Couch to 5K to marathon training.",
        backgroundImage:
          "https://placehold.co/1920x1080/2a2a2a/444444?text=Slide+2",
        primaryCta: "See Training",
        primaryHref: "/training",
      },
      {
        heading: "Make a Difference",
        subheading: "Support our clubhouse appeal and help us grow.",
        backgroundImage:
          "https://placehold.co/1920x1080/3a3a3a/555555?text=Slide+3",
        primaryCta: "Donate",
        primaryHref: "/donate",
      },
    ],
  },
};

export const TwoSlides: Story = {
  args: {
    slides: [
      {
        heading: "First Slide",
        subheading: "This is the first slide content.",
        primaryCta: "Primary Action",
        primaryHref: "/primary",
        secondaryCta: "Secondary",
        secondaryHref: "/secondary",
      },
      {
        heading: "Second Slide",
        subheading: "This is the second slide content.",
        primaryCta: "Another Action",
        primaryHref: "/another",
      },
    ],
  },
};
