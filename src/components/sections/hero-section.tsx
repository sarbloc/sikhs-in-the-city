import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  /** Main heading text */
  heading?: string;
  /** Subheading/tagline text */
  subheading?: string;
  /** Primary CTA button text */
  primaryCta?: string;
  /** Primary CTA link */
  primaryHref?: string;
  /** Secondary CTA button text */
  secondaryCta?: string;
  /** Secondary CTA link */
  secondaryHref?: string;
  /** Background image path */
  backgroundImage?: string;
  /** Additional className */
  className?: string;
}

export function HeroSection({
  heading = "Sikhs In The City",
  subheading = "A community-led running charity bringing people and cultures together through running. From first steps to 10K and beyond.",
  primaryCta = "Join The Run",
  primaryHref = "/how-to-join",
  secondaryCta = "Learn About Us",
  secondaryHref = "/our-story",
  backgroundImage,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[80vh] items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {subheading}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-[180px]">
            <Link href={primaryHref}>{primaryCta}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[180px]">
            <Link href={secondaryHref}>{secondaryCta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
