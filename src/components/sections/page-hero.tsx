import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  /** Optional background image path. When set, the title bar becomes a
   * full-width photo hero with a blue overlay for contrast. */
  backgroundImage?: string;
  /** Alt text for the background image. Decorative by default. */
  backgroundImageAlt?: string;
  className?: string;
}

export function PageHero({
  title,
  description,
  ctaText = "Register Your Interest",
  ctaHref = "/contact",
  backgroundImage,
  backgroundImageAlt = "",
  className,
}: PageHeroProps) {
  if (backgroundImage) {
    return (
      <section
        className={cn(
          "relative overflow-hidden px-4 py-20 md:py-28",
          className
        )}
      >
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          priority
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blue-950/70"
        />
        <div className="container relative z-10 mx-auto">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {description}
          </p>
          <Button asChild variant="secondary" size="lg" className="mt-8">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </section>
    );
  }

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
