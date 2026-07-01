import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NewsCard } from "@/components/news/news-card";
import { getNewsItems } from "@/lib/contentful/news";

export default async function NewsListingPage() {
  const items = await getNewsItems();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-blue-950 px-4 py-16 md:py-20">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              News &amp; Announcements
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              The latest updates, events and stories from the Sikhs In The City community.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {items.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <NewsCard key={item.slug} {...item} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No news yet — check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
