# Theme Implementation Plan — COMPLETE

All homepage sections have been updated to match the Figma design. This plan is kept for reference.

## Colour mapping

| Element | Colour | Token / Class |
|---------|--------|---------------|
| Header background | Gold yellow | `bg-secondary` (`#FFF279`) |
| Header nav links | Ghost (no bg) | `bg-transparent` |
| Hero "Join The Run" button | Blue | `bg-primary` (`#024EB2`) |
| Hero "Learn About Us" button | White outline | `border-white bg-transparent text-white` |
| Hero overlay | Left-to-right gradient | `from-black/70 via-black/40 to-transparent` |
| "Read The Fully Story" link | Blue bold | `text-primary font-bold` |
| How To Join background | Blue with photo | `bg-blue-600` + `bg-blue-600/85` overlay |
| How To Join step circles | Dark navy | `bg-blue-800` (`#012F6B`) |
| How To Join CTA button | Gold | `variant="secondary"` |
| Events cards | Image overlay | gradient + white text |
| Events "Sign Up Now" link | Bold white | `font-bold text-white` |
| Clubhouse Appeal background | Light blue-grey card | `bg-blue-200` (`#CCDCF0`) |
| Clubhouse Appeal "Donate Now" | Dark/black | `bg-foreground text-background` |
| Course Records | White bg, grey headers | `bg-muted` headers |
| Join CTA background | Gold yellow card | `bg-secondary` rounded-2xl |
| Join CTA "Register Interest" | Blue | `bg-primary` |
| Footer background | Dark navy blue | `bg-blue-950` (`#002250`) |
| Footer text/links | White / light | `text-white`, `text-blue-300` |

## PRs delivered

| PR | Scope | Status |
|----|-------|--------|
| #33 | Theme setup + Header (gold) + Footer (navy) | ✅ Merged |
| #34 | Hero section (overlay, white text, carousel) | ✅ Merged |
| #35 | How To Join (blue bg, white cards, navy circles) | ✅ Merged |
| #36 | Events (image overlay cards, 2-column) | ✅ Merged |
| #37 | Clubhouse Appeal (blue-grey card) + reduced section padding | ✅ Merged |
| #38 | Course Records (expanded data model, 4 columns) | ✅ Merged |
| #39 | Join CTA (gold card, blue button) | ✅ Merged |
| #40 | Our Story (blue link) + remove Courses/Training | ✅ Merged |
| #41 | Header nav links ghost style | ✅ Merged |
| #42 | Asap font + SITC logo | ✅ Merged |
| #43 | Sponsor logos (New Balance, Sporting Equals) | ✅ Merged |

## Outstanding items

- [ ] "contact form" text in How To Join description could be a link (needs rich text support)
- [ ] Replace placeholder Unsplash images with real SITC photos
- [ ] Clubhouse Appeal and Join CTA circular/rectangular image placeholders need real photos
