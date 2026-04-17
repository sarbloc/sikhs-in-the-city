"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventResultsLayout } from "@/components/sections/event-results-layout";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { ResultsTable } from "@/components/ui/results-table";
import {
  faujaSinghResults,
  faujaSinghYears,
} from "@/data/fauja-singh-results";

const columns = [
  { key: "name", label: "Name" },
  { key: "laps", label: "Laps" },
  { key: "distance", label: "Distance (km)" },
  { key: "time", label: "Time" },
];

export default function FaujaSinghResultsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(faujaSinghYears[0]);
  const rows = faujaSinghResults[selectedYear] ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <EventResultsLayout
          title="Fauja Singh Birthday Challenge"
          years={faujaSinghYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        >
          {rows.length > 0 ? (
            <ResultsTable
              columns={columns}
              rows={rows.map((row) => ({
                name: row.name,
                laps: row.laps,
                distance: row.distance,
                time: row.time,
              }))}
              caption={`Fauja Singh Birthday Challenge ${selectedYear} results`}
            />
          ) : (
            <p className="text-muted-foreground">
              Results for {selectedYear} not yet available.
            </p>
          )}
        </EventResultsLayout>
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
