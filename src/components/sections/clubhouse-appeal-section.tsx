import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClubhouseAppealSectionProps {
  /** Section title */
  title?: string;
  /** Description text */
  description?: string;
  /** Primary CTA text */
  primaryCtaText?: string;
  /** Primary CTA href */
  primaryCtaHref?: string;
  /** Secondary CTA text */
  secondaryCtaText?: string;
  /** Secondary CTA href */
  secondaryCtaHref?: string;
  /** Additional className */
  className?: string;
}

export function ClubhouseAppealSection({
  title = "Support Our Clubhouse Appeal",
  description = "We're raising funds to build a dedicated clubhouse for our community. A permanent home will allow us to offer more training sessions, store equipment, and provide a welcoming space for runners of all abilities. Your support makes a real difference.",
  primaryCtaText = "Donate Now",
  primaryCtaHref = "/donate",
  secondaryCtaText = "Learn More",
  secondaryCtaHref = "/clubhouse-appeal",
  className,
}: ClubhouseAppealSectionProps) {
  return (
    <section
      className={cn(
        "bg-primary py-16 text-primary-foreground md:py-24",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
            >
              <Link href={primaryCtaHref}>{primaryCtaText}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
