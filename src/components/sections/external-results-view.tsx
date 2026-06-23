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
  // Identity of this event's year set. When it changes (e.g. client-side nav
  // reuses this instance for the other results page), the selection resets to
  // the newest year instead of leaking the previous page's choice — even if the
  // previous year also exists in the new event.
  const yearsKey = years.join(",");
  const [picked, setPicked] = useState<{ key: string; year: number }>({
    key: yearsKey,
    year: years[0],
  });
  const selectedYear = picked.key === yearsKey ? picked.year : years[0];
  const selected = yearLinks.find((l) => l.year === selectedYear) ?? yearLinks[0];

  return (
    <EventResultsLayout
      title={title}
      years={years}
      selectedYear={selectedYear}
      onYearChange={(year) => setPicked({ key: yearsKey, year })}
    >
      {selected && <ExternalResultsButton href={selected.url} />}
    </EventResultsLayout>
  );
}
