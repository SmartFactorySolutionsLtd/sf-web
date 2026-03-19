# Home Page Redesign — Design Spec

## Context

Smart Factory website redesign. Moving from dark industrial aesthetic to clean, professional, light-themed design. Home page first, then propagate to other pages.

## Migration Strategy

### Color Tokens

Replace the existing color system entirely. Old tokens → new tokens:

| Old Token | New Token | Old Hex | New Hex |
|-----------|-----------|---------|---------|
| `sf-midnight` | removed | `#091f2c` | — |
| `sf-deep` | removed | `#0b2e40` | — |
| `sf-steel` | `sf-blue` | `#0d496a` | `#0d496a` (same) |
| `sf-ocean` | `sf-blue-light` | `#1a6b94` | `#1a6b94` (same) |
| `sf-sky` | removed | `#2a8ab8` | — |
| `sf-ember` | removed | `#ff6b35` | — |
| `sf-warm` | removed | `#f0ece4` | — |
| `sf-warm-dark` | removed | `#e4ded4` | — |
| `sf-paper` | removed | `#faf8f5` | — |
| — | `sf-accent` | — | `#009fe3` |
| — | `sf-accent-light` | — | `#5cc5f2` |
| — | `sf-grey` | — | `#9d9d9c` |
| — | `sf-grey-light` | — | `#f5f5f5` |

Since all pages will eventually be redesigned, modify the global color system. Old tokens that are still referenced by non-home pages should be kept temporarily until those pages are migrated — mark them with `/* deprecated */` comments.

### Shared Components

The navbar, button styles (`.btn`), and CTA banner are shared across all pages. Since the redesign will propagate to all pages, **modify the shared components directly** rather than creating v2 duplicates. This means other pages will pick up the new navbar/button/CTA styles immediately — acceptable since they'll all be restyled anyway.

### Removed CSS Utilities

Keep removed CSS utilities (blueprint grid, corner brackets, clip-paths, etc.) in `styles.css` with `/* deprecated */` comments until all pages are migrated. Delete them in the final cleanup pass.

## Design Decisions

### Color System

| Token | Hex | Use |
|-------|-----|-----|
| `sf-blue` | `#0d496a` | Primary brand, color block backgrounds, primary buttons |
| `sf-blue-light` | `#1a6b94` | Hover states on primary elements |
| `sf-accent` | `#009fe3` | Links, highlights, interactive elements |
| `sf-accent-light` | `#5cc5f2` | Hover shifts on accent elements (sparingly) |
| `sf-grey` | `#9d9d9c` | Muted text, borders, dividers |
| `sf-grey-light` | `#f5f5f5` | Alternating section backgrounds |
| `sf-white` | `#ffffff` | Primary background |
| `sf-text` | `#1a1a1a` | Body text |
| `sf-text-mid` | `#4a5568` | Secondary text |

### Typography

- **Display**: Avenir (kept)
- **Body**: Darker Grotesque (kept)
- **Mono**: Geist Mono (kept for technical labels)
- **Sizing**: Hero headline `text-6xl` (60px). Section headlines `text-3xl` (30px) to `text-4xl` (36px). Body `text-lg` (18px).
- **Spacing**: Generous whitespace between sections (`py-24` to `py-32`), body line-height `leading-relaxed`.
- **Responsive**: Headlines scale down one step on mobile (e.g. `text-6xl` → `text-4xl`).

### Buttons

- **Primary**: `sf-blue` background, white text, 6px border-radius, hover → `sf-blue-light`
- **Secondary/Ghost**: Transparent background, `sf-blue` border + text, 6px border-radius, hover → filled
- **No clip-paths**, no angled corners

### Elements Kept

- Scroll-reveal animations (fade-in on viewport entry via IntersectionObserver)
- Technical labels (monospace, `01`/`02` numbering)
- Client logo grayscale → color on hover
- Footer (as-is)

### Elements Removed

- Blueprint grid patterns
- Corner brackets around images
- Diagonal clip-path sections
- Angled button clip-paths
- Navbar top contact bar
- Signal dot animations
- Measurement line decorations

## Navbar

- Single row: Logo (left) → Nav links (center) → CTA button (right)
- White background, sticky on scroll
- Subtle bottom border (`sf-grey` at ~20% opacity)
- Mobile: hamburger menu (slide-down)
- No top bar with phone/email/socials — that info lives in footer only

## Home Page Sections

### Section 1: Hero

- **Background**: Full-width factory/manufacturing photo, dark gradient overlay for text readability
- **Placeholder**: Until a real photo is sourced, use a `sf-blue` → `sf-blue-light` gradient background
- **Gradient overlay**: `linear-gradient(to right, rgba(13,73,106,0.85) 0%, rgba(13,73,106,0.4) 100%)`
- **Content**: Large headline (white, Avenir, `text-6xl` / 60px), 1-line tagline (`text-xl`), two CTA buttons (solid white primary + ghost white-outline secondary)
- **Layout**: Text left-aligned over image, vertically centered
- **Height**: `min-h-[85vh]`
- **Responsive**: `text-4xl` on mobile, `text-6xl` on desktop. Full height kept on mobile.

### Section 2: "What We Do"

- **Background**: White (`#ffffff`)
- **Layout**: 2-column grid `lg:grid-cols-[65%_35%]`, stacks to single column below `lg`
- **Content**: Technical label `01`, headline (`text-3xl`), 1-2 sentence description. Trim existing 3-paragraph copy to 1-2 punchy sentences.
- **Graphic**: `connect-collect-analyse-insight.png` takes visual prominence
- **Image treatment**: Clean, no frames or brackets. Subtle box-shadow if needed.

### Section 3: "Why Smart Factory?"

- **Background**: Light grey (`#f5f5f5`)
- **Layout**: 4-column grid (responsive: 1 → 2 → 4)
- **Content**: Each card has icon, headline, 1 sentence description
- **Cards**: No borders, whitespace separation only. Clean and minimal.
- **Padding**: Generous (py-24+)

### Section 4: "The WAPS Platform"

- **Background**: White (`#ffffff`)
- **Layout**: 2-column, WAPS screenshot 65%, text 35%
- **Content**: Technical label, headline, short description, CTA button
- **Screenshot**: Clean display — no corner brackets. Subtle box-shadow only.

### Section 5: "Our Clients"

- **Background**: White (`#ffffff`)
- **Separator**: Thin horizontal rule above section (`sf-grey` at ~30% opacity)
- **Layout**: Logo grid, centered
- **Behavior**: Grayscale → color on hover (kept)

### Section 6: "Latest Updates"

- **Background**: Light grey (`#f5f5f5`)
- **Layout**: 2-column article cards
- **Cards**: Image, title, date, short summary. Subtle shadow or border-bottom only.
- **Data**: Uses existing `<app-latest-updates />` widget which fetches from `ArticleService`. No data source changes needed.

### Section 7: CTA Banner

- **Background**: Full-width `sf-blue` (`#0d496a`) color block
- **Content**: White text, centered headline + subtext, white solid CTA button (6px radius)
- **Purpose**: Strategic color break — only blue section on page, draws action

### Section Rhythm

```
White (Hero/photo) → White → Grey → White → White → Grey → Blue
```

## Other Pages (future, not in scope)

- Hero treatment: Clean blue color block (`sf-blue`) with white text. No photo backgrounds.
- Same design system (colors, buttons, typography, spacing) propagated after Home approval.
- WAPS Capabilities alternating layout on Solutions page: kept as-is, restyled to match new system.

## Out of Scope

- Content changes (copy, images beyond placeholder hero)
- New pages or routes
- Backend/API changes
- Mobile-specific redesign beyond responsive breakpoints
