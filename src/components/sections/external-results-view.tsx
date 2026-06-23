"use client";

import { useState } from "react";
import { EventResultsLayout } from "./event-results-layout";
import { ExternalResultsButton } from "./external-results-button";
import type { ResultsYearLink } from "@/lib/contentful/results";

interface ExternalResultsViewProps {
  /**
   * Stable event identity (slug). Used to reset the year selection when the
   * component is reused for a different event during client-side navigation —
   * keyed on identity, not the year list, so two events that happen to share
   * the same years still reset.
   */
  eventId: string;
  title: string;
  yearLinks: ResultsYearLink[];
}

export function ExternalResultsView({ eventId, title, yearLinks }: ExternalResultsViewProps) {
  const years = yearLinks.map((l) => l.year);
  const [picked, setPicked] = useState<{ eventId: string; year: number }>({
    eventId,
    year: years[0],
  });
  const selectedYear = picked.eventId === eventId ? picked.year : years[0];
  const selected = yearLinks.find((l) => l.year === selectedYear) ?? yearLinks[0];

  return (
    <EventResultsLayout
      title={title}
      years={years}
      selectedYear={selectedYear}
      onYearChange={(year) => setPicked({ eventId, year })}
    >
      {selected && <ExternalResultsButton href={selected.url} />}
    </EventResultsLayout>
  );
}
