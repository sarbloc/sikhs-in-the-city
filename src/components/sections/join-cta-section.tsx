import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JoinCtaSectionProps {
  /** Heading text */
  heading?: string;
  /** Description text */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Additional className */
  className?: string;
}

export function JoinCtaSection({
  heading = "Ready to Start Running?",
  description = "Join our welcoming community and take the first step on your running journey. No experience needed - just bring yourself and we'll do the rest.",
  ctaText = "Join Us Today",
  ctaHref = "/contact",
  className,
}: JoinCtaSectionProps) {
  return (
    <section
      className={cn(
        "bg-primary py-16 text-primary-foreground md:py-24",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
            {description}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
