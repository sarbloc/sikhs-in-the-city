import { PolaroidImage } from "@/components/polaroid-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaLink } from "@/components/ui/cta-link";
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
  "Sikhs In The City (SITC) running club is considered the most diverse running club in the world with members from 9 different faiths and none. It is a grass roots group with Fauja Singh the oldest marathoner in the world as a founder member.",
  "SITC reaches out to anyone interested in any sport but focuses on running and acts as a feeder club to other athletics clubs, retaining a base of enthusiasts who nurture beginners.",
];

export function OurStorySection({
  title = "Our Story",
  paragraphs = defaultParagraphs,
  linkText = "Read the full story",
  linkHref = "/our-story",
  imagePath = "/images/our-story.png",
  imageAlt = "Sikhs In The City runners",
  className,
}: OurStorySectionProps) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
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
            <CtaLink href={linkHref} className="mt-6">
              {linkText}
            </CtaLink>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            {imagePath && (
              <PolaroidImage
                src={imagePath}
                alt={imageAlt}
                width={633}
                height={474}
                rotate={3}
                className="max-w-full"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
