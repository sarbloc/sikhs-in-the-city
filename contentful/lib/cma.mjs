// Shared helpers for Contentful Management API (CMA) migration/seed scripts.
// Reads the management token + space coordinates from the environment:
//   set -a; . ./.env; set +a
const { CONTENTFUL_SPACE_ID: SPACE, CONTENTFUL_TOKEN: CMA } = process.env;
export const ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";
export const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

if (!SPACE || !CMA) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_TOKEN in env.");
  process.exit(1);
}

const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/${ENV}`;
const UPLOAD_BASE = `https://upload.contentful.com/spaces/${SPACE}`;

export async function api(
  path,
  { method = "GET", body, version, base = BASE, headers = {}, raw = false } = {}
) {
  const h = { Authorization: `Bearer ${CMA}`, ...headers };
  if (!raw && body) h["Content-Type"] = "application/vnd.contentful.management.v1+json";
  if (version != null) h["X-Contentful-Version"] = String(version);
  const res = await fetch(`${base}${path}`, {
    method,
    headers: h,
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : {};
}

/** Current sys.version for a resource, or undefined if it doesn't exist yet. */
export async function getVersion(path) {
  try {
    return (await api(path))?.sys?.version;
  } catch (e) {
    if (String(e.message).includes("-> 404")) return undefined;
    throw e;
  }
}

/** Upload raw bytes to the space; returns the Upload sys link payload. */
export async function uploadBinary(bytes) {
  return api(`/uploads`, {
    method: "POST",
    base: UPLOAD_BASE,
    raw: true,
    body: bytes,
    headers: { "Content-Type": "application/octet-stream" },
  });
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
