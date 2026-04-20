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
            Image column — two responsive modes:
              - Below md: stacked; body and hands both `w-full h-auto`, natural aspect, share horizontal scale.
              - md+: card has a fixed 320px height. Body and hands are absolutely positioned, rendered at the card's fixed height and their natural-aspect width (so the width is ~621px when body=320px), horizontally centred. The column uses `overflow-x-clip` so the images can bleed sideways without touching the text column. Because both images share the same horizontal scale at every viewport width, the hands always line up with the arms.
          */}
          <div className="relative order-first md:order-last md:h-full md:overflow-x-clip md:rounded-r-2xl">
            {handsImagePath && (
              <Image
                src={handsImagePath}
                alt=""
                aria-hidden="true"
                width={1223}
                height={100}
                className={cn(
                  "pointer-events-none block h-auto w-full",
                  "md:absolute md:bottom-full md:left-1/2 md:h-[52px] md:w-auto md:max-w-none md:-translate-x-1/2"
                )}
              />
            )}
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
