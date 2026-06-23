"use client";

import { useState } from "react";
import { EventResultsLayout } from "./event-results-layout";
import { ExternalResultsButton } from "./external-results-button";
import type { ResultsYearLink } from "@/lib/contentful/results";

interface ExternalResultsViewProps {
  title: string;
  yearLinks: ResultsYearLink[];
}

/**
 * Client view for an external-results event: owns the selected-year state and
 * renders the year dropdown plus a button linking to that year's external
 * results page.
 */
export function ExternalResultsView({ title, yearLinks }: ExternalResultsViewProps) {
  const years = yearLinks.map((l) => l.year);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  // Guard against stale state leaking in if React reuses this instance across
  // the two external-results routes: fall back to the newest year when the
  // current selection isn't valid for this event.
  const activeYear = years.includes(selectedYear) ? selectedYear : years[0];
  const selected = yearLinks.find((l) => l.year === activeYear) ?? yearLinks[0];

  return (
    <EventResultsLayout
      title={title}
      years={years}
      selectedYear={activeYear}
      onYearChange={setSelectedYear}
    >
      {selected && <ExternalResultsButton href={selected.url} />}
    </EventResultsLayout>
  );
}
