import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCard } from "./event-card";
import { cn } from "@/lib/utils";

interface Event {
  title: string;
  description: string;
  date: string;
  category?: string;
  imagePath?: string;
  imageAlt?: string;
  href?: string;
}

interface EventsSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Events array */
  events?: Event[];
  /** Show "See all events" link */
  showAllLink?: boolean;
  /** "See all events" link href */
  allEventsHref?: string;
  /** Additional className */
  className?: string;
}

const defaultEvents: Event[] = [
  {
    title: "Spring 10K Training Programme",
    description:
      "Join our 8-week structured training programme to prepare for your first 10K race.",
    date: "March 2024",
    category: "Training",
    href: "/events/spring-10k",
  },
  {
    title: "Community Fun Run",
    description:
      "A family-friendly 5K fun run through the local park. All abilities welcome.",
    date: "April 2024",
    category: "Community",
    href: "/events/fun-run",
  },
  {
    title: "Running Technique Workshop",
    description:
      "Learn proper running form and injury prevention techniques from our experienced coaches.",
    date: "May 2024",
    category: "Workshop",
    href: "/events/technique-workshop",
  },
];

export function EventsSection({
  title = "Events",
  description = "Join us at our upcoming events and become part of the Sikhs In the City community.",
  events = defaultEvents,
  showAllLink = true,
  allEventsHref = "/events",
  className,
}: EventsSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              date={event.date}
              category={event.category}
              imagePath={event.imagePath}
              imageAlt={event.imageAlt}
              href={event.href}
            />
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 text-center">
            <Link
              href={allEventsHref}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See all events →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
