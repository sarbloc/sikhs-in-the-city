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
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      {/* Header */}
      <div className="bg-blue-200 px-4 py-5 text-center">
        <h3 className="text-lg font-bold text-foreground">{category}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {requirement}
        </p>
      </div>
      {/* Record holders */}
      <div className="divide-y px-4 py-4">
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
