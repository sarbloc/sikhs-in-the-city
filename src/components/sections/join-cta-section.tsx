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
  ctaText = "Register Your Interest",
  ctaHref = "/contact",
  imagePath = "/images/join-runner.png",
  imageAlt = "Sikhs In The City runner celebrating at a marathon finish line",
  className,
}: JoinCtaSectionProps) {
  return (
    <section className={cn("pt-24 pb-10 md:pt-32 md:pb-14", className)}>
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-secondary md:grid md:grid-cols-[55fr_45fr] md:min-h-[280px]">
          {/* Image column — anchored to card bottom, extends 120px above the top edge on desktop */}
          <div className="relative order-first aspect-[5/3] w-full md:order-last md:aspect-auto md:h-full">
            {imagePath && (
              <div className="absolute inset-x-0 bottom-0 top-0 md:top-[-120px]">
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            )}
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
            <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground md:text-3xl">
              {heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/80 md:text-base">
              {description}
            </p>
            <Button asChild className="mt-5 self-start">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
