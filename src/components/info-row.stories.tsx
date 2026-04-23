import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InfoRow } from "./info-row";

const meta = {
  title: "Components/InfoRow",
  component: InfoRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InfoRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Location: Story = {
  args: {
    icon: MapPin,
    children:
      "Junction of Roding Lane South & Woodford Bridge Road opposite the PDSA centre, nearest postcode for SatNav IG4 5PS",
  },
};

export const Time: Story = {
  args: {
    icon: Clock,
    children: (
      <>
        Every <strong>Sunday</strong> morning <strong>6:00am - 9:00am</strong>
      </>
    ),
  },
};

export const ContactStack: Story = {
  args: {
    icon: MapPin,
    children: "placeholder",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <InfoRow icon={MapPin}>
        Junction of Roding Lane South & Woodford Bridge Road opposite the PDSA
        centre, nearest postcode for SatNav IG4 5PS
      </InfoRow>
      <InfoRow icon={Clock}>
        Every <strong>Sunday</strong> morning{" "}
        <strong>6:00am - 9:00am</strong>
      </InfoRow>
      <InfoRow icon={Mail}>
        <a
          href="mailto:info@sikhsinthecity.org"
          className="text-primary hover:underline"
        >
          info@sikhsinthecity.org
        </a>
      </InfoRow>
      <InfoRow icon={Phone}>+44 20 0000 0000</InfoRow>
    </div>
  ),
};
