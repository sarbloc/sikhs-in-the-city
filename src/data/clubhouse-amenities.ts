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
  type LucideIcon,
} from "lucide-react";

/** A single tile in the Clubhouse Appeal amenities grid. */
export interface ClubhouseAmenity {
  label: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Amenities featured in the proposed Fauja Singh Clubhouse, rendered as a
 * 3×3 grid on `/clubhouse-appeal`. Icons are lucide suggestions — swap with
 * the designer's final selections if they change during review.
 *
 * Note: the mock shipped with a "femal" typo on TOILETS — corrected to
 * "female" here per the design plan.
 */
export const clubhouseAmenities: ClubhouseAmenity[] = [
  {
    label: "TOILETS",
    description: "Male, female and accessible WC facilities",
    icon: Accessibility,
  },
  {
    label: "SHOWERS",
    description: "Male and female changing rooms with showers",
    icon: ShowerHead,
  },
  {
    label: "ACTIVITY STUDIO",
    description: "Open plan space for activities such as yoga and Pilates",
    icon: Activity,
  },
  {
    label: "COMMUNITY SPACE",
    description: "Office and reception area",
    icon: Users,
  },
  {
    label: "REFRESHMENT AREA",
    description: "Kitchenette and refreshment area",
    icon: Coffee,
  },
  {
    label: "RECOVERY",
    description: "A medical and recovery room",
    icon: HeartPulse,
  },
  {
    label: "FITNESS AREA",
    description:
      "Storage and running training equipment, including gym facilities",
    icon: Dumbbell,
  },
  {
    label: "FAUJA SINGH LIBRARY",
    description: "A dedicated Fauja Singh library and memorabilia room",
    icon: BookOpen,
  },
  {
    label: "WELLBEING",
    description: "Roof garden and outdoor wellbeing space",
    icon: Leaf,
  },
];
