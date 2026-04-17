import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HowToJoinHeroProps {
  /** Hero heading */
  title?: string;
  /** Supporting intro text */
  description?: string;
  /** Background image path */
  backgroundImage?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Additional className */
  className?: string;
}

export function HowToJoinHero({
  title = "Start your running journey",
  description = "Whether you're new to running or looking to go further, we'll support you every step of the way, from your first session to your first race and beyond.",
  backgroundImage = "/images/how-to-join.png",
  ctaText = "Register Your Interest",
  ctaHref = "/contact",
  className,
}: HowToJoinHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-16 md:py-24",
        className,
      )}
    >
      {/* Background photo */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Yellow tint overlay */}
      <div className="absolute inset-0 bg-secondary/70" />

      <div className="container relative z-10 mx-auto">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          {description}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
