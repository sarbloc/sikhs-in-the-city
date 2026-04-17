import Image from "next/image";
import { cn } from "@/lib/utils";

interface PolaroidImageProps {
  /** Image source (local path or remote URL) */
  src: string;
  /** Accessible alt text */
  alt: string;
  /** Intrinsic image width in pixels */
  width: number;
  /** Intrinsic image height in pixels */
  height: number;
  /** Rotation in degrees. Defaults to -2 for a gentle tilt */
  rotate?: number;
  /** Additional className applied to the outer polaroid frame */
  className?: string;
}

/**
 * PolaroidImage — white-framed tilted photo with a soft drop shadow.
 *
 * The frame has slightly thicker padding at the bottom to mimic a real
 * polaroid. Consumers control layout (single, cluster, overlap) by
 * composing multiple `PolaroidImage`s in a parent; this component stays
 * simple and self-contained.
 */
export function PolaroidImage({
  src,
  alt,
  width,
  height,
  rotate = -2,
  className,
}: PolaroidImageProps) {
  return (
    <div
      className={cn(
        "inline-block bg-white p-3 pb-8 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.4)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="block h-auto w-full"
      />
    </div>
  );
}
