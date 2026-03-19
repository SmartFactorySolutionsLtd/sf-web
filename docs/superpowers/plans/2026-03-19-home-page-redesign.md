# Home Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Home page from dark industrial theme to clean, light, professional look with graphics-forward layout.

**Architecture:** Update global color tokens and shared components (navbar, buttons, CTA banner, section header) first, then rewrite the Home page template section by section. Keep scroll-reveal and technical labels.

**Tech Stack:** Angular 21 (signals, standalone components, inline templates), TailwindCSS 4 (CSS @theme)

**Spec:** `docs/superpowers/specs/2026-03-19-home-page-redesign-design.md`

---

### Task 1: Update Color System

**Files:**
- Modify: `src/styles.css:3-17` (@theme block)
- Modify: `src/styles.css:28-30` (body defaults)

- [ ] **Step 1: Replace @theme color tokens**

In `src/styles.css`, replace the `@theme` block colors. Keep old tokens with `/* deprecated */` comments for non-home pages. Add new tokens.

```css
@theme {
  /* New design system */
  --color-sf-blue: #0d496a;
  --color-sf-blue-light: #1a6b94;
  --color-sf-accent: #009fe3;
  --color-sf-accent-light: #5cc5f2;
  --color-sf-grey: #9d9d9c;
  --color-sf-grey-light: #f5f5f5;
  --color-sf-text: #1a1a1a;
  --color-sf-text-mid: #4a5568;

  /* deprecated — keep until all pages migrated */
  --color-sf-midnight: #091f2c;
  --color-sf-deep: #0b2e40;
  --color-sf-steel: #0d496a;
  --color-sf-ocean: #1a6b94;
  --color-sf-sky: #2a8ab8;
  --color-sf-ember: #ff6b35;
  --color-sf-warm: #f0ece4;
  --color-sf-warm-dark: #e4ded4;
  --color-sf-paper: #faf8f5;
  --color-sf-text-light: #718096;
  --color-sf-border: #d4cfc6;

  --font-display: "Avenir", sans-serif;
  --font-body: "Darker Grotesque", sans-serif;
  --font-mono: "Geist Mono", monospace;
}
```

- [ ] **Step 2: Update body defaults**

Change body background from `sf-paper` to white:

```css
body {
  font-family: var(--font-body);
  color: var(--color-sf-text);
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
  font-size: 17px;
  line-height: 1.6;
}
```

- [ ] **Step 3: Mark deprecated CSS utilities**

Add `/* deprecated */` comment before `.blueprint-grid`, `.blueprint-grid-dense`, `.clip-diagonal`, `.clip-diagonal-reverse`, `.signal-dot` blocks. Keep them functional.

- [ ] **Step 4: Update button styles**

Replace the `.btn` block — remove clip-path, add border-radius:

```css
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.875rem 2rem;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
```

Remove the `.btn::after` and `.btn:hover::after` underline pseudo-element blocks entirely.

Update `.btn-primary`:
```css
.btn-primary {
  background: var(--color-sf-blue);
  color: white;
}
.btn-primary:hover {
  background: var(--color-sf-blue-light);
}
```

Update `.btn-outline` to ghost style for light backgrounds:
```css
.btn-outline {
  background: transparent;
  color: var(--color-sf-blue);
  box-shadow: inset 0 0 0 1.5px var(--color-sf-blue);
}
.btn-outline:hover {
  background: var(--color-sf-blue);
  color: white;
}
```

Add `.btn-white` for use on dark/blue backgrounds:
```css
.btn-white {
  background: white;
  color: var(--color-sf-blue);
}
.btn-white:hover {
  background: var(--color-sf-grey-light);
}
.btn-white-outline {
  background: transparent;
  color: white;
  box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.5);
}
.btn-white-outline:hover {
  box-shadow: inset 0 0 0 1.5px white;
  color: white;
}
```

Update `.btn-sm` — remove clip-path:
```css
.btn-sm {
  padding: 0.5rem 1.25rem;
  font-size: 12px;
}
```

- [ ] **Step 5: Update selection color**

```css
::selection {
  background: var(--color-sf-blue);
  color: white;
}
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "update color system and button styles for redesign"
```

---

### Task 2: Redesign Navbar

**Files:**
- Modify: `src/app/shared/components/navbar/navbar.ts`

- [ ] **Step 1: Rewrite navbar template**

Remove the entire top bar `<div>` (the `bg-sf-midnight` block before `<nav>`).

Replace the full inline template with:

```html
<nav class="bg-white backdrop-blur-md sticky top-0 z-50 border-b transition-colors duration-300"
     [class]="scrolled() ? 'border-sf-grey/30' : 'border-sf-grey/20'">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a routerLink="/" class="shrink-0">
        <img src="assets/logo.png" alt="Smart Factory" class="h-14 w-auto py-1">
      </a>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-0.5">
        @for (link of navLinks; track link.path) {
          @if (link.children) {
            <div class="relative group">
              <a [routerLink]="link.path"
                 routerLinkActive="!text-sf-blue"
                 [routerLinkActiveOptions]="{ exact: link.exact }"
                 class="relative px-4 py-2 text-sf-text-mid hover:text-sf-blue font-display font-medium text-sm tracking-wide transition-colors inline-flex items-center gap-1">
                {{ link.label }}
                <svg class="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <div class="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div class="bg-white border border-sf-grey/20 shadow-lg rounded-lg min-w-44 py-1">
                  @for (child of link.children; track child.path) {
                    <a [routerLink]="child.path"
                       routerLinkActive="!text-sf-blue !bg-sf-blue/5"
                       [routerLinkActiveOptions]="{ exact: child.path === link.path }"
                       class="block px-4 py-2 text-sf-text-mid hover:text-sf-blue hover:bg-sf-grey-light font-display text-sm tracking-wide transition-colors">
                      {{ child.label }}
                    </a>
                  }
                </div>
              </div>
            </div>
          } @else {
            <a [routerLink]="link.path"
               routerLinkActive="!text-sf-blue"
               [routerLinkActiveOptions]="{ exact: link.exact }"
               class="relative px-4 py-2 text-sf-text-mid hover:text-sf-blue font-display font-medium text-sm tracking-wide transition-colors">
              {{ link.label }}
            </a>
          }
        }
        <a routerLink="/contact"
           class="ml-6 btn btn-primary btn-sm">
          REQUEST A DEMO
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button (click)="mobileOpen.set(!mobileOpen())" class="lg:hidden p-2 text-sf-text-mid hover:text-sf-blue transition-colors" aria-label="Toggle menu">
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.rotate-45]="mobileOpen()" [class.translate-y-2]="mobileOpen()"></span>
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.opacity-0]="mobileOpen()"></span>
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.-rotate-45]="mobileOpen()" [class.-translate-y-2]="mobileOpen()"></span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  @if (mobileOpen()) {
    <div class="lg:hidden border-t border-sf-grey/20 bg-white">
      <div class="px-4 py-4 space-y-1">
        @for (link of navLinks; track link.path) {
          <a [routerLink]="link.path"
             routerLinkActive="text-sf-blue bg-sf-blue/5"
             [routerLinkActiveOptions]="{ exact: link.exact }"
             (click)="mobileOpen.set(false)"
             class="block py-2.5 px-3 text-sf-text-mid hover:text-sf-blue font-display font-medium text-sm tracking-wide transition-colors rounded-lg">
            {{ link.label }}
          </a>
          @if (link.children) {
            @for (child of link.children; track child.path) {
              <a [routerLink]="child.path"
                 routerLinkActive="text-sf-blue bg-sf-blue/5"
                 (click)="mobileOpen.set(false)"
                 class="block py-2 px-6 text-sf-grey hover:text-sf-blue font-display text-sm tracking-wide transition-colors rounded-lg">
                {{ child.label }}
              </a>
            }
          }
        }
        <div class="pt-3 mt-3 border-t border-sf-grey/20">
          <a routerLink="/contact" (click)="mobileOpen.set(false)"
             class="btn btn-primary btn-sm w-full justify-center">
            REQUEST A DEMO
          </a>
        </div>
        <div class="pt-3 flex items-center gap-4 text-xs text-sf-grey font-mono">
          <a href="tel:+35361518443" class="hover:text-sf-blue transition-colors">+353 61 518 443</a>
          <span>|</span>
          <a href="mailto:info@smartfactory.ie" class="hover:text-sf-blue transition-colors">info&#64;smartfactory.ie</a>
        </div>
      </div>
    </div>
  }
</nav>
```

- [ ] **Step 2: Verify navbar renders**

Run: `npx ng serve` and check localhost — navbar should be white with dark text.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "redesign navbar: white bg, clean single-row layout"
```

---

### Task 3: Redesign Section Header

**Files:**
- Modify: `src/app/shared/components/section-header/section-header.ts`

- [ ] **Step 1: Update section header template**

Replace color references:
- `bg-sf-ocean` → `bg-sf-blue-light` (dark theme line)
- `bg-sf-steel` → `bg-sf-blue` (light theme line)
- `text-sf-ocean` → `text-sf-blue-light` (dark theme label)
- `text-sf-steel` → `text-sf-blue` (light theme label)
- `text-sf-midnight` → `text-sf-text` (light theme heading)

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "update section header colors for redesign"
```

---

### Task 4: Redesign CTA Banner

**Files:**
- Modify: `src/app/shared/components/cta-banner/cta-banner.ts`

- [ ] **Step 1: Rewrite CTA banner template**

Replace the entire template:
```html
<section class="bg-sf-blue relative overflow-hidden">
  <div class="max-w-4xl mx-auto px-4 py-20 text-center relative">
    <h2 class="font-display text-3xl sm:text-4xl font-800 text-white mb-4">{{ heading() }}</h2>
    @if (subheading()) {
      <p class="text-lg text-white/60 mb-10 max-w-xl mx-auto">{{ subheading() }}</p>
    }
    @if (link().startsWith('http')) {
      <a [href]="link()" target="_blank" rel="noopener" class="btn btn-white">
        {{ buttonText() | uppercase }}
      </a>
    } @else {
      <a [routerLink]="link()" class="btn btn-white">
        {{ buttonText() | uppercase }}
      </a>
    }
  </div>
</section>
```

Key changes: `bg-sf-midnight` → `bg-sf-blue`, remove blueprint grid overlay, remove radial gradient, `btn-primary` → `btn-white`.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "redesign CTA banner: blue bg, no blueprint grid"
```

---

### Task 5: Redesign Home Hero

**Files:**
- Modify: `src/app/pages/home/home.html:1-42`

- [ ] **Step 1: Replace hero section**

Replace lines 1-42 with:

```html
<!-- Hero -->
<section class="min-h-[85vh] relative flex items-center overflow-hidden"
         style="background: linear-gradient(to right, rgba(13,73,106,0.85) 0%, rgba(13,73,106,0.4) 100%), var(--color-sf-blue);">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative w-full">
    <div class="max-w-3xl">
      <span class="tech-label text-white/60 mb-6 block">Industry 4.0 Ready</span>

      <h1 class="font-display text-4xl lg:text-6xl font-800 text-white leading-[1.1] mb-6">
        Transforming Manufacturing Through Intelligent Data
      </h1>

      <p class="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl font-body">
        WAPS — the Work Area Performance System that brings IIoT and Industry 4.0 to your factory floor.
      </p>

      <div class="flex flex-wrap gap-4">
        <a routerLink="/solutions" class="btn btn-white">
          Explore Solutions
        </a>
        <a routerLink="/contact" class="btn btn-white-outline">
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</section>
```

Key changes: remove blueprint grid, signal dot, measurement lines, clip-diagonal. Use gradient placeholder. White buttons. Simpler, cleaner. `min-h-[85vh]` instead of `min-h-screen`.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "redesign home hero: gradient bg, clean layout"
```

---

### Task 6: Redesign "What We Do" Section

**Files:**
- Modify: `src/app/pages/home/home.html` (What We Do section, ~lines 44-79)

- [ ] **Step 1: Replace "What We Do" section**

```html
<!-- What We Do -->
<section class="py-28 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-16 items-center">
      <div appScrollReveal>
        <app-image-lightbox src="assets/graphics/connect-collect-analyse-insight.png" alt="Connect, Collect, Analyse, Insight — Smart Factory data pipeline" imgClass="w-full" />
      </div>

      <div appScrollReveal class="space-y-5">
        <span class="tech-label text-sf-grey">01 — What We Do</span>
        <h2 class="font-display text-3xl font-800 text-sf-text leading-tight">Smart Factory Understands Manufacturing</h2>
        <p class="text-lg text-sf-text-mid leading-relaxed">
          We accelerate smart manufacturing with real-time IIoT data capture, analysis, and visualisation — so you spend more time fixing losses than finding them.
        </p>
        <a routerLink="/solutions" class="inline-flex items-center gap-3 text-sf-blue hover:text-sf-blue-light font-display font-bold text-sm tracking-wide transition-colors group pt-2">
          EXPLORE OUR SOLUTIONS
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

Key changes: graphic takes 65% (left), text takes 35% (right). Remove corner brackets, `sf-paper` border, `sf-warm` background. Trim copy to 1 sentence. White background. Technical label with `01`.

- [ ] **Step 2: Remove the divider `<hr>` between What We Do and Value Props**

Delete the `<div class="bg-sf-warm">...<hr>...</div>` line.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "redesign 'What We Do': flipped ratio, clean layout"
```

---

### Task 7: Redesign "Why Smart Factory?" Section

**Files:**
- Modify: `src/app/pages/home/home.html` (Value Propositions section)

- [ ] **Step 1: Replace value propositions section**

```html
<!-- Value Propositions -->
<section class="py-28 bg-sf-grey-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <app-section-header title="Why Smart Factory?" subtitle="We deliver measurable results with minimal disruption to your operations" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      @for (prop of valueProps; track prop.title; let i = $index) {
        <div appScrollReveal class="space-y-4" [style.animation-delay.ms]="i * 100">
          <div class="w-12 h-12 rounded-lg bg-sf-blue/10 flex items-center justify-center">
            <svg class="w-6 h-6 text-sf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="prop.icon"/>
            </svg>
          </div>
          <h3 class="font-display font-bold text-lg text-sf-text">{{ prop.title }}</h3>
          <p class="text-base text-sf-text-mid leading-relaxed">{{ prop.description }}</p>
        </div>
      }
    </div>
  </div>
</section>
```

Key changes: `bg-sf-warm` → `bg-sf-grey-light`. Remove card borders, hover effects, top accent bar, number labels. Clean icon in rounded container. Whitespace separation only.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "redesign value props: clean cards on grey bg"
```

---

### Task 8: Redesign "The WAPS Platform" Section

**Files:**
- Modify: `src/app/pages/home/home.html` (Product Overview section)

- [ ] **Step 1: Replace product overview section**

```html
<!-- Product Overview -->
<section class="py-28 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16 items-center">
      <div appScrollReveal>
        <span class="tech-label text-sf-grey">02 — Core Platform</span>
        <h2 class="font-display text-3xl font-800 text-sf-text leading-tight mt-4 mb-5">The WAPS Platform</h2>
        <p class="text-lg text-sf-text-mid leading-relaxed mb-8">
          A comprehensive IIoT platform that connects to your equipment via OPC UA, capturing real-time data and transforming it into actionable intelligence for continuous improvement.
        </p>
        <a routerLink="/solutions" class="btn btn-primary">
          Learn More
        </a>
      </div>

      <div appScrollReveal>
        <div class="shadow-lg rounded-lg overflow-hidden">
          <app-image-lightbox src="assets/waps/screenshots/dtvr.png" alt="WAPS Downtime Viewer dashboard" imgClass="w-full" />
        </div>
      </div>
    </div>
  </div>
</section>
```

Key changes: remove `bg-sf-midnight`, blueprint grid, signal dot, corner brackets, WAPS logo watermark. White background. Text 35% (left), screenshot 65% (right) with shadow. Trimmed copy. On mobile, text stacks first (natural reading order), screenshot below.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "redesign WAPS platform: white bg, shadow screenshot"
```

---

### Task 9: Redesign "Our Clients" Section

**Files:**
- Modify: `src/app/pages/home/home.html` (Our Clients section)

- [ ] **Step 1: Replace clients section**

```html
<!-- Our Clients -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <hr class="border-sf-grey/30 mb-20" />

    <app-section-header title="Our Clients" subtitle="Trusted by world-class companies across manufacturing, medical devices, and life sciences" />

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center max-w-5xl mx-auto">
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/boston-scientific.png" alt="Boston Scientific" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/stryker.png" alt="Stryker" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/teleflex.png" alt="Teleflex" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/danone.png" alt="Danone" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/johnson-johnson.png" alt="Johnson &amp; Johnson" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/ensera.png" alt="Ensera" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/dawn-farms.png" alt="Dawn Farms" class="max-h-full max-w-full object-contain" />
      </div>
      <div appScrollReveal class="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <img src="assets/customers/procon.png" alt="Procon" class="max-h-full max-w-full object-contain" />
      </div>
    </div>
  </div>
</section>
```

Key changes: `bg-sf-warm` → `bg-white`. Thin `<hr>` separator at top of section. `opacity-60` → `opacity-50` for slightly more muted feel on white.

- [ ] **Step 2: Remove the old divider between clients and latest updates**

Delete the `<div class="bg-sf-warm">...<hr>...</div>` line after the clients section.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "redesign clients section: white bg, hr separator"
```

---

### Task 10: Redesign Latest Updates Widget

**Files:**
- Modify: `src/app/widgets/latest-updates/latest-updates.ts`

- [ ] **Step 1: Update latest updates template**

Replace the template colors:
- `bg-sf-warm` → `bg-sf-grey-light`
- `bg-sf-paper` → `bg-white`
- `border-sf-border/50` → `border-sf-grey/20`
- `hover:border-sf-steel/40` → `hover:border-sf-blue/40`
- `bg-sf-steel` (top accent bar) → `bg-sf-blue`
- `border-sf-steel/20` (icon box) → `border-sf-blue/20`
- `text-sf-steel` (icon) → `text-sf-blue`
- `text-sf-midnight` → `text-sf-text`
- `group-hover:text-sf-steel` → `group-hover:text-sf-blue`
- `text-sf-steel` (VIEW ALL link) → `text-sf-blue`
- `hover:text-sf-ocean` → `hover:text-sf-blue-light`

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "update latest updates widget colors for redesign"
```

---

### Task 11: Verify and Fix

- [ ] **Step 1: Run dev server and check Home page**

```bash
npx ng serve
```

Open `http://localhost:4200` and verify:
- Navbar: white, clean, single row
- Hero: blue gradient, white text, rounded buttons
- What We Do: white bg, graphic 65% left, text 35% right
- Why Smart Factory: grey bg, clean icon cards, no borders
- WAPS Platform: white bg, text left, screenshot right with shadow
- Clients: white bg, hr separator, grayscale logos
- Latest Updates: grey bg, clean cards
- CTA Banner: blue bg, white text, white button

- [ ] **Step 2: Check other pages haven't broken badly**

Navigate to `/solutions`, `/about`, `/contact`, `/articles`. They'll have the new navbar/buttons/CTA — verify nothing is completely broken (some color mismatches on those pages are acceptable since they'll be redesigned later).

- [ ] **Step 3: Fix any issues found**

Address layout breaks, color contrast problems, or missing styles.

- [ ] **Step 4: Commit fixes**

```bash
git add -A && git commit -m "fix post-redesign issues"
```
