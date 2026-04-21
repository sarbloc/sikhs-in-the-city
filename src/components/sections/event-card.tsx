import Image from "next/image";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/utils";

interface EventCardProps {
  /** Event title */
  title: string;
  /** Event description */
  description: string;
  /** Event date string */
  date: string;
  /** Image path */
  imagePath?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Link to event details */
  href?: string;
  /** Link text */
  linkText?: string;
  /** Additional className */
  className?: string;
}

export function EventCard({
  title,
  description,
  date,
  imagePath,
  imageAlt = "",
  href = "#",
  linkText = "Sign Up Now",
  className,
}: EventCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Background image */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        {imagePath && (
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        {/* All content overlaid on image */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <time className="text-sm text-white/90">{date}</time>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {description}
          </p>
          <CtaLink href={href} variant="inverse" className="mt-3">
            {linkText}
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
