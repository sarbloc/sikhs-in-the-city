import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  /** YouTube video ID (the part after `v=` in a YouTube URL) */
  videoId: string;
  /** Accessible title for the iframe (required for a11y) */
  title: string;
  /** Optional caption rendered below the video */
  caption?: string;
  /** Additional className applied to the outer wrapper */
  className?: string;
}

/**
 * VideoEmbed — responsive 16:9 YouTube iframe wrapper with optional caption.
 *
 * The iframe uses youtube-nocookie to minimise third-party tracking and
 * always includes a `title` attribute for screen readers.
 */
export function VideoEmbed({
  videoId,
  title,
  caption,
  className,
}: VideoEmbedProps) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/10 shadow-md">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption ? (
        <figcaption className="text-center text-sm font-medium text-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
