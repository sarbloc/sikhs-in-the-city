import { cn } from "@/lib/utils";

interface RecordHolderProps {
  /** Runner's name */
  name: string;
  /** Record time */
  time: string;
  /** Additional className */
  className?: string;
}

export function RecordHolder({ name, time, className }: RecordHolderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="font-mono text-sm font-bold text-primary">{time}</span>
    </div>
  );
}
