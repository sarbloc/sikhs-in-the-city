import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NewsListItemData } from "@/lib/contentful/news";

export function formatNewsDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Tall blog card — used on the /news listing. */
export function NewsCard({
  slug,
  title,
  date,
  thumbnail,
  excerpt,
  className,
}: NewsListItemData & { className?: string }) {
  return (
    <Link
      href={`/news/${slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {thumbnail ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full bg-accent" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <time
          dateTime={date}
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {formatNewsDate(date)}
        </time>
        <h3 className="text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-semibold text-primary">
          Read more
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Compact horizontal item — used in the homepage News section. */
export function NewsListItem({ slug, title, date, thumbnail, excerpt }: NewsListItemData) {
  return (
    <Link href={`/news/${slug}`} className="group flex items-start gap-4">
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg bg-accent sm:w-32">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <time
          dateTime={date}
          className="mt-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {formatNewsDate(date)}
        </time>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
