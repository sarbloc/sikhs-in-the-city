import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FaujaResultsView } from "@/components/sections/fauja-results-view";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { getFaujaResults } from "@/lib/contentful/fauja-results";

export default async function FaujaSinghResultsPage() {
  const years = await getFaujaResults();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FaujaResultsView years={years} />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
