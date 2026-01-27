import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClubhouseAppealSection } from "./clubhouse-appeal-section";

const meta = {
  title: "Sections/ClubhouseAppealSection",
  component: ClubhouseAppealSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClubhouseAppealSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: "Help Build Our New Home",
    description:
      "Join us in creating a permanent space for our running community. Every contribution brings us closer to our goal.",
    primaryCtaText: "Contribute",
    primaryCtaHref: "/contribute",
    secondaryCtaText: "See Progress",
    secondaryCtaHref: "/progress",
  },
};

export const SingleCta: Story = {
  args: {
    secondaryCtaText: "",
  },
  render: (args) => (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {args.title || "Support Our Clubhouse Appeal"}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
            {args.description ||
              "We're raising funds to build a dedicated clubhouse for our community."}
          </p>
          <div className="mt-8">
            <a
              href={args.primaryCtaHref || "/donate"}
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-6 text-sm font-medium text-secondary-foreground"
            >
              {args.primaryCtaText || "Donate Now"}
            </a>
          </div>
        </div>
      </div>
    </section>
  ),
};
