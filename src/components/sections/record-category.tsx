import { RecordHolder } from "./record-holder";
import { cn } from "@/lib/utils";

interface RecordHolderData {
  name: string;
  laps: number;
  distance?: string;
  time: string;
  year: number;
}

interface RecordCategoryProps {
  /** Category name (e.g., "Ultra", "Marathon") */
  category: string;
  /** Medal requirement description */
  requirement: string;
  /** Record holders */
  holders: RecordHolderData[];
  /** Additional className */
  className?: string;
}

export function RecordCategory({
  category,
  requirement,
  holders,
  className,
}: RecordCategoryProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Blue header card */}
      <div className="rounded-lg bg-primary px-4 py-8 text-center shadow-sm">
        <h3 className="text-3xl font-bold text-primary-foreground">
          {category}
        </h3>
        <p className="mt-2 text-sm text-primary-foreground/90">{requirement}</p>
      </div>
      {/* White content card */}
      <div className="divide-y divide-border rounded-lg bg-card px-5 shadow-sm">
        {holders.map((holder, index) => (
          <RecordHolder
            key={index}
            name={holder.name}
            laps={holder.laps}
            distance={holder.distance}
            time={holder.time}
            year={holder.year}
          />
        ))}
      </div>
    </div>
  );
}
