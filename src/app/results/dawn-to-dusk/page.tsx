"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventResultsLayout } from "@/components/sections/event-results-layout";
import { ExternalResultsButton } from "@/components/sections/external-results-button";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

// Oldest event first is cleaner when read aloud, but the dropdown is
// typically showing most-recent first for usability.
const years: readonly number[] = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
];

function buildResultsUrl(year: number): string {
  const yy = String(year).slice(2);
  return `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d${yy}.clax`;
}

export default function DawnToDuskResultsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <EventResultsLayout
          title="Dawn To Dusk"
          years={years}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        >
          <ExternalResultsButton href={buildResultsUrl(selectedYear)} />
        </EventResultsLayout>
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
