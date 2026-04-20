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
  /** Main runner image (fits inside the card) */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Hands-only overlay that sits above the card on desktop, aligned with the main image */
  handsImagePath?: string | null;
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
  handsImagePath = "/images/join-runner-hands.png",
  className,
}: JoinCtaSectionProps) {
  return (
    <section className={cn("pt-16 pb-10 md:pt-20 md:pb-14", className)}>
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-secondary md:grid md:grid-cols-[55fr_45fr] md:h-[320px]">
          {/*
            Image column — hands always protrude above the column on both breakpoints.
            md+: card is a fixed 320px tall. Body image is rendered at h-full with natural-aspect width and centred, so it can overflow the column horizontally; an inner wrapper with `overflow-hidden rounded-r-2xl` both clips the horizontal overflow and gives the visible thumbnail rounded right corners matching the card.
            Below md: body renders as a block with natural aspect (full column width). Hands are absolutely positioned above the column via `bottom-full` so they overflow the card's top edge. Both images share the same column width, keeping horizontal scales (and therefore the hands' alignment with the arms) identical.
          */}
          <div className="relative order-first md:order-last md:h-full">
            {handsImagePath && (
              <Image
                src={handsImagePath}
                alt=""
                aria-hidden="true"
                width={1223}
                height={100}
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-full h-auto w-full",
                  "md:inset-x-auto md:left-1/2 md:h-[52px] md:w-auto md:max-w-none md:-translate-x-1/2"
                )}
              />
            )}
            <div className="md:absolute md:inset-0 md:overflow-hidden md:rounded-r-2xl">
              {imagePath && (
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  width={1224}
                  height={630}
                  className={cn(
                    "block h-auto w-full rounded-t-2xl",
                    "md:absolute md:bottom-0 md:left-1/2 md:h-full md:w-auto md:max-w-none md:-translate-x-1/2 md:rounded-none"
                  )}
                />
              )}
            </div>
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
