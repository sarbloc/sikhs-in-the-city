import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";

export default function OurStoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Our Story"
          description="Sikhs In The City is a community-led running charity based in East London, bringing people and cultures together through running."
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
