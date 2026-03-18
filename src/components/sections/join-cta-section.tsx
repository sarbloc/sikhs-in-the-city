import Image from "next/image";
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
  /** Optional image path */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional className */
  className?: string;
}

export function JoinCtaSection({
  heading = "Join Sikhs In the City",
  description = "Ready to start running with a supportive community? Register your interest and we'll share the details for Sunday morning training.",
  ctaText = "Register Interest",
  ctaHref = "/contact",
  imagePath,
  imageAlt = "Sikhs In The City runners",
  className,
}: JoinCtaSectionProps) {
  return (
    <section
      className={cn("py-10 md:py-14", className)}
    >
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-secondary px-8 py-12 md:px-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Text content */}
            <div>
              <h2 className="text-3xl font-bold italic tracking-tight text-secondary-foreground md:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-secondary-foreground/80">
                {description}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6"
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            </div>

            {/* Image placeholder */}
            <div className="flex justify-center md:justify-end">
              <div className="relative h-48 w-48 overflow-hidden rounded-lg bg-secondary-foreground/10 md:h-56 md:w-56">
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
