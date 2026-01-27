import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small text displayed above the title */
  eyebrow?: string;
  /** Main section title */
  title: string;
  /** Optional description text below the title */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Additional className for the container */
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
