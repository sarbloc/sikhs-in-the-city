import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  /** Lucide icon rendered inside the yellow circle */
  icon: LucideIcon;
  /** Text content shown to the right of the icon */
  children: ReactNode;
  /** Additional className applied to the outer row */
  className?: string;
}

/**
 * InfoRow — yellow filled circle with a lucide icon, paired with
 * free-form text to the right. Used on the Contact page for the
 * training meeting point (location pin + address, clock + time).
 */
export function InfoRow({ icon: Icon, children, className }: InfoRowProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary">
        <Icon className="size-5 text-foreground" aria-hidden="true" />
      </span>
      <div className="text-base text-foreground">{children}</div>
    </div>
  );
}
