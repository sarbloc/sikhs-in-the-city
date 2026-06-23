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
 * results. Each results page mounts this with a per-event `key`, so navigating
 * between results pages remounts it fresh (newest year) rather than leaking the
 * previous page's selection.
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
