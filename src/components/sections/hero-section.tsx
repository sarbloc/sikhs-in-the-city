"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HeroSlide {
  /** Main heading text */
  heading: string;
  /** Subheading/tagline text */
  subheading: string;
  /** Background image path */
  backgroundImage?: string;
  /** Primary CTA button text */
  primaryCta?: string;
  /** Primary CTA link */
  primaryHref?: string;
  /** Secondary CTA button text */
  secondaryCta?: string;
  /** Secondary CTA link */
  secondaryHref?: string;
}

interface HeroSectionProps {
  /** Array of slides */
  slides?: HeroSlide[];
  /** Additional className */
  className?: string;
}

const defaultSlides: HeroSlide[] = [
  {
    heading: "Sikhs In The City",
    subheading:
      "A community-led running charity bringing people and cultures together through running. From first steps to 10K and beyond.",
    primaryCta: "Join The Run",
    primaryHref: "/how-to-join",
    secondaryCta: "Learn About Us",
    secondaryHref: "/our-story",
  },
  {
    heading: "Run With Purpose",
    subheading:
      "Join our welcoming community every Sunday morning. No experience needed – just bring yourself and we'll do the rest.",
    primaryCta: "Get Started",
    primaryHref: "/how-to-join",
    secondaryCta: "View Events",
    secondaryHref: "/events",
  },
  {
    heading: "From Couch to 10K",
    subheading:
      "Whether you're taking your first steps or training for a marathon, our experienced coaches will support you every step of the way.",
    primaryCta: "See Training",
    primaryHref: "/training",
    secondaryCta: "Contact Us",
    secondaryHref: "/contact",
  },
];

export function HeroSection({
  slides = defaultSlides,
  className,
}: HeroSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className={cn("relative", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={cn(
                  "relative flex min-h-[80vh] items-center overflow-hidden",
                  !slide.backgroundImage && "bg-muted"
                )}
              >
                {/* Background Image */}
                {slide.backgroundImage && (
                  <Image
                    src={slide.backgroundImage}
                    alt=""
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 py-20">
                  <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.heading}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    {slide.subheading}
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    {slide.primaryCta && (
                      <Button asChild size="lg" className="min-w-[180px]">
                        <Link href={slide.primaryHref || "#"}>
                          {slide.primaryCta}
                        </Link>
                      </Button>
                    )}
                    {slide.secondaryCta && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="min-w-[180px]"
                      >
                        <Link href={slide.secondaryHref || "#"}>
                          {slide.secondaryCta}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 border-none bg-background/50 hover:bg-background/80" />
        <CarouselNext className="right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 border-none bg-background/50 hover:bg-background/80" />

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                current === index
                  ? "w-8 bg-primary"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
