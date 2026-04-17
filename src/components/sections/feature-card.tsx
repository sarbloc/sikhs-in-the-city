import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  /** Card heading */
  title: string;
  /** Supporting body copy */
  description: string;
  /** Destination for the arrow link */
  href: string;
  /** Optional link label; defaults to "Find Out More →" */
  linkText?: string;
  /** Additional className applied to the outer card */
  className?: string;
}

/**
 * FeatureCard — blue panel with heading, body, and an arrow link.
 *
 * Used on the Our Story page to highlight the Clubhouse Appeal and the
 * events programme. Kept presentational so callers own the grid layout.
 */
export function FeatureCard({
  title,
  description,
  href,
  linkText = "Find Out More →",
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl bg-blue-600 p-8 text-white md:p-10",
        className,
      )}
    >
      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
      <p className="mt-4 flex-1 text-base leading-relaxed text-white/85 md:text-lg">
        {description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center text-base font-semibold text-white underline-offset-4 hover:underline md:text-lg"
      >
        {linkText}
      </Link>
    </article>
  );
}
