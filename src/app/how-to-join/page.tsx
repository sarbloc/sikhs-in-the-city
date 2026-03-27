import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";

export default function HowToJoinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="How To Join"
          description="Join our running community — all abilities welcome. Here's how you can get involved."
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
