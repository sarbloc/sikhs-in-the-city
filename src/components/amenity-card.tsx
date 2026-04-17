import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AmenityCardProps {
  /** Lucide icon rendered inside the yellow circle */
  icon: LucideIcon;
  /** Short label, rendered uppercase and bold */
  label: string;
  /** Supporting description text */
  description: string;
  /** Additional className applied to the card */
  className?: string;
}

/**
 * AmenityCard — light-grey rounded card with a yellow icon circle,
 * uppercase label, and muted description. Designed for the Clubhouse
 * Appeal amenities grid.
 */
export function AmenityCard({
  icon: Icon,
  label,
  description,
  className,
}: AmenityCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl bg-muted p-8 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Icon className="size-6 text-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-base font-bold uppercase tracking-wide text-foreground">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
