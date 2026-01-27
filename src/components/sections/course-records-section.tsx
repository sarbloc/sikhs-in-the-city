import { SectionHeading } from "@/components/ui/section-heading";
import { RecordCategory } from "./record-category";
import { cn } from "@/lib/utils";

interface Record {
  name: string;
  time: string;
}

interface CategoryRecord {
  category: string;
  male?: Record;
  female?: Record;
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
    category: "5K",
    male: { name: "Harpreet Singh", time: "18:24" },
    female: { name: "Simran Kaur", time: "21:45" },
  },
  {
    category: "10K",
    male: { name: "Jaspreet Singh", time: "38:12" },
    female: { name: "Gurleen Kaur", time: "44:30" },
  },
  {
    category: "Half Marathon",
    male: { name: "Manpreet Singh", time: "1:22:45" },
    female: { name: "Harleen Kaur", time: "1:38:20" },
  },
  {
    category: "Marathon",
    male: { name: "Rajinder Singh", time: "2:58:30" },
    female: { name: "Amandeep Kaur", time: "3:28:15" },
  },
];

export function CourseRecordsSection({
  title = "Course Records",
  description = "Celebrating our fastest runners. These are the club records set by our members across different distances.",
  records = defaultRecords,
  className,
}: CourseRecordsSectionProps) {
  return (
    <section className={cn("bg-muted/30 py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <SectionHeading title={title} description={description} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {records.map((record, index) => (
            <RecordCategory
              key={index}
              category={record.category}
              male={record.male}
              female={record.female}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
