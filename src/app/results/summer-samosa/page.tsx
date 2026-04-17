"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventResultsLayout } from "@/components/sections/event-results-layout";
import { ExternalResultsButton } from "@/components/sections/external-results-button";
import { JoinCtaSection } from "@/components/sections/join-cta-section";

const years: readonly number[] = [2025, 2024, 2023, 2022];

function buildResultsUrl(year: number): string {
  const yy = String(year).slice(2);
  return `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa${yy}.clax`;
}

export default function SummerSamosaResultsPage() {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <EventResultsLayout
          title="Summer Samosa"
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
