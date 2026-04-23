# Design Refresh Implementation Plan

Full-site design refresh based on new mockups (saved in `~/Downloads/sitc design/new designs/`). Every top-level page is being rebuilt and several new components added. This plan is self-contained so a new session can pick it up without prior context.

## Status

- **Planning**: Complete
- **Implementation**: **Complete** — all 13 planned PRs merged (PRs #44–#55), plus post-rollout fixes (#56–#62). See "Completion log" below.
- **Pre-launch blockers**: see "Go-live checklist" below — all placeholders must be swapped before public launch.

## Completion log

Merged sequence (all on `main`):

| PR | Title |
|---|---|
| #44 | Header Results dropdown |
| #45 | Design refresh UI primitives (ResultsTable, PolaroidImage, AmenityCard, InfoRow) |
| #46 | Polish shared sections (Join CTA, course records, step card) |
| #47 | Events page rebuild |
| #48 | How To Join page rebuild |
| #49 | Contact page rebuild |
| #50 | Clubhouse Appeal hero → map (9a) |
| #51 | Event results pages (Fauja Singh, Dawn To Dusk, Summer Samosa) |
| #52 | Our Story sections 1–4 (8a) |
| #53 | Clubhouse Appeal vision → values (9b) |
| #54 | Our Story sections 5–8 (8b) |
| #55 | Clubhouse Appeal support + CTA (9c) |
| #56 | Home event cards link to /contact |
| #57 | Course records redesign |
| #58 | Polaroid 8px border / centred shadow |
| #59 | Homepage Our Story uses PolaroidImage |
| #60 | Join CTA runner breaks above top edge |
| #61 | Join CTA: fixed-height thumbnail + hands overlay with rounded corners |
| #62 | Standardise button sizing (16px / 12–56 padding) |

## Go-live checklist

Nothing below is blocking local development, but each must be resolved before public launch. Tracked as PR-body "open items" on the PRs listed.

- ~~**Contact form target email** (#49): `info@sikhsinthecity.com` is a placeholder. Confirm and swap.~~ Done in #64 — `info@sikhsinthecity.org`.
- ~~**Donate Now href** (#50, #53, #55): currently `#donate`. Replace with real donation URL/flow.~~ Done in #65 — https://www.gofundme.com/f/fauja-singh-clubhouse-appeal.
- ~~**Bank details** (#55): `XXXXXXXX` / `XX-XX-XX` intentionally unrealistic placeholders. Swap in real account + sort code.~~ Done in #66 — real account wired in and support copy finalised.
- ~~**YouTube video IDs** (#50): three "Words from Fauja Singh" videos use `dQw4w9WgXcQ` (Rickroll) placeholder. Replace with real IDs.~~ Done in #67 — three real Vimeo videos (pre / with-Fauja / post).
- **Fauja Singh portrait + polaroids** (#50, #53): hero portrait and architectural/community polaroids reuse `/images/hero/slide-*.{png,jpg}`. Swap with real assets.
- ~~**Trustee photos** (#54): all `/images/trustees/*.jpg` are placeholders. Nine-cell grid including one unnamed middle-row trustee that needs confirmation.~~ Done in #68/#69/#70/#71 — eight real trustees (alphabetical) + Vacancy cell. Unnamed middle-row slot was a placeholder; replaced by Vanessa Brewster to complete the list.
- ~~**Our Story photos** (#52): `/images/our-story/{beginning,founders,dedication-1..4}.jpg` placeholders.~~ Done in #68/#69/#71 — real Beginning portrait (no-polaroid cut-out), four real dedication thumbnails, Events single polaroid. Founders reuses homepage `/images/our-story.png` group photo.
- **Events / How To Join / Clubhouse Appeal hero images**: many reuse existing slide assets. Swap with bespoke assets once available.
- **Fauja Singh results data** (#51): only 2025 has rows. 2022/2021/2019 show empty state until a CSV import is built.
- **Possible mock typo** (#52): Our Story section 3 body has `"Amrik Singh from Glasgow and Karnail Singh also from Ilford, Amrik Singh"` — transcribed verbatim from the mock; content owner should confirm.

## Follow-up chores (non-blocking)

- Rename `public/images/events/summer-somosa.png` → `summer-samosa.png` (flagged in #47). Link + alt already use correct spelling.
- Add `.claude/worktrees` (or the transient `.next` build directories under it) to `eslint.config.mjs` `ignores` — sibling agent worktrees pollute lint output with their build artefacts.

---

## Confirmed decisions

| Question | Decision |
|---|---|
| Add Home link to header? | No |
| Remove Store button from header? | No (keep as-is) |
| Contact form backend | `mailto:` — no server-side processing |
| Video embeds (Fauja Singh clubhouse videos) | YouTube iframes — placeholders for now |
| Map embeds (contact + clubhouse) | Google Maps iframe |
| Asset policy | Placeholders for trustee photos, video thumbnails, amenity icons, Fauja polaroid photos — swap later |
| Highlighted table row | **Hover state** only, not a permanent record marker |
| Our Story vs About | Designer labelled it "About" but it's the Our Story page — build on `/our-story` |
| Events page iframe | Overwrite — that was a test |

---

## Design inventory

All designs live in `~/Downloads/sitc design/new designs/`:

**Components (primitives):**
- `table-component.png` — Results table (name/laps/distance/time), blue header, alt rows, hover-highlighted row
- `new-image-component.png` + `example-of-new-image-component.png` — Polaroid-style image frame (tilted, rough edge, drop shadow); supports single + clustered use
- `amenities-component.png` — Amenity card (yellow icon circle, uppercase label, description)
- `new-join-component.png` — Join CTA (yellow card left, runner image right, blue button)
- `dawn-to-dusk-records.png` — Updated Course Records card subtitles

**Navigation:**
- `Dropdown-for-results-nav-menu.png` — Results nav dropdown: Dawn To Dusk, Summer Samosa, Fauja Singh Birthday Challenge

**Pages:**
- `fauja-singh-birthday-challenge-event-page.png` — Results page with year dropdown + table
- `example-of-event-page.png` — (Superseded) year-cards Dawn To Dusk page. Not being built — dropdown pattern is canonical.
- `about-page.png` — Our Story rebuild (8 sections)
- `events-page.png` — Events rebuild (hero + 2 event cards)
- `how-to-join-page.png` — How To Join rebuild (hero + 3 numbered-step cards)
- `contact-us-page.png` — Contact rebuild (form + training meeting point + map)
- `clubhouse-appeal-page.png` / `fauja_singh_clubhouse_appeal_page.png` — Clubhouse appeal rebuild (massive, 8+ sections)

---

## Component inventory

### New primitives (PR 1)

| Name | Path | Description |
|---|---|---|
| `ResultsTable` | `src/components/ui/results-table.tsx` | Blue header row, alternating row bg, `hover:bg-yellow-100` on rows. Accepts columns + rows props. |
| `PolaroidImage` | `src/components/polaroid-image.tsx` | Tilted frame, white border, soft shadow, rough-edge effect. Accepts `src`, `alt`, `rotate`, sizing. Supports cluster layouts. |
| `AmenityCard` | `src/components/amenity-card.tsx` | Light-grey rounded card, yellow circle + lucide icon, uppercase label, description. |
| `InfoRow` | `src/components/info-row.tsx` | Yellow icon circle + text row. For contact page (location/time). Reusable. |

Co-located `*.test.tsx` and `*.stories.tsx` for each (project convention).

### New sub-components (colocated with pages/sections)

| Name | Used by | Notes |
|---|---|---|
| `YearDropdown` | Event results pages | Native `<select>` styled with Tailwind. Controlled component. |
| `ExternalResultsButton` | Dawn To Dusk + Summer Samosa results | Blue primary button linking to external `justiming.co.uk` URL, `target="_blank"` |
| `EventResultsLayout` | All 3 results pages | Shared shell: page hero + "Select the year to view the results" + year dropdown + content slot |
| `TrusteeCard` | Our Story | Photo + name + optional role label (e.g. `PRESIDENT`, `SECRETARY`, `TREASURER`). `Vacancy` variant with silhouette. |
| `FeatureCard` | Our Story | Blue card with heading, body, arrow link (e.g. "Find Out More →") |
| `StepCard` (exists, restyle) | How To Join | Big yellow numbered circle top, heading, body. Currently uses different design. |
| `VideoEmbed` | Clubhouse Appeal | YouTube iframe wrapper with title caption. Placeholder URLs for now. |
| `MapEmbed` | Contact, Clubhouse Appeal | Google Maps iframe wrapper with aspect ratio. |

### Components to update

| Name | Path | Change |
|---|---|---|
| `Header` | `src/components/layout/header.tsx` | Add Results dropdown using `NavigationMenu` submenu. Mobile Sheet needs nested/collapsible group for Results. **Keep** Home absence and Store button. |
| `CourseRecordsSection` | `src/components/sections/course-records-section.tsx` | Change per-category `requirement` text from long "To receive the..." to short form: `25+ laps (minimum 50k)`, `21 laps (42k)`, `11 laps (22k)`, `5 laps`. Verify card spacing. |
| `JoinCtaSection` | `src/components/sections/join-cta-section.tsx` | Restyle: yellow card left (text + blue "Register Your Interest" button), runner image right (flush, no rounded corner on image side). |
| `EventCard` | `src/components/sections/event-card.tsx` | Verify against new design: large photo, overlay title + date (bottom-left), description, "Sign Up Now →" link. |
| `StepCard` | `src/components/sections/step-card.tsx` | Restyle to new design: white card, big yellow circle with dark-text number at top-center. |

---

## Route structure

```
/                                              (home, unchanged this cycle)
/our-story                                     (rebuild — "About" design)
/how-to-join                                   (rebuild)
/events                                        (rebuild — overwrite iframe test)
/clubhouse-appeal                              (rebuild)
/contact                                       (rebuild)
/results/dawn-to-dusk                          (new — year dropdown → external button)
/results/summer-samosa                         (new — year dropdown → external button)
/results/fauja-singh-birthday-challenge        (new — year dropdown → internal table)
```

---

## Data

### Fauja Singh Birthday Challenge results

- **Years available**: 2025, 2022, 2021, 2019
- **Only 2025 has hardcoded table data** (placeholder rows from the mock for now; real data will arrive via spreadsheet/CSV — import flow TBD later)
- **Other years**: dropdown shows them but selecting shows an empty-state message ("Results for {year} not yet available") or equivalent

Sample 2025 rows (from mock — verify with real data before merge):
```
Angela Cowell    21  42.29  6:16:50
Anna Prowse      21  42.29  1:50:06
Anne Purdham     21  42.29  5:22:07
Cindy Koon       16  42.29  5:22:07
Claire Louise    15  30.21  3:55:00
David Davidson   21  42.29  6:28:16
Dawanie Chuithong 14 28.19  3:06:00
Dawn Harvey      15  30.21  4:29:00
Ghanaya Talewar  21  42.29  4:57:43
Gurcharan Kaur   7   14.10  1:50:06
```

Data file: `src/data/fauja-singh-results.ts` with `Record<year, Row[]>` shape.

### Dawn To Dusk results

- **Years**: 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
- **URL pattern**: `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=d2d{YY}.clax` where `{YY}` is 2-digit year (e.g. `d2d25.clax` for 2025)

### Summer Samosa results

- **Years**: 2022, 2023, 2024, 2025
- **URL pattern**: `https://justiming.co.uk/liveresults/roadrunning/g-live.html?f=SummerSamosa{YY}.clax` (e.g. `SummerSamosa25.clax` for 2025)

### Clubhouse Appeal — amenities grid (9 tiles, 3×3)

| Label | Description | Icon (suggested lucide) |
|---|---|---|
| TOILETS | Male, female and accessible WC facilities | `Accessibility` |
| SHOWERS | Male and female changing rooms with showers | `ShowerHead` |
| ACTIVITY STUDIO | Open plan space for activities such as yoga and Pilates | `Activity` |
| COMMUNITY SPACE | Office and reception area | `Users` |
| REFRESHMENT AREA | Kitchenette and refreshment area | `Coffee` |
| RECOVERY | A medical and recovery room | `HeartPulse` |
| FITNESS AREA | Storage and running training equipment, including gym facilities | `Dumbbell` |
| FAUJA SINGH LIBRARY | A dedicated Fauja Singh library and memorabilia room | `BookOpen` |
| WELLBEING | Roof garden and outdoor wellbeing space | `Leaf` |

Note: mock has typo `femal` → use `female`.

### Our Story — Trustees

9-cell grid (3×3). Placeholder photos for all. Names/roles from mock:

- Ghanaya Singh Talewar — SECRETARY
- Harmander Singh — PRESIDENT
- Misbah Choudhury — (no role)
- Nadhira Uddin — (no role)
- Rajinder Shinhmar — (no role)
- Sandy Jobanputra — TREASURER
- Surinder Kaur Atwal — (no role)
- (Unnamed, middle-row position in mock — verify)
- Vacancy — "CONTACT US TO APPLY" silhouette variant

---

## PR plan

Guardrails from `CLAUDE.md`: max 6 files changed per PR, ~300 lines diff. Several PRs below are on the edge — split if they exceed.

| # | Branch | Contents | Depends on | Parallel with |
|---|---|---|---|---|
| 1 | `feat/design-refresh-primitives` | `results-table`, `polaroid-image`, `amenity-card`, `info-row` (+ tests + stories) | — | 2, 3 |
| 2 | `feat/header-results-dropdown` | Header Results submenu (desktop + mobile nested group) | — | 1, 3 |
| 3 | `refactor/polish-shared-sections` | Join CTA restyle, course-records subtitles, step-card restyle, event-card check | — | 1, 2 |
| 4 | `feat/events-page` | Rebuild `/events`: hero, 2 event cards, join CTA | 3 | 5, 6, 7, 8a, 9a |
| 5 | `feat/how-to-join-page` | Rebuild `/how-to-join`: hero, 3-step blue section, yellow CTA | 3 | 4, 6, 7, 8a, 9a |
| 6 | `feat/contact-page` | Rebuild `/contact`: form (mailto), training meeting point `InfoRow`s, Google Maps iframe | 1 | 4, 5, 7, 8a, 9a |
| 7 | `feat/event-results-pages` | `/results/fauja-singh-birthday-challenge`, `/results/dawn-to-dusk`, `/results/summer-samosa`; shared `EventResultsLayout`; Fauja data file | 1 | 4, 5, 6, 8a, 9a |
| 8a | `feat/our-story-sections-1-4` | Intro, The Beginning (blue), The Founders (polaroid), Dedication (polaroid cluster) | 1 | 4, 5, 6, 7, 9a |
| 8b | `feat/our-story-sections-5-8` | Feature cards (Credibility, Events for Everyone), Get In Touch yellow band, Trustees 3×3 grid, SITC events info block | 8a | 9b |
| 9a | `feat/clubhouse-appeal-hero-to-map` | Hero, "Honouring a Legacy", "Words from Fauja Singh" videos (placeholders), "A place with meaning" map | 1 | 4, 5, 6, 7, 8a |
| 9b | `feat/clubhouse-appeal-vision-to-values` | "Bringing the Vision to Life" (polaroid renders), amenities 3×3 grid, "Funding the Build", "Carrying Fauja Singh's Values Forward" | 9a, 1 | 8b |
| 9c | `feat/clubhouse-appeal-support-cta` | "Supporting the Clubhouse Appeal" bank details block, "Help Build a Lasting Community Legacy" donate band | 9b | — |

**13 PRs total.** Parallel-safe waves:

- **Wave 1**: PRs 1, 2, 3 (all independent)
- **Wave 2** (after 1 + 3 land): PRs 4, 5, 6, 7, 8a, 9a (6 in parallel)
- **Wave 3**: PRs 8b, 9b
- **Wave 4**: PR 9c

---

## Implementation notes per PR

### PR 1 — Primitives
- `ResultsTable` API: `columns: { key, label, className? }[]`, `rows: Record<string, ReactNode>[]`. Alt-row bg via `even:bg-muted/40`. Row-level `hover:bg-yellow-100 hover:font-bold`.
- `PolaroidImage` props: `src`, `alt`, `width`, `height`, `rotate?` (default random small), `className?`. Use CSS `transform: rotate()` + `box-shadow` + white padding border + slight `border-radius`. For "rough edge", consider SVG mask or CSS `filter: url(#rough)`; if complex, start with clean white frame + strong shadow.
- `AmenityCard` props: `icon: LucideIcon`, `label: string`, `description: string`.
- `InfoRow` props: `icon: LucideIcon`, `children: ReactNode`. Yellow circle bg, icon centered, text right of circle.

### PR 2 — Header Results dropdown
- Use `NavigationMenu` + `NavigationMenuTrigger` + `NavigationMenuContent` for desktop dropdown.
- Items:
  - `/results/dawn-to-dusk` (internal)
  - `/results/summer-samosa` (internal)
  - `/results/fauja-singh-birthday-challenge` (internal)
- Mobile: add a collapsible group in the Sheet for "Results" with the 3 sub-links indented.
- Place Results between ClubHouse Appeal and Contact Us in nav order (per mocks).

### PR 3 — Polish shared sections
- Course records: change the four `requirement` strings in `course-records-section.tsx` defaultRecords.
- Join CTA: split into 2 cols on desktop (yellow text block left ~55%, image right ~45%); stack on mobile with image on top.
- StepCard: wrap content in white rounded card; big yellow circle (w-16 h-16) with dark-text number above card or overlapping top.

### PR 4 — Events page
- Hero: full-width photo bg with blue overlay, left-aligned heading "Events That Move The Community" (white), 2-line intro, yellow "Register Your Interest" button.
- Events section: white bg, "Events" heading centered, 2-col grid of `EventCard`s (Summer Samosa Ultra 28th June 2026, Dawn 2 Dusk Ultra 6th December 2026).
- Join CTA below.

### PR 5 — How To Join
- Hero: yellow-tinted photo bg, dark heading "Start your running journey", intro, yellow "Register Your Interest" button.
- Blue "How To Join" section with 3 `StepCard`s. Yellow "Register Your Interest" button centred below.
- Content:
  1. Register your interest — Complete our [contact form] and tell us a little about yourself and your goals.
  2. Come and meet us — Join us on a Sunday at 7am at Beal High School and get to know the community.
  3. Start your journey — Bring your training gear and water. We'll understand your goals and help you follow a plan that suits you.

### PR 6 — Contact page
- No page hero. Title "Register Your Interest" on light bg.
- Form: Name, Email, Phone Number, Message. `Send` button (yellow). Submits via `mailto:` (`<form action="mailto:..."` with `enctype="text/plain"` OR assemble body client-side and `window.location.href = 'mailto:...'`). Need to know the target email address — placeholder `info@sikhsinthecity.com` or similar pending confirmation.
- Below form: "Training & Racing Meeting Point" heading, 2 `InfoRow`s (location pin + address, clock + Sunday 6-9am), note text, Google Maps iframe embedded.
- Address: `Junction of Roding Lane South & Woodford Bridge Road opposite the PDSA centre, nearest postcode for SatNav IG4 5PS`.

### PR 7 — Event results pages
- `EventResultsLayout` accepts `title`, `heroImage`, `years: number[]`, `onYearChange`, `children` (content slot).
- `/results/fauja-singh-birthday-challenge`: slot = `ResultsTable` for 2025, empty-state component for other years.
- `/results/dawn-to-dusk`: slot = `ExternalResultsButton` computing URL from year (`d2d${String(year).slice(2)}.clax`).
- `/results/summer-samosa`: same pattern (`SummerSamosa${YY}.clax`).
- Year selector needs `"use client"` (has state). Can isolate to a `<YearSelector>` client component while the page stays static.

### PR 8a — Our Story sections 1–4
- Section 1 (intro): light bg, "About Sikhs In The City" h1, one-sentence lede "The Club has been representing the UK at the Interfaith Relay marathon in Luxembourg since 2008."
- Section 2 (The Beginning): blue bg, portrait image left, white heading + body right. Body text from mock — transcribe verbatim.
- Section 3 (The Founders): white bg, text left, `PolaroidImage` of founders right.
- Section 4 (Dedication): yellow bg, text left, polaroid cluster (4 photos) right.

### PR 8b — Our Story sections 5–8
- Section 5: two `FeatureCard`s side-by-side (blue bg, white text, arrow links to `/clubhouse-appeal` and `/events`).
- Section 6 (Get In Touch): yellow band, heading + blue "Contact Us" button → `/contact`.
- Section 7 (Our Trustees): heading, one-line intro, 3×3 grid of `TrusteeCard`s.
- Section 8 (SITC events info): 2-col layout — text block describing event distances, course format, timing; polaroid cluster of past event photos right.

### PR 9a — Clubhouse Appeal (hero → map)
- Hero: light-blue bg band, heading "Fauja Singh Clubhouse Appeal", intro, blue Donate Now button. Circular portrait of Fauja Singh right. Disclaimer line ("Registered Charity No 1179621 · Community project supported by the London Borough of Redbridge").
- "Honouring a Legacy. Building for the Future." — text left, polaroid image right, Donate Now button.
- Yellow section "Words from Fauja Singh and the team": 3-column `VideoEmbed` grid with YouTube placeholders + caption text.
- "A place with meaning": 2-col — Google Maps iframe left, text right.

### PR 9b — Clubhouse Appeal (vision → values)
- "Bringing the Vision to Life": heading + intro, 3 polaroid architectural renders side-by-side.
- "Designed for Wellbeing, Accessibility, and Community Use": heading + one-liner, 3×3 grid of `AmenityCard`s (data above).
- "Funding the Build": 2-col, text left with Donate button, polaroid image right.
- "Carrying Fauja Singh's Values Forward": 2-col, polaroid left, text right.

### PR 9c — Clubhouse Appeal (support + CTA)
- "Supporting the Clubhouse Appeal": centered heading, paragraph, Bank Details block (Account Name, Account Number, Sort Code), Important donation notes paragraph.
- Blue band "Help Build a Lasting Community Legacy" with yellow Donate Now button.

---

## Open items (not blocking)

- **Contact form target email** — need the actual address before PR 6 merges. Mock doesn't show it.
- **Fauja Singh results data for 2022, 2021, 2019** — currently dropdown will show empty state. Real CSV/spreadsheet import flow TBD.
- **YouTube video URLs** for Clubhouse videos — placeholders until provided.
- **Trustee photos** + names confirmation — placeholders in 8b.
- **Amenity icons** — suggested lucide icons in table above; verify with designer.
- **Polaroid renders of clubhouse** — 3 architectural images needed for 9b. Present in `~/Downloads/sitc design/new designs/example-of-new-image-component.png` reference; may be extractable or placeholders.
- **Fauja Singh portrait** (clubhouse hero circle) and other clubhouse photos — placeholders.
- **Guardrail check** — PR 8b, 9a, 9b, 9c may brush against the 6-file / ~300-line limit. Re-evaluate during implementation and split further if needed.

---

## Execution notes

- Run `npm run lint`, `npm run typecheck`, `npm run test:run` before marking any task complete (per CLAUDE.md).
- Per global rules: run `/code-review --comment` with confidence threshold 75 before marking any PR as ready. Fix everything flagged. Re-run until clean.
- Per global rules: for frontend PRs, do visual review — screenshots from main vs feature branch at 1440×900 and 390×844, posted as PR comment.
- Conventional commits (`feat:`, `refactor:`, `fix:`, `chore:`).
- Branches: `feat/...`, `refactor/...`, `chore/...`.
- Reference issues in PR bodies once issues are filed.

---

## Next session kickoff

1. Read this file.
2. Start with **PR 1** (`feat/design-refresh-primitives`) — no dependencies, unblocks most of Wave 2.
3. While PR 1 is open, PRs 2 and 3 can run in parallel.
