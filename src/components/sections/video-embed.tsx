import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  /** Vimeo video ID (the numeric part of a Vimeo URL) */
  videoId: string;
  /** Optional Vimeo privacy hash for unlisted videos (the `h=` query param) */
  hash?: string;
  /** Accessible title for the iframe (required for a11y) */
  title: string;
  /** Optional caption rendered below the video */
  caption?: string;
  /** Additional className applied to the outer wrapper */
  className?: string;
}

export function VideoEmbed({
  videoId,
  hash,
  title,
  caption,
  className,
}: VideoEmbedProps) {
  const src = hash
    ? `https://player.vimeo.com/video/${videoId}?h=${hash}`
    : `https://player.vimeo.com/video/${videoId}`;

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/10 shadow-md">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
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
