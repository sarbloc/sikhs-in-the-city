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
        <div className="relative rounded-2xl bg-secondary md:grid md:grid-cols-[55fr_45fr]">
          {/* Image column — body and hands both render at the column width with natural aspect (h-auto), so their horizontal scale matches at every viewport and the hands stay aligned with the arms */}
          <div className="relative order-first md:order-last md:self-end">
            {handsImagePath && (
              <Image
                src={handsImagePath}
                alt=""
                aria-hidden="true"
                width={1223}
                height={100}
                className="pointer-events-none absolute inset-x-0 bottom-full hidden h-auto w-full md:block"
              />
            )}
            {imagePath && (
              <Image
                src={imagePath}
                alt={imageAlt}
                width={1224}
                height={630}
                className="block h-auto w-full rounded-t-2xl md:rounded-t-none md:rounded-r-2xl md:rounded-bl-none"
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
