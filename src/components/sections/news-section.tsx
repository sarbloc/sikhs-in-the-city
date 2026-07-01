import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { NewsListItem } from "@/components/news/news-card";
import { getNewsItems } from "@/lib/contentful/news";
import { cn } from "@/lib/utils";

/**
 * Homepage "News & Announcements" section: the latest 4 as compact horizontal
 * items in a two-column grid, plus a link to the full listing. Hidden when
 * there is no published news.
 */
export async function NewsSection({ className }: { className?: string }) {
  const latest = await getNewsItems(4);
  if (latest.length === 0) return null;

  const columns = [latest.slice(0, 2), latest.slice(2, 4)];

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Latest" title="News & Announcements" />
          <Link
            href="/news"
            className="group hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary sm:inline-flex"
          >
            View all news
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <div className="mt-8 grid border-t md:grid-cols-2 md:divide-x">
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={cn(
                "flex flex-col divide-y",
                ci === 1 ? "max-md:border-t md:pl-10" : "md:pr-10"
              )}
            >
              {col.map((item) => (
                <div key={item.slug} className="py-6">
                  <NewsListItem {...item} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/news">View all news</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
