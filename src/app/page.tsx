import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { OurStorySection } from "@/components/sections/our-story-section";
import { HowToJoinSection } from "@/components/sections/how-to-join-section";
import { EventsSection } from "@/components/sections/events-section";
import { ClubhouseAppealSection } from "@/components/sections/clubhouse-appeal-section";
import { CourseRecordsSection } from "@/components/sections/course-records-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { getEvents, type EventItem } from "@/lib/contentful/events";

// Keep `/` on ISR even if getEvents() throws before its tagged fetch runs
// (e.g. Contentful env not yet configured at build time). Without this, a
// failed build would prerender a plain static page with no revalidation,
// freezing the homepage on the fallback cards until the next deploy; with it,
// the route self-heals within the window once Contentful is reachable.
export const revalidate = 3600;

export default async function Home() {
  let events: EventItem[] | undefined;
  try {
    events = await getEvents();
  } catch (err) {
    // Contentful unreachable/misconfigured: degrade to EventsSection's built-in
    // defaults rather than failing the whole homepage render.
    console.error("[home] Failed to load events from Contentful; using defaults", err);
    events = undefined;
  }

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
