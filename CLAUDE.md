# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sikhs In The City — a community-led running charity website built as a single-page Next.js 16 static site (exported via `output: "export"`). The site is composed of section components assembled in `src/app/page.tsx`.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (static export to out/)
npm run lint         # ESLint (flat config, core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
npm run test         # Vitest in watch mode
npm run test:run     # Vitest single run
npm run test:coverage # Vitest with v8 coverage
npm run storybook    # Storybook dev on port 6006
```

## Architecture

- **Framework**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Static export**: `next.config.ts` sets `output: "export"` with unoptimized images — no server required
- **Path alias**: `@/*` maps to `./src/*`
- **UI primitives**: Radix UI + shadcn/ui pattern (`src/components/ui/`), styled with `class-variance-authority` and `tailwind-merge` (utility in `src/lib/utils.ts`)
- **Carousel**: Embla Carousel (`embla-carousel-react` + `embla-carousel-autoplay`)
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`

### Component structure

- `src/components/layout/` — Header, Footer
- `src/components/sections/` — Page sections (hero, our-story, events, how-to-join, etc.)
- `src/components/ui/` — Reusable UI primitives (button, card, badge, carousel, sheet, etc.)
- `src/components/` — Shared components (e.g., ImageCard)

### Test & story conventions

Components have co-located `*.test.tsx` and `*.stories.tsx` files. Tests use Vitest + React Testing Library + jsdom. The test setup (`src/test/setup.tsx`) mocks `next/image`, `next/navigation`, `matchMedia`, `ResizeObserver`, and `IntersectionObserver`.

## Guardrails

- Max 6 files changed per PR, ~300 lines diff. Propose a split if bigger.
- No drive-by edits, refactors, renames, or dependency upgrades unless explicitly requested.
- Run `npm run lint`, `npm run typecheck`, and `npm run test:run` before finishing any task.
