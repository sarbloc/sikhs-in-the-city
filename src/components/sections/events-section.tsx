import { EventCard } from "./event-card";
import { cn } from "@/lib/utils";

interface Event {
  title: string;
  description: string;
  date: string;
  imagePath?: string;
  imageAlt?: string;
  href?: string;
}

interface EventsSectionProps {
  /** Section title */
  title?: string;
  /** Events array */
  events?: Event[];
  /** Additional className */
  className?: string;
}

const defaultEvents: Event[] = [
  {
    title: "Summer Samosa Ultra",
    description:
      "Sign up for our Summer Samosa Ultra — a multi-lap race with three distances to choose from: Half Marathon, Full Marathon and Ultra Marathon (50km+).",
    date: "28th June 2026",
    imagePath: "/images/events/summer-somosa.png",
    imageAlt: "Runners at the Summer Samosa Ultra event",
    href: "/contact",
  },
  {
    title: "Dawn 2 Dusk Ultra",
    description:
      "Sign up for our flagship Dawn 2 Dusk Ultra — a multi-lap endurance event offering Half Marathon, Full Marathon and Ultra Marathon (50km+) distances.",
    date: "6th December 2026",
    imagePath: "/images/events/dawn-2-dusk.png",
    imageAlt: "Runners at the Dawn 2 Dusk Ultra event",
    href: "/contact",
  },
];

export function EventsSection({
  title = "Events",
  events = defaultEvents,
  className,
}: EventsSectionProps) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              date={event.date}
              imagePath={event.imagePath}
              imageAlt={event.imageAlt}
              href={event.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
