import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface OurStorySectionProps {
  /** Section title */
  title?: string;
  /** Story content paragraphs */
  paragraphs?: string[];
  /** Link text for "read more" */
  linkText?: string;
  /** Link href */
  linkHref?: string;
  /** Optional image path */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional className */
  className?: string;
}

const defaultParagraphs = [
  "Sikhs In the City is a community-led running charity founded over a decade ago, inspired by the legacy of Fauja Singh and a small group of runners who proved that age, background, and experience should never be barriers to getting active.",
  "Based in East London, we bring people and cultures together through running, supporting beginners, training members towards events like 10K and marathons, and raising funds for charitable causes along the way. At our heart, we're about showing up, running together, and building stronger communities.",
];

export function OurStorySection({
  title = "Our Story",
  paragraphs = defaultParagraphs,
  linkText = "Read the full story",
  linkHref = "/our-story",
  imagePath,
  imageAlt = "Sikhs In The City runners",
  className,
}: OurStorySectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Content */}
          <div>
            <SectionHeading title={title} />
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Button asChild variant="ghost" className="mt-6 -ml-4">
              <Link href={linkHref}>{linkText} →</Link>
            </Button>
          </div>

          {/* Image */}
          {imagePath && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={imagePath}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
