import { cn } from "@/lib/utils";

interface RecordHolderProps {
  /** Runner's name */
  name: string;
  /** Number of laps */
  laps: number;
  /** Total distance */
  distance?: string;
  /** Completion time */
  time: string;
  /** Year achieved */
  year: number;
  /** Additional className */
  className?: string;
}

export function RecordHolder({
  name,
  laps,
  distance,
  time,
  year,
  className,
}: RecordHolderProps) {
  return (
    <div className={cn("py-4", className)}>
      <p className="text-sm font-bold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">
        The record held at {laps} lap
      </p>
      <div className="mt-2 space-y-1">
        {distance && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Total distance:</span>
            <span className="text-foreground">{distance}</span>
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Time:</span>
          <span className="text-foreground">{time}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Achieved in:</span>
          <span className="text-foreground">{year}</span>
        </div>
      </div>
    </div>
  );
}
