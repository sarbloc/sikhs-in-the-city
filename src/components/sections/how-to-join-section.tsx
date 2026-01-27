import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepCard } from "./step-card";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface HowToJoinSectionProps {
  /** Section title */
  title?: string;
  /** Introduction paragraph */
  description?: string;
  /** Steps array */
  steps?: Step[];
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Additional className */
  className?: string;
}

const defaultSteps: Step[] = [
  {
    title: "Register your interest",
    description:
      "Complete our contact form and tell us a little about yourself and your goals.",
  },
  {
    title: "Come and meet us",
    description:
      "Join us on a Sunday at 7am at Beal High School and get to know the community.",
  },
  {
    title: "Start your journey",
    description:
      "Bring your training gear and water. We'll understand your goals and help you follow a plan that suits you.",
  },
];

export function HowToJoinSection({
  title = "How To Join",
  description = "Joining Sikhs In the City is simple and you don't need any previous running experience. Whether you're taking your first steps into running or building towards a 10K and beyond, we'll support you every step of the way.",
  steps = defaultSteps,
  ctaText = "Register your interest",
  ctaHref = "/contact",
  className,
}: HowToJoinSectionProps) {
  return (
    <section className={cn("bg-muted/30 py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
