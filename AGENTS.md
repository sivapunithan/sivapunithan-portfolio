<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — durable rules for this portfolio

This site implements **IDEA NOIR — Engineered with Intent**: an
IntelliJ-inspired engineering workspace translated into a professional
editorial website. The rules below are permanent. Follow them for every
change, however small.

## Visual direction (non-negotiable)

- Preserve the IDEA Noir direction: dark workspace surfaces, premium
  editorial spacing, thin dividers, restrained syntax-colour accents.
- Maintain IntelliJ-inspired restraint **without cloning the IDE**. IDE
  elements (breadcrumbs, gutters, indexes, tab underlines) appear only
  where they serve the content.
- All colours come from the CSS variables in `src/app/globals.css`. Do not
  introduce new hex values in components.
- Accent colours are used like syntax highlighting — one keyword, one
  divider, one index, one status word, one hover underline. Never as large
  backgrounds, large rectangles, or gradients.
  - blue: primary interactive links, active-tab indicators
  - green: completed / stable status
  - orange: Java-oriented technical emphasis
  - yellow: active-learning / in-progress status
  - lavender: rare secondary detail only

## Hard prohibitions

- No purple gradients; purple must never become a dominant colour.
- No glassmorphism, blurred glass pills, glowing borders, or neon effects.
- No random decorative icons, icon grids, or technology-logo clouds.
- No fake terminal windows, fake browser frames, or typing animations.
- No macOS window circles (red/yellow/green controls).
- No WebGL, Three.js, Spline, Lottie, particles, blobs, or 3D elements.
- No custom cursor, scroll hijacking, parallax, or continuous animation loops.
- No skill-percentage bars, pill badges, or fake metrics.
- Do not turn every section into a bordered card.

## Architecture

- Keep all editable content in `src/data/portfolio.ts`, typed by
  `src/types/portfolio.ts`. Components never hard-code content.
- Placeholders use the `[ADD …]` convention; `isPlaceholder()` in
  `src/lib/utils.ts` gates them. Placeholder URLs must never render as
  broken actions; placeholder screenshots render the designed
  `ProjectPlaceholder` visual.
- Server Components are the default. `"use client"` only at interactive
  boundaries: motion wrappers, navbar/menu state, active-section tracking.
- Use Motion for React (`motion/react`) sparingly: one-time reveals,
  180–280ms hovers, 450–750ms section reveals, hero sequence ≤ 1.5s total.
- Respect reduced motion: `MotionConfig reducedMotion="user"` is global;
  components animating non-transform properties (e.g. clip-path) must check
  `useReducedMotion` themselves.

## Typography

- Three roles only — display (`--font-display`), body (`--font-body`),
  mono (`--font-mono`). Configured in `src/app/layout.tsx`.
- JetBrains Mono is for indexes, breadcrumbs, metadata, and status labels —
  never long paragraphs.
- Local fonts only with appropriate licences (see
  `src/assets/fonts/README.md`). A missing local display font must never
  break the build.

## Content integrity

- Do not fabricate achievements, metrics, client names, promotions, titles,
  or screenshots.
- Do not expose employer-sensitive data: no client names, internal API
  endpoints, schemas, or implications that enterprise code is public.
  Project 04 (procurement case study) stays anonymised and link-free.
- Present planned features (Food Donation Platform) as planned, never as
  completed functionality.

## Workflow

- Validate mobile layouts at 360, 390, 768, 1024, 1440 px; no horizontal
  overflow.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` after any
  meaningful change and fix everything you introduced.
- Update `README.md` whenever setup or architecture changes.
