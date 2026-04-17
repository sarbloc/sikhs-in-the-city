import { cn } from "@/lib/utils";

interface MapEmbedProps {
  /** Accessible title for the iframe */
  title: string;
  /** Google Maps embed URL (src for the iframe) */
  src: string;
  /** Aspect ratio class (e.g. "aspect-[16/9]"). Defaults to 16:9. */
  aspectRatio?: string;
  /** Additional className for the outer wrapper */
  className?: string;
}

/**
 * MapEmbed — responsive wrapper around a Google Maps iframe.
 * Used on the Contact page and the Clubhouse Appeal page.
 */
export function MapEmbed({
  title,
  src,
  aspectRatio = "aspect-[16/9]",
  className,
}: MapEmbedProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-muted",
        aspectRatio,
        className
      )}
    >
      <iframe
        title={title}
        aria-label={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
