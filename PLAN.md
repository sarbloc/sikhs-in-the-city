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

## PR 4: Events Section — image overlay cards
**Files:** `events-section.tsx`, `event-card.tsx`, `events-section.test.tsx`

### Design: centred heading, 2 image cards with overlay text
- [ ] Centre "Events" heading (currently left-aligned)
- [ ] Remove description subtitle
- [ ] 2-column grid (not 3)
- [ ] Card redesign: full-bleed image, dark gradient overlay at bottom
- [ ] Title + date overlaid on image in white bold text
- [ ] Description text below the image area (dark text on white)
- [ ] "Sign Up Now →" link: bold dark text with arrow (not blue)
- [ ] Update default event data: "Summer Somosa Ultra" (28 June 2026), "Dawn 2 Dusk Ultra" (6 December 2026)
- [ ] Remove category badges

---

## PR 5: Clubhouse Appeal — light blue-grey card
**Files:** `clubhouse-appeal-section.tsx`, `clubhouse-appeal-section.test.tsx`

### Design: light blue-grey rounded card, two-column layout with circular image
- [ ] Background: light blue-grey (`bg-accent` / `#CCDCF0`), large rounded corners
- [ ] NOT dark purple — remove `bg-primary text-primary-foreground`
- [ ] Left-aligned text, two-column layout (text left, circular image right)
- [ ] Title: "Fauja Singh Clubhouse Appeal" large bold text
- [ ] Subtitle: "A Project to honour Fauja Singh BEM" smaller bold
- [ ] Description paragraph in regular weight
- [ ] "Donate Now" button: dark/black bg, white text, rounded-full
- [ ] "Find Out More →" plain bold text link with arrow (not a styled button)
- [ ] Add circular image prop for right column

---

## PR 6: Course Records — expanded data model
**Files:** `course-records-section.tsx`, `record-category.tsx`, `record-holder.tsx`, `course-records-section.test.tsx`

### Design: centred heading, 4 columns, detailed record holder data
- [ ] Title: "Dawn To Dusk Course Records" (centred)
- [ ] Subtitle: "Record completion times for the Ultra, Marathon, Half Marathon, and 10k"
- [ ] 4 columns: Ultra, Marathon, Half Marathon, 10K
- [ ] Each column header: category name (bold), medal requirement description text
- [ ] Column headers have light grey background, rest is white
- [ ] Record holders: name (bold), "The record held at X lap", total distance, time, year achieved
- [ ] Two record holders per category (not male/female — just two entries)
- [ ] Remove `bg-muted/30` section background
- [ ] Update default data to match design values

---

## PR 7: Join CTA — gold background with image
**Files:** `join-cta-section.tsx`, `join-cta-section.test.tsx`

### Design: gold/yellow rounded card, two-column layout
- [ ] Background: `bg-gold-600` with rounded corners (not `bg-primary` dark)
- [ ] Left-aligned text (not centred)
- [ ] Two columns: text left, image/illustration placeholder right
- [ ] Title: "Join Sikhs In the City" bold, dark text (italic)
- [ ] Description: dark text
- [ ] "Register Interest" button: blue (`bg-primary text-white`), rounded-full
- [ ] The whole section appears as a rounded card within the page

---

## PR 8: Our Story — minor adjustments
**Files:** `our-story-section.tsx`

### Design: very close to current, small tweaks
- [ ] "Read The Fully Story →" link: change from ghost button to blue text link (`text-primary font-bold`) with arrow
- [ ] Verify body text colour matches design

### Courses/Training section
- [ ] Remove from page — not in the Figma design (confirmed by user)

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
