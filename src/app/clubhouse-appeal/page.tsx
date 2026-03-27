import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";

export default function ClubhouseAppealPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="ClubHouse Appeal"
          description="Help us build a permanent home for our community. Learn about our clubhouse appeal and how you can contribute."
          ctaText="Donate Now"
          ctaHref="/contact"
        />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-lg text-muted-foreground">
              Content coming soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
