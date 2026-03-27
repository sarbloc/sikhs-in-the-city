import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function PageHero({
  title,
  description,
  ctaText = "Register Your Interest",
  ctaHref = "/contact",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("bg-blue-950 px-4 py-16 md:py-24", className)}>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80">
          {description}
        </p>
        <Button asChild variant="secondary" size="lg" className="mt-8">
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
