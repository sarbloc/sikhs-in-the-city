import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Events"
          description="Discover our upcoming runs, races, and community events."
        />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <iframe
              src="https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d25.clax"
              title="Live results"
              className="h-[80vh] w-full rounded-lg border"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
