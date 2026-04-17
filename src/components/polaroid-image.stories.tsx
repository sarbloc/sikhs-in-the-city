import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PolaroidImage } from "./polaroid-image";

const meta = {
  title: "Components/PolaroidImage",
  component: PolaroidImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rotate: {
      control: { type: "range", min: -15, max: 15, step: 1 },
    },
  },
} satisfies Meta<typeof PolaroidImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sample = "https://placehold.co/400x300/024EB2/ffffff?text=SITC";

export const Default: Story = {
  args: {
    src: sample,
    alt: "Sample polaroid",
    width: 260,
    height: 195,
  },
};

export const TiltedLeft: Story = {
  args: {
    src: sample,
    alt: "Tilted left",
    width: 260,
    height: 195,
    rotate: -6,
  },
};

export const TiltedRight: Story = {
  args: {
    src: sample,
    alt: "Tilted right",
    width: 260,
    height: 195,
    rotate: 6,
  },
};

export const Cluster: Story = {
  args: {
    src: sample,
    alt: "placeholder",
    width: 220,
    height: 165,
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 p-12">
      <PolaroidImage
        src="https://placehold.co/400x300/024EB2/ffffff?text=1"
        alt="Event photo 1"
        width={220}
        height={165}
        rotate={-5}
      />
      <PolaroidImage
        src="https://placehold.co/400x300/FFF279/1a1a1a?text=2"
        alt="Event photo 2"
        width={220}
        height={165}
        rotate={3}
        className="-ml-4"
      />
      <PolaroidImage
        src="https://placehold.co/400x300/012F6B/ffffff?text=3"
        alt="Event photo 3"
        width={220}
        height={165}
        rotate={-2}
        className="-ml-4"
      />
      <PolaroidImage
        src="https://placehold.co/400x300/CCDCF0/1a1a1a?text=4"
        alt="Event photo 4"
        width={220}
        height={165}
        rotate={4}
        className="-ml-4"
      />
    </div>
  ),
};
