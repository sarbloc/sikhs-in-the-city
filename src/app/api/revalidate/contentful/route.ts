// Revalidation webhook for Contentful publish/unpublish events.
//
// Contentful (Settings -> Webhooks) is configured to POST here on entry/asset
// publish + unpublish, sending the shared secret in the X-Contentful-Webhook-Secret
// header. We verify the secret, map the changed content type to its cache tag(s),
// and revalidate so the next request re-fetches fresh content. A forged request
// can at worst trigger a cache re-fetch (no data exposure or mutation), but the
// secret is still compared in constant time as a matter of hygiene.

import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { EVENTS_TAG } from "@/lib/contentful/events";
import { HERO_TAG } from "@/lib/contentful/hero";
import { RESULTS_TAG } from "@/lib/contentful/results";
import { NEWS_TAG } from "@/lib/contentful/news";
import { COURSE_RECORDS_TAG } from "@/lib/contentful/course-records";
import { FAUJA_RESULTS_TAG } from "@/lib/contentful/fauja-results";

// Contentful content-type id -> cache tag(s) used by the read layer.
const CONTENT_TYPE_TAGS: Record<string, string> = {
  event: EVENTS_TAG,
  heroSlide: HERO_TAG,
  resultsEvent: RESULTS_TAG,
  resultsYear: RESULTS_TAG,
  newsItem: NEWS_TAG,
  recordCategory: COURSE_RECORDS_TAG,
  courseRecord: COURSE_RECORDS_TAG,
  faujaResultsYear: FAUJA_RESULTS_TAG,
};

const ALL_TAGS = Array.from(new Set(Object.values(CONTENT_TYPE_TAGS)));

interface ContentfulWebhookPayload {
  sys?: { contentType?: { sys?: { id?: string } } };
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // Length check first: timingSafeEqual throws on length mismatch, and the
  // secret's length is not sensitive.
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!secret) {
    console.error("[revalidate] CONTENTFUL_REVALIDATE_SECRET is not set; rejecting webhook");
    return json({ revalidated: false, error: "Not configured" }, 500);
  }

  if (!secretMatches(request.headers.get("x-contentful-webhook-secret"), secret)) {
    return json({ revalidated: false, error: "Unauthorized" }, 401);
  }

  // Entry changes carry a content type; asset changes and Contentful's "test"
  // ping do not. When we can't pin the change to one type, revalidate every
  // known tag so an image swap (asset) still lands.
  let contentTypeId: string | undefined;
  try {
    const body = (await request.json()) as ContentfulWebhookPayload;
    contentTypeId = body?.sys?.contentType?.sys?.id;
  } catch {
    // no/invalid JSON body — fall through to revalidate-all
  }

  const tags =
    contentTypeId && CONTENT_TYPE_TAGS[contentTypeId]
      ? [CONTENT_TYPE_TAGS[contentTypeId]]
      : ALL_TAGS;

  // External webhook → expire immediately so a publish is live on the next
  // request. ('max' would serve stale once more before refreshing in the
  // background; an editor expects their publish to show on refresh.)
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return json({ revalidated: true, tags });
}
