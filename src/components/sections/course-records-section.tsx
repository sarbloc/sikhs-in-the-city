import { RecordCategory } from "./record-category";
import { cn } from "@/lib/utils";

interface RecordHolder {
  name: string;
  laps: number;
  distance?: string;
  time: string;
  year: number;
}

interface CategoryRecord {
  category: string;
  requirement: string;
  holders: RecordHolder[];
}

interface CourseRecordsSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Records by category */
  records?: CategoryRecord[];
  /** Additional className */
  className?: string;
}

const defaultRecords: CategoryRecord[] = [
  {
    category: "Ultra",
    requirement:
      "To receive the Ultra Marathon medal the participants will have to complete 25 or more laps (minimum 50k)",
    holders: [
      { name: "Jose Rodriguez", laps: 50, distance: "100.7 km", time: "7h 28:01", year: 2023 },
      { name: "Toni McIntosh", laps: 41, distance: "82.57 km", time: "7h48:19", year: 2019 },
    ],
  },
  {
    category: "Marathon",
    requirement:
      "To receive the Marathon medal the participants will have to complete 21 laps (Total distance of 42k)",
    holders: [
      { name: "Lee Rodgers", laps: 50, time: "2h 42:16", year: 2025 },
      { name: "Charley Jennings", laps: 41, time: "3h 36:31", year: 2023 },
    ],
  },
  {
    category: "Half Marathon",
    requirement:
      "To receive the Half Marathon medal the participants will have to complete 11 laps (Total distance of 22k)",
    holders: [
      { name: "Paul Quinton", laps: 50, distance: "100.7 km", time: "7h 28:01", year: 2023 },
      { name: "Hilary Wood", laps: 41, distance: "82.57 km", time: "7h48:19", year: 2019 },
    ],
  },
  {
    category: "10K",
    requirement:
      "To receive the 10k medal the participants will have to complete 5 laps",
    holders: [
      { name: "Gary Towers", laps: 50, distance: "100.7 km", time: "7h 28:01", year: 2023 },
      { name: "Sharon Wright", laps: 41, distance: "82.57 km", time: "7h48:19", year: 2019 },
    ],
  },
];

export function CourseRecordsSection({
  title = "Dawn To Dusk Course Records",
  description = "Record completion times for the Ultra, Marathon, Half Marathon, and 10k",
  records = defaultRecords,
  className,
}: CourseRecordsSectionProps) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-center text-base text-muted-foreground">
            {description}
          </p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {records.map((record, index) => (
            <RecordCategory
              key={index}
              category={record.category}
              requirement={record.requirement}
              holders={record.holders}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
