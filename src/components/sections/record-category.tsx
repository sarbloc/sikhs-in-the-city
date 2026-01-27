import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecordHolder } from "./record-holder";
import { cn } from "@/lib/utils";

interface Record {
  name: string;
  time: string;
}

interface RecordCategoryProps {
  /** Category name (e.g., "5K", "10K") */
  category: string;
  /** Male record holder */
  male?: Record;
  /** Female record holder */
  female?: Record;
  /** Additional className */
  className?: string;
}

export function RecordCategory({
  category,
  male,
  female,
  className,
}: RecordCategoryProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {male && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Male
            </p>
            <RecordHolder name={male.name} time={male.time} />
          </div>
        )}
        {female && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Female
            </p>
            <RecordHolder name={female.name} time={female.time} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
