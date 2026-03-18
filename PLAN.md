# Theme Implementation Plan

Apply the SITC brand colour palette to all components to match the Figma homepage design.

The Tailwind theme tokens and brand colour scales (gold, blue, purple/neutral) are set up in `globals.css`.

## Colour mapping from design

| Element | Colour | Token / Class |
|---------|--------|---------------|
| Header background | Gold yellow | `bg-gold-600` (`#FFF279`) |
| Hero "Join The Run" button | Blue | `bg-primary` (`#024EB2`) |
| Hero "Learn About Us" button | White outline | white border, white text |
| "Read The Fully Story" link | Blue | `text-primary` |
| How To Join background | Blue with photo | `bg-blue-600` (`#024EB2`) |
| How To Join step circles | Dark navy | `bg-blue-900` (`#011F47`) |
| How To Join CTA button | Gold | `bg-secondary` (`#FFF279`) |
| Events "Sign Up Now" link | Bold dark text | `font-bold` |
| Clubhouse Appeal background | Light blue-grey | `bg-accent` (`#CCDCF0`) |
| Clubhouse Appeal "Donate Now" | Dark/black | `bg-foreground text-background` |
| Course Records | White bg, grey card headers | default card styling |
| Join CTA background | Gold yellow | `bg-gold-600` |
| Join CTA "Register Interest" | Blue | `bg-primary` |
| Footer background | Dark navy blue | `bg-blue-950` (`#002250`) |
| Footer text/links | White / light | `text-white`, `text-blue-300` |

---

## PR 1: Header & Footer ✅
**Files:** `header.tsx`, `footer.tsx`, `header.test.tsx`, `footer.test.tsx`

### Header (gold background, dark text, SITC logo)
- [x] Background: `bg-secondary` (`#FFF279` gold)
- [x] Remove `border-b border-border/40` and backdrop blur
- [x] Text/links: dark text (already `text-foreground`, correct)
- [x] Add "Home" to nav items, remove "Courses", rename to "ClubHouse Appeal"
- [ ] Logo: "SITC" with Khanda symbol (text placeholder for now — needs logo asset)

### Footer (dark navy blue, white text)
- [x] Background: `bg-blue-950` (`#002250`)
- [x] All text white, links in `text-blue-300` with `hover:text-white`
- [x] Section headings: white, bold
- [x] Social icons: white (Facebook, Instagram)
- [x] Separator: subtle `bg-blue-800` line
- [x] Copyright text: white
- [x] "Address" column mirrors "Quick Links" (same link list)
- [x] "Supported By" section: placeholder boxes for New Balance and Sporting Equals
- [x] 3-column layout, removed Twitter/YouTube

---

## PR 2: Hero Section ✅
**Files:** `hero-section.tsx`

### Design: full-bleed photo, dark overlay, white text, bottom-left aligned
- [x] Overlay: `bg-black/40` (was `bg-background` gradient)
- [x] Heading: `text-white italic` (was `text-foreground`)
- [x] Subheading: `text-white/80` (was `text-muted-foreground`)
- [x] "Join The Run" button: blue `bg-primary` with `rounded-full` pill shape
- [x] "Learn About Us" button: white outline `rounded-full`, white text
- [x] Content positioned bottom-left (`items-end`, `pb-16 pt-32`)
- [x] Nav arrows and indicators: white for dark background visibility

---

## PR 3: How To Join — blue background with photo ✅
**Files:** `how-to-join-section.tsx`, `step-card.tsx`

### Design: blue background with background photo showing through, white text, white step cards
- [x] Section background: `bg-blue-600` with blue overlay (was `bg-muted/30`)
- [x] Heading: white text (inline, replaced SectionHeading)
- [x] Description: `text-white/80`
- [x] Step cards: white bg, rounded-xl, shadow, padding
- [x] Step number circles: `bg-blue-900 text-white` (was gold Badge)
- [x] Step titles and descriptions: dark text on white cards
- [x] "Register Your Interest" CTA: gold/yellow button (`variant="secondary"`)
- [ ] "contact form" text in description has underline (link) — deferred, needs rich text support

---

## PR 4: Events Section — image overlay cards ✅
**Files:** `events-section.tsx`, `event-card.tsx`, `events-section.test.tsx`, `events-section.stories.tsx`

### Design: centred heading, 2 image cards with overlay text
- [x] Centre "Events" heading
- [x] Remove description subtitle, showAllLink, allEventsHref props
- [x] 2-column grid
- [x] Card redesign: full-bleed image with bottom gradient overlay
- [x] Title + date overlaid on image in white bold text
- [x] Description below image, "Sign Up Now →" bold dark text
- [x] Default data: "Summer Somosa Ultra" (28 June 2026), "Dawn 2 Dusk Ultra" (6 December 2026)
- [x] Removed category badges and related props

---

## PR 5: Clubhouse Appeal — light blue-grey card ✅
**Files:** `clubhouse-appeal-section.tsx`, `clubhouse-appeal-section.test.tsx`, `clubhouse-appeal-section.stories.tsx`

### Design: light blue-grey rounded card, two-column layout with circular image
- [x] Background: `bg-blue-200` (`#CCDCF0`) with rounded-2xl card
- [x] Removed `bg-primary text-primary-foreground`
- [x] Left-aligned text, two-column grid (text left, circular image right)
- [x] Title: "Fauja Singh\nClubhouse Appeal" with whitespace-pre-line
- [x] Subtitle: "A Project to honour Fauja Singh BEM" smaller bold
- [x] "Donate Now" button: dark bg (`bg-foreground text-background`)
- [x] "Find Out More →" plain bold text link with arrow
- [x] Circular image placeholder on right

---

## PR 6: Course Records — expanded data model ✅
**Files:** `course-records-section.tsx`, `record-category.tsx`, `record-holder.tsx`, `course-records-section.test.tsx`, `course-records-section.stories.tsx`

### Design: centred heading, 4 columns, detailed record holder data
- [x] Title: "Dawn To Dusk Course Records" (centred)
- [x] Subtitle: "Record completion times for the Ultra, Marathon, Half Marathon, and 10k"
- [x] 4 columns: Ultra, Marathon, Half Marathon, 10K
- [x] Column headers: grey bg with category name + medal requirement text
- [x] Record holders: name, laps, distance, time, year (expanded data model)
- [x] Two record holders per category
- [x] Removed `bg-muted/30`, white background
- [x] Default data matches design

---

## PR 7: Join CTA — gold background with image ✅
**Files:** `join-cta-section.tsx`, `join-cta-section.test.tsx`

### Design: gold/yellow rounded card, two-column layout
- [x] Background: `bg-secondary` (`#FFF279`) rounded-2xl card
- [x] Left-aligned text, two-column grid
- [x] Title: "Join Sikhs In the City" bold italic
- [x] Description: dark text
- [x] "Register Interest" button: blue (`bg-primary`)
- [x] Image placeholder on right

---

## PR 8: Our Story + remove Courses/Training ✅
**Files:** `our-story-section.tsx`, `our-story-section.test.tsx`, `page.tsx`

### Our Story
- [x] "Read The Fully Story →" link: blue bold text link (`text-primary font-bold`) with arrow
- [x] Updated default paragraph text to match design
- [x] Removed unused Button import

### Courses/Training section
- [x] Removed from page.tsx — not in the Figma design

---

## Order of execution
1. **PR 1** (Header/Footer) — sets the page frame
2. **PR 2** (Hero) — most visually impactful
3. **PR 3** (How To Join) — blue section, major colour change
4. **PR 4** (Events) — card redesign
5. **PR 5** (Clubhouse Appeal) — layout + colour flip
6. **PR 6** (Course Records) — data model expansion
7. **PR 7** (Join CTA) — layout + colour change
8. **PR 8** (Our Story + cleanup) — minor tweaks
