import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/sections/page-hero";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Contact Us"
          description="Get in touch with Sikhs In The City. We'd love to hear from you."
          ctaText="Register Your Interest"
          ctaHref="#"
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
