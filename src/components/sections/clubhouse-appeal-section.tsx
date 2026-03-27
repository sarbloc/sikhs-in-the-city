import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClubhouseAppealSectionProps {
  /** Section title */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
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
  /** Circular image path */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional className */
  className?: string;
}

export function ClubhouseAppealSection({
  title = "Fauja Singh\nClubhouse Appeal",
  subtitle = "A Project to honour Fauja Singh BEM",
  description = "We're working to build an eco-friendly community clubhouse that supports health, wellbeing, and connection. With your support, we can turn this vision into a lasting space for the local community.",
  primaryCtaText = "Donate Now",
  primaryCtaHref = "/donate",
  secondaryCtaText = "Find Out More",
  secondaryCtaHref = "/clubhouse-appeal",
  imagePath = "/images/hero/slide-2.jpg",
  imageAlt = "Fauja Singh running",
  className,
}: ClubhouseAppealSectionProps) {
  return (
    <section
      className={cn("py-10 md:py-14", className)}
    >
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-blue-200 px-8 py-12 md:px-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Text content */}
            <div>
              <h2 className="whitespace-pre-line text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-sm font-bold text-foreground">
                {subtitle}
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                {description}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link href={primaryCtaHref}>{primaryCtaText}</Link>
                </Button>
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground"
                >
                  {secondaryCtaText} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Circular image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative h-64 w-80 overflow-hidden bg-blue-300 md:h-72 md:w-96" style={{ borderRadius: "60% 40% 45% 55% / 50% 55% 45% 50%" }}>
                {imagePath && (
                  <Image
                    src={imagePath}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
