import { contentfulQuery } from "./client";

/** Shapes consumed by CourseRecordsSection. */
export interface RecordHolderData {
  name: string;
  laps: number;
  distance?: string;
  time: string;
  year: number;
}

export interface CategoryRecord {
  category: string;
  requirement: string;
  holders: RecordHolderData[];
}

/** Cache tag for course records (revalidated by the publish webhook). */
export const COURSE_RECORDS_TAG = "course-records";

interface RecordsResponse {
  recordCategoryCollection: {
    items: Array<{
      name: string;
      requirement: string;
      linkedFrom: {
        courseRecordCollection: {
          items: Array<{
            name: string;
            laps: number;
            distance: string | null;
            time: string;
            year: number;
            displayOrder: number;
          }>;
        };
      } | null;
    }>;
  };
}

const RECORDS_QUERY = `
  query CourseRecords {
    recordCategoryCollection(order: [displayOrder_ASC]) {
      items {
        name
        requirement
        linkedFrom {
          courseRecordCollection(limit: 100) {
            items {
              name
              laps
              distance
              time
              year
              displayOrder
            }
          }
        }
      }
    }
  }
`;

/** Course-record categories with their holders, ordered for display. */
export async function getCourseRecords(): Promise<CategoryRecord[]> {
  const data = await contentfulQuery<RecordsResponse>(RECORDS_QUERY, {
    tags: [COURSE_RECORDS_TAG],
  });
  const categories = data.recordCategoryCollection.items.map((cat) => ({
    category: cat.name,
    requirement: cat.requirement,
    holders: (cat.linkedFrom?.courseRecordCollection.items ?? [])
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((h) => ({
        name: h.name,
        laps: h.laps,
        distance: h.distance ?? undefined,
        time: h.time,
        year: h.year,
      })),
  }));
  // The homepage section is always expected to have records; an empty
  // collection is an error state (unseeded env), consistent with the hero.
  if (categories.length === 0) {
    throw new Error("Contentful returned no published record categories");
  }
  // Likewise a category with no published holders would render an empty card
  // and ISR would cache it — fail loud so the last good page keeps serving.
  const empty = categories.find((c) => c.holders.length === 0);
  if (empty) {
    throw new Error(`Record category "${empty.category}" has no published course records`);
  }
  return categories;
}
