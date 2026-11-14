<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — durable rules for this portfolio

This site implements **THE NIGHT WORKSHOP**: a premium, motion-led portfolio
for a Java backend engineer. Deep espresso surfaces, lamp-brass accents,
cream serif type, and four painted steampunk illustrations of Punithan that
open each page. It replaces every earlier direction (IDEA NOIR, LIVE SYSTEM,
ILLUSTRATED SYSTEM, CARTOON STUDIO, THE DIGITAL FORGE). The facts — real
projects, real experience, no fabrication — never change. Follow these rules
for every change, however small.

## Visual direction

- Dark, warm, and quiet: the base is `--background` (espresso), not black and
  not parchment. One accent family only — brass (`--accent`,
  `--accent-bright`), with `--ember` held in reserve.
- Premium comes from restraint: generous spacing, a strong type scale, thin
  `--line` hairlines, and few, well-timed movements. Never add colour,
  shadows, or borders to "liven up" a section.
- The illustrations (`public/images/forge-*.png`) bleed edge to edge and
  dissolve into the page through gradient fades (`.hero-fade-x`,
  `.hero-fade-y`). They are never boxed in a card frame at the top of a page.
  The one framed use is `ParallaxFrame` (Home → About teaser).
- The `.paper` class re-themes a contained block as a parchment sheet (used
  for the About "How I think about it" panel). It is an accent, never a page
  background.
- A fixed film-grain layer (`body::after`) sits over everything. Keep it
  subtle (opacity ≈ 0.05).

## Themes

- Two themes share one token set in `src/app/globals.css`: **light** ("Day Archive":
  parchment, oxblood ink, sepia-toned prints — the default) and **dark**
  ("Night Workshop"). `html[data-theme]` selects it; a head script in
  `layout.tsx` applies the saved choice (`localStorage` key `sp-theme`) before
  paint. The sun/moon `ThemeToggle` lives in the navbar and mobile menu.
- Never hard-code a colour or assume dark: use token classes. Text sitting on
  an accent fill uses `text-on-accent` / `bg-on-accent`, never `ink`.
- New components must be checked in both themes.

## Vintage layer

Applied in both themes, stronger on light: paper grain + aged vignette
(`body::before/::after`), double-rule section dividers, drop cap (`.dropcap`),
engraving-style corner marks on cards (`.spotlight::after`), vertical plate
captions on hero art (`Illustration.caption`), fleurons (`Ornament`), and the
`.art-print` sepia filter on illustrations in the light theme. Keep these
subtle; they should read as texture, not decoration.

## Colour

- Every colour comes from the variables at the top of `src/app/globals.css`;
  components use the Tailwind names (`bg-surface`, `text-accent`,
  `border-line`, …). No new hex values in components.
- The only exception is `src/lib/brand.ts`, a literal mirror for `next/og`
  images (favicon, Apple icon, share card), which cannot read CSS variables.
  Change both together.
- Status meaning leads with text; a dot or ring only reinforces it.

## Typography

- Three families, all self-hosted through `@fontsource-variable` (no network
  requests at build or runtime):
  - **Fraunces** — display (`font-display`, `display-xl/lg/md`,
    `display-giant`). Light weights, tight leading.
  - **Geist** — body and UI (`font-sans`, the default).
  - **JetBrains Mono** — small uppercase labels only (`label` utility).
- Headings may mark one phrase with asterisks — `"plain *accent* plain"` —
  which `SplitText` / `ScrollWords` render as the italic brass
  `.accent-phrase`. Keep it to one phrase per heading.
- Poster-size text uses `display-giant`, which pins Fraunces' optical size so
  hairlines don't vanish.

## Motion system

All motion respects reduced motion: `MotionConfig reducedMotion="user"`,
Lenis' `respectReducedMotion`, and a CSS catch-all in `globals.css`. Under
reduced motion the preloader and page curtain are skipped entirely.

Approved movements — reuse these rather than inventing new ones:

- **Preloader** (`layout/preloader.tsx`) — first visit per session only; a
  brass ring counts to 100, then the panel lifts. A head script in
  `layout.tsx` hides it for repeat visits before first paint.
- **Page curtain** (`app/template.tsx`, `.page-curtain`) — a pure-CSS lift on
  every route change.
- **Smooth scroll** — Lenis via `MotionProvider`. Use `useScrollLock` for any
  overlay that should freeze scrolling.
- **SplitText** — word-by-word rise for headings. `trigger="intro"` for
  above-the-fold copy (waits for the preloader), `"view"` elsewhere.
- **Reveal** — fade and rise for everything that isn't a heading.
- **ScrollWords** — one statement per page at most, lit word by word.
- **HeroMedia** — page-opening image: settles from a slight zoom, drifts on
  scroll, leans a few pixels toward the pointer.
- **ParallaxFrame**, **Magnetic** (buttons), **SpotlightCard** (pointer glow),
  rolling labels (`.roll-group`), row sweeps (`.work-row`), the stack
  **Marquee**, and the **FlowDiagram** glint.
- **ScrollRotate + Gear** — the signature: line-drawn brass gears in the
  margins turn as the reader scrolls. Decoration only, `aria-hidden`, low
  opacity.

Durations sit between 0.5s and 1.4s on the `--ease-expo` curve. No bounce, no
wobble, no custom cursor, no WebGL/3D, no scroll-jacking (Lenis smooths
native scroll; it never hijacks it).

## Architecture

- Routes: `/` Home, `/about`, `/work`, `/contact`, and
  `/projects/[slug]` case studies. Navigation uses `next/link`; the active
  state comes from `usePathname()`.
- Keep all editable content in `src/data/portfolio.ts`, typed by
  `src/types/portfolio.ts`. Components never hard-code content (structural
  labels such as "Next project" are fine).
- Sections live in `components/sections/*-sections.tsx` grouped by page;
  shared pieces in `components/ui`; animation primitives in
  `components/motion`.
- Server Components by default. `"use client"` only where there is state,
  pointer or scroll tracking, or animation.
- Each project has a `flow` — the request path through the system — drawn by
  `FlowDiagram`. Projects have no screenshots; do not add fake ones.
- The Contact page's GitHub panel reads the public GitHub API (revalidated
  hourly). Show only what the API returns; on failure, say so.

## Voice

- Write like a person talking about their own work: first person, direct,
  a little dry. Contractions and short sentences are fine.
- No résumé-speak ("leveraged", "spearheaded", "passionate about",
  "results-driven").
- Headings can have a point of view. Voice changes how things are said,
  never what is claimed.

## Content integrity

- Never fabricate achievements, metrics, client names, titles, screenshots,
  testimonials, or GitHub activity. Every personal project traces to a real
  repository under github.com/sivapunithan, the résumé, or something
  Punithan said directly.
- No testimonials section unless Punithan supplies a real quote and
  attribution.
- Employer work stays anonymised and link-free: no client names, endpoints,
  or schemas.
- In-progress repositories are labelled "In development" / "Active
  development", never "Completed". Planned features are described as
  planned.
- The illustrations are stylised likenesses of Punithan, generated at his
  request. Never replace them with stock art or anyone else.

## Workflow

- Check layouts at 360, 390, 768, 1024 and 1440 px: no horizontal overflow,
  and no headline sitting on the illustration's subject.
- Run `npm run lint`, `npm run typecheck` and `npm run build` after any
  meaningful change, and fix everything you introduced.
- Update `README.md` when setup or architecture changes.
