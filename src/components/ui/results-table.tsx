import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ResultsTableColumn {
  /** Unique key, used to look up cell values in each row */
  key: string;
  /** Column header label */
  label: string;
  /** Optional additional className applied to the header cell and each body cell in this column */
  className?: string;
}

export interface ResultsTableProps {
  /** Column definitions rendered in the header row */
  columns: ResultsTableColumn[];
  /** Row data. Each row is a map of column key -> cell content */
  rows: Record<string, ReactNode>[];
  /** Optional caption for accessibility (visually hidden) */
  caption?: string;
  /** Additional className applied to the scroll wrapper */
  className?: string;
}

/**
 * ResultsTable — blue header row, alternating row backgrounds, hover highlight.
 *
 * Matches the table-component mock: uppercase white headers on brand blue,
 * subtle striped rows, and a yellow hover highlight with bold text on hover.
 * The wrapper is horizontally scrollable on narrow viewports.
 */
export function ResultsTable({
  columns,
  rows,
  caption,
  className,
}: ResultsTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-6 py-4 text-xs font-semibold uppercase tracking-wider",
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border transition-colors even:bg-muted/40 hover:bg-yellow-100 hover:font-bold"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("px-6 py-4 text-foreground", col.className)}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
