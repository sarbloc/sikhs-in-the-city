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
    <div className={cn("py-5", className)}>
      <p className="text-lg font-bold uppercase tracking-wide text-primary">
        {name}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {laps} laps | {year}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {distance && (
          <>
            <span className="text-muted-foreground">Total distance:</span>
            <span className="text-muted-foreground">Time</span>
            <span className="font-bold text-foreground">{distance}</span>
            <span className="font-bold text-foreground">{time}</span>
          </>
        )}
        {!distance && (
          <>
            <span className="text-muted-foreground">Time</span>
            <span className="font-bold text-foreground">{time}</span>
          </>
        )}
      </div>
    </div>
  );
}
