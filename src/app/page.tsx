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
import { getHeroSlides } from "@/lib/contentful/hero";

export default async function Home() {
  // Contentful is the source of truth for homepage content. Fetch hero slides
  // and events in parallel; let failures throw rather than masking them with the
  // built-in defaults, so a failed build leaves the prior deploy live and ISR
  // keeps serving the last good homepage instead of caching stale content.
  const [heroSlides, events] = await Promise.all([getHeroSlides(), getEvents()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection slides={heroSlides} />
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
