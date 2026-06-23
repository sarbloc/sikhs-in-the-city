import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExternalResultsView } from "@/components/sections/external-results-view";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { getResultsEvent } from "@/lib/contentful/results";

export default async function DawnToDuskResultsPage() {
  const slug = "dawn-to-dusk";
  const { title, yearLinks } = await getResultsEvent(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* key forces a fresh mount per event, so the year selection never
            leaks across client-side navigation between results pages. */}
        <ExternalResultsView key={slug} title={title} yearLinks={yearLinks} />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
