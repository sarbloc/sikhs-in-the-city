"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface YearDropdownProps {
  /** Years to show in the dropdown (rendered in the order supplied). */
  years: readonly number[];
  /** Currently selected year. */
  value: number;
  /** Called with the newly selected year. */
  onChange: (year: number) => void;
  /** Accessible label. Rendered visually hidden when no `id` is supplied
   * (the component becomes self-labeling). When `id` is supplied, the caller
   * is expected to provide their own visible <label htmlFor={id}>. */
  label?: string;
  /** Optional id — caller should label the select via <label htmlFor={id}>. */
  id?: string;
  /** Additional className on the wrapper. */
  className?: string;
}

/**
 * Styled native <select> for choosing a result year. Kept minimal so it
 * renders the same across browsers and stays friendly on mobile.
 */
export function YearDropdown({
  years,
  value,
  onChange,
  label = "Year",
  id,
  className,
}: YearDropdownProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={cn("inline-block", className)}>
      <select
        id={id}
        aria-label={id ? undefined : label}
        value={value}
        onChange={handleChange}
        className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-xs focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
