"use client";

import { useState } from "react";
import { EventResultsLayout } from "./event-results-layout";
import { ResultsTable } from "@/components/ui/results-table";
import type { FaujaYearResults } from "@/lib/contentful/fauja-results";

const columns = [
  { key: "name", label: "Name" },
  { key: "laps", label: "Laps" },
  { key: "distance", label: "Distance (km)" },
  { key: "time", label: "Time" },
];

interface FaujaResultsViewProps {
  years: FaujaYearResults[];
}

/**
 * Client view for the Fauja Singh Birthday Challenge results: owns the
 * year-dropdown state and renders that year's table, an empty state, or an
 * editor-facing error state when the year's CSV couldn't be loaded.
 */
export function FaujaResultsView({ years }: FaujaResultsViewProps) {
  const yearNumbers = years.map((y) => y.year);
  const [selectedYear, setSelectedYear] = useState<number>(yearNumbers[0]);
  const selected = years.find((y) => y.year === selectedYear) ?? years[0];

  return (
    <EventResultsLayout
      title="Fauja Singh Birthday Challenge"
      years={yearNumbers}
      selectedYear={selected.year}
      onYearChange={setSelectedYear}
    >
      {selected.error ? (
        <p className="text-muted-foreground">
          Results for {selected.year} couldn&rsquo;t be loaded — please check the
          CSV file attached to that year in Contentful.
        </p>
      ) : selected.rows.length > 0 ? (
        <ResultsTable
          columns={columns}
          rows={selected.rows.map((row) => ({
            name: row.name,
            laps: row.laps,
            distance: row.distance,
            time: row.time,
          }))}
          caption={`Fauja Singh Birthday Challenge ${selected.year} results`}
        />
      ) : (
        <p className="text-muted-foreground">
          Results for {selected.year} not yet available.
        </p>
      )}
    </EventResultsLayout>
  );
}
