import Image from "next/image";
import Link from "next/link";
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
    <div className={cn("overflow-hidden rounded-lg", className)}>
      {/* Image with overlay text */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        {imagePath && (
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Title and date on image */}
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <time className="text-sm text-white/90">{date}</time>
        </div>
      </div>
      {/* Description and link below */}
      <div className="space-y-3 py-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-bold text-foreground"
        >
          {linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
