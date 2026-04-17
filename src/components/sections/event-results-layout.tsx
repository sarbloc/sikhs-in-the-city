"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { YearDropdown } from "@/components/sections/year-dropdown";
import { cn } from "@/lib/utils";

interface EventResultsLayoutProps {
  /** Title shown in the page hero. */
  title: string;
  /** Optional background photo for the hero. */
  heroImage?: string;
  /** Years to show in the dropdown. */
  years: readonly number[];
  /** Currently selected year. */
  selectedYear: number;
  /** Called with the newly selected year. */
  onYearChange: (year: number) => void;
  /** Content shown below the dropdown (table, button, or empty state). */
  children: ReactNode;
  /** Additional className on the outer wrapper. */
  className?: string;
}

/**
 * Presentational shell for the three event results pages.
 *
 * Renders a page hero (title + optional photo background) and a body panel
 * with the year dropdown and a content slot. State (selectedYear) is owned
 * by the parent page so each page decides how to render the slot.
 */
export function EventResultsLayout({
  title,
  heroImage,
  years,
  selectedYear,
  onYearChange,
  children,
  className,
}: EventResultsLayoutProps) {
  return (
    <div className={cn(className)}>
      <section className="relative overflow-hidden bg-blue-950 px-4 py-16 md:py-24">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              className="object-cover opacity-40"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-blue-950/60"
              aria-hidden="true"
            />
          </>
        )}
        <div className="relative container mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-col gap-2">
            <label
              htmlFor="year-dropdown"
              className="text-sm font-medium text-foreground"
            >
              Select the year to view the results
            </label>
            <YearDropdown
              id="year-dropdown"
              years={years}
              value={selectedYear}
              onChange={onYearChange}
            />
          </div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  );
}
