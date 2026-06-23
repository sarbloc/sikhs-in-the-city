# Contentful content model (as code)

The content model and seed data for the Contentful space live here as versioned,
idempotent scripts. Re-running a script is safe — it upserts by deterministic id
and republishes.

## Prerequisites

Populate `.env` (see `.env.example`) with at least:

- `CONTENTFUL_TOKEN` — a CMA management token (`CFPAT-…`)
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENVIRONMENT` (defaults to `master`)

## Running

Scripts read the environment, so load `.env` into the shell first:

```bash
set -a; . ./.env; set +a
node contentful/migrations/01-events.mjs        # content model: Event
node contentful/migrations/02-seed-events.mjs   # seed the two homepage events + images
```

Run them in numeric order on a fresh space. Each is independent and idempotent.

## Layout

- `lib/cma.mjs` — thin CMA fetch helper (auth, versioned upserts, asset upload).
- `migrations/NN-*.mjs` — one numbered script per model/seed step.

## Adding a content type

Add `migrations/NN-<name>.mjs` that imports the helpers from `lib/cma.mjs`,
defines the content type, and calls the upsert/publish helper. Keep the runtime
read queries in `src/lib/contentful/` — this directory is build/admin tooling
only and is never bundled into the site.
