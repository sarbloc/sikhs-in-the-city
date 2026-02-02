import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StepCardProps {
  /** Step number (1, 2, 3, etc.) */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
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
    <div className={cn("flex flex-col gap-4", className)}>
      <Badge
        variant="secondary"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-0 text-xl font-bold"
      >
        {stepNumber}
      </Badge>
      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
