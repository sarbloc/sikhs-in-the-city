import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accessibility,
  Activity,
  BookOpen,
  Coffee,
  Dumbbell,
  HeartPulse,
  Leaf,
  ShowerHead,
  Users,
} from "lucide-react";
import { AmenityCard } from "./amenity-card";

const meta = {
  title: "Components/AmenityCard",
  component: AmenityCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AmenityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Accessibility,
    label: "TOILETS",
    description: "Male, female and accessible WC facilities",
  },
};

export const LongDescription: Story = {
  args: {
    icon: Dumbbell,
    label: "FITNESS AREA",
    description:
      "Storage and running training equipment, including gym facilities",
  },
};

export const ClubhouseGrid: Story = {
  args: {
    icon: Accessibility,
    label: "TOILETS",
    description: "Male, female and accessible WC facilities",
  },
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AmenityCard
        icon={Accessibility}
        label="TOILETS"
        description="Male, female and accessible WC facilities"
      />
      <AmenityCard
        icon={ShowerHead}
        label="SHOWERS"
        description="Male and female changing rooms with showers"
      />
      <AmenityCard
        icon={Activity}
        label="ACTIVITY STUDIO"
        description="Open plan space for activities such as yoga and Pilates"
      />
      <AmenityCard
        icon={Users}
        label="COMMUNITY SPACE"
        description="Office and reception area"
      />
      <AmenityCard
        icon={Coffee}
        label="REFRESHMENT AREA"
        description="Kitchenette and refreshment area"
      />
      <AmenityCard
        icon={HeartPulse}
        label="RECOVERY"
        description="A medical and recovery room"
      />
      <AmenityCard
        icon={Dumbbell}
        label="FITNESS AREA"
        description="Storage and running training equipment, including gym facilities"
      />
      <AmenityCard
        icon={BookOpen}
        label="FAUJA SINGH LIBRARY"
        description="A dedicated Fauja Singh library and memorabilia room"
      />
      <AmenityCard
        icon={Leaf}
        label="WELLBEING"
        description="Roof garden and outdoor wellbeing space"
      />
    </div>
  ),
};
