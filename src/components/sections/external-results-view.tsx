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
  const selected = yearLinks.find((l) => l.year === selectedYear) ?? yearLinks[0];

  return (
    <EventResultsLayout
      title={title}
      years={years}
      selectedYear={selectedYear}
      onYearChange={setSelectedYear}
    >
      {selected && <ExternalResultsButton href={selected.url} />}
    </EventResultsLayout>
  );
}
