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
  // Events come from Contentful; behaviour depends on environment state:
  //  - Configured: fetch live events and let failures THROW, so ISR keeps
  //    serving the last good homepage (and a failed prod build leaves the prior
  //    deploy live) rather than caching the built-in defaults over real data.
  //  - Unconfigured in production: throw, so a missing/typoed env var fails the
  //    deploy visibly instead of silently shipping stale default cards.
  //  - Unconfigured in dev/preview: use EventsSection's defaults so local builds
  //    and preview deploys without secrets still work.
  const configured = isContentfulConfigured();
  if (!configured && process.env.VERCEL_ENV === "production") {
    throw new Error(
      "Contentful is not configured in production: set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN"
    );
  }
  const events = configured ? await getEvents() : undefined;

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
