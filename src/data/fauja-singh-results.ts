/** A single row in the Fauja Singh Birthday Challenge results table. */
export interface ResultRow {
  name: string;
  laps: number;
  distance: string;
  time: string;
}

/**
 * Years (descending) for which the Fauja Singh Birthday Challenge has run.
 * Only 2025 has data in this file; other years are placeholders pending import.
 */
export const faujaSinghYears = [2025, 2022, 2021, 2019] as const;

/**
 * Results keyed by year. Empty arrays render an empty-state on the page.
 * Real data for 2022/2021/2019 will land once the CSV/spreadsheet flow is wired.
 */
export const faujaSinghResults: Record<number, ResultRow[]> = {
  2025: [
    { name: "Angela Cowell", laps: 21, distance: "42.29", time: "6:16:50" },
    { name: "Anna Prowse", laps: 21, distance: "42.29", time: "1:50:06" },
    { name: "Anne Purdham", laps: 21, distance: "42.29", time: "5:22:07" },
    { name: "Cindy Koon", laps: 16, distance: "42.29", time: "5:22:07" },
    { name: "Claire Louise", laps: 15, distance: "30.21", time: "3:55:00" },
    { name: "David Davidson", laps: 21, distance: "42.29", time: "6:28:16" },
    { name: "Dawanie Chuithong", laps: 14, distance: "28.19", time: "3:06:00" },
    { name: "Dawn Harvey", laps: 15, distance: "30.21", time: "4:29:00" },
    { name: "Ghanaya Talewar", laps: 21, distance: "42.29", time: "4:57:43" },
    { name: "Gurcharan Kaur", laps: 7, distance: "14.10", time: "1:50:06" },
  ],
  2022: [],
  2021: [],
  2019: [],
};
