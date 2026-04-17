import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  /** Step number (1, 2, 3, etc.) */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Step description */
  description: ReactNode;
  /** Additional className */
  className?: string;
}

export function StepCard({
  stepNumber,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "relative mt-8 flex flex-col items-center gap-3 rounded-xl bg-white px-6 pt-12 pb-8 text-center shadow-sm",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-secondary-foreground shadow-md"
      >
        {stepNumber}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
