import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";
import { EventsSection } from "@/components/sections/events-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

const eventsPageEvents = [
  {
    title: "Summer Somosa Ultra",
    description:
      "Sign up for our Summer Samosa Ultra — a multi-lap race with three distances to choose from: Half Marathon, Full Marathon and Ultra Marathon (50km+).",
    date: "28th June 2026",
    imagePath: "/images/events/summer-somosa.png",
    imageAlt: "Runners at the Summer Somosa Ultra event",
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

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Events That Move The Community"
          description="From first-time runners to ultra-distance athletes, our events are designed to inspire, challenge, and bring people together."
          ctaText="Register Your Interest"
          ctaHref="/contact"
          backgroundImage="/images/hero/slide-1.png"
          backgroundImageAlt="Sikhs In The City runners gathered at an event"
        />
        <EventsSection events={eventsPageEvents} />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
