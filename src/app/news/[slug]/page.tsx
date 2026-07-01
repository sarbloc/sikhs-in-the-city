import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { formatNewsDate } from "@/components/news/news-card";
import { NewsBody } from "@/components/news/rich-text";
import { getNewsItem, getNewsItems } from "@/lib/contentful/news";

export async function generateStaticParams() {
  const items = await getNewsItems();
  return items.map((i) => ({ slug: i.slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsItem(slug);
  if (!article) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/news"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                <span aria-hidden="true">←</span> Back to news
              </Link>
              <time
                dateTime={article.date}
                className="mt-8 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {formatNewsDate(article.date)}
              </time>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {article.title}
              </h1>
            </div>

            {article.thumbnail && (
              <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl">
                <Image src={article.thumbnail} alt="" fill priority className="object-cover" />
              </div>
            )}

            <div className="mx-auto mt-10 max-w-3xl">
              <NewsBody document={article.body} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
