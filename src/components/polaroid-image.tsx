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
  /**
   * How the image fills the polaroid frame.
   * - `natural` (default): image renders at its own aspect, frame sizes to fit.
   * - `cover`: frame is a fixed `width×height` box and the image is cropped via `object-cover`.
   */
  fit?: "natural" | "cover";
  /** Additional className applied to the outer polaroid frame */
  className?: string;
}

export function PolaroidImage({
  src,
  alt,
  width,
  height,
  rotate = -2,
  fit = "natural",
  className,
}: PolaroidImageProps) {
  return (
    <div
      className={cn(
        "inline-block bg-white p-2 shadow-[0_0_12px_0_rgba(0,0,0,0.15)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {fit === "cover" ? (
        <div className="relative block" style={{ width, height }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${width}px`}
            className="object-cover"
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full"
        />
      )}
    </div>
  );
}
