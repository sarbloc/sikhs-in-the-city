import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { OurStorySection } from "@/components/sections/our-story-section";
import { HowToJoinSection } from "@/components/sections/how-to-join-section";
import { EventsSection } from "@/components/sections/events-section";
import { ClubhouseAppealSection } from "@/components/sections/clubhouse-appeal-section";
import { CourseRecordsSection } from "@/components/sections/course-records-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { getEvents } from "@/lib/contentful/events";
import { isContentfulConfigured } from "@/lib/contentful/client";

export default async function Home() {
  // Configured -> fetch live events and let any failure THROW, so ISR keeps
  // serving the last good homepage rather than caching the built-in defaults
  // over real data (and a failed prod build leaves the prior deploy live).
  // Not configured (local dev / preview without env) -> use EventsSection's
  // defaults so the build and dev server still work. The tagged fetch sets the
  // route's 1h ISR window; the publish webhook refreshes it on demand.
  const events = isContentfulConfigured() ? await getEvents() : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <OurStorySection />
        <HowToJoinSection />
        <EventsSection events={events} />
        <ClubhouseAppealSection />
        <CourseRecordsSection />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
