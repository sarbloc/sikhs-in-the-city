import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";
import { EventsSection } from "@/components/sections/events-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

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
        <EventsSection />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
