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
    title: "Summer Somosa Ultra",
    description:
      "Sign up for our Summer The Event is a multiple lap comprising three distances (Half Marathon, Full Marathon and Ultra Marathon 50km plus).",
    date: "28th June 2026",
    imagePath: "/images/events/summer-somosa.jpg",
    imageAlt: "Runners at the Summer Somosa Ultra event",
    href: "/events/summer-somosa-ultra",
  },
  {
    title: "Dawn 2 Dusk Ultra",
    description:
      "Sign up for our Summer The Event is a multiple lap comprising three distances (Half Marathon, Full Marathon and Ultra Marathon 50km plus).",
    date: "6th December 2026",
    imagePath: "/images/events/dawn-2-dusk.jpg",
    imageAlt: "Runners at the Dawn 2 Dusk Ultra event",
    href: "/events/dawn-2-dusk-ultra",
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
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
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
