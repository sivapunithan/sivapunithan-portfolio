# Sivapunithan S — Portfolio

**The Night Workshop.** A multi-page, motion-led portfolio for a Java backend
engineer: deep espresso surfaces, brass accents, Fraunces serif headlines, and
four painted steampunk illustrations that open each page. Design and
engineering rules live in [`AGENTS.md`](AGENTS.md).

## Tech stack

- [Next.js](https://nextjs.org) App Router (v16), Server Components by default
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- [Motion](https://motion.dev) (`motion/react`) for reveals, parallax and hover physics
- [Lenis](https://lenis.darkroom.engineering) for inertia scrolling
- Self-hosted variable fonts via `@fontsource-variable`: Fraunces, Geist, JetBrains Mono
- ESLint 9 + Prettier

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run start      # serve the production build
npm run format     # Prettier
```

## Pages

| Route | Opens with | Contents |
| --- | --- | --- |
| `/` | `forge-hero.png` | Hero, scroll-lit statement, project index, stack marquee, About teaser |
| `/about` | `forge-about.png` | Introduction and facts, request-path model, experience, education, current focus |
| `/work` | `forge-stack.png` | Each project with its request path, then the toolbox |
| `/contact` | `forge-contact.png` | Email, other channels, live GitHub activity |
| `/projects/[slug]` | — | Case study per project, statically generated from the data file |

Every page except Contact ends in a large "Let's talk" invitation in the footer.

## Motion

- **Preloader** — first visit per session; skipped for repeat visits and reduced motion.
- **Page curtain** — a CSS lift on every route change (`src/app/template.tsx`).
- **Headlines** rise word by word; other content fades up as it enters view.
- **Illustrations** settle from a slight zoom, drift on scroll and lean toward the pointer.
- **Gears** in the margins turn with the scroll position.
- **Buttons** are magnetic with rolling labels; cards carry a pointer-tracked glow.

Everything respects `prefers-reduced-motion`.

## Themes

Light ("Day Archive", parchment with sepia-toned illustrations) is the default;
dark ("Night Workshop") is one click away. The sun/moon switch in the header
flips between them and remembers the choice. Both are defined as colour
tokens in `src/app/globals.css`, so components never hard-code a theme.

## Editing content

All content lives in **`src/data/portfolio.ts`**, typed by
`src/types/portfolio.ts`: site config, navigation, page hero copy, projects
(including each project's request `flow`), experience, education, focus items
and contact copy. Wrap one phrase of a heading in asterisks to set it in the
italic brass accent: `"I build things *that last.*"`.

Illustrations live in `public/images/`. Each one's crop is controlled by its
`illustration.position` (a CSS `object-position`) in the data file.

The originals were generated at 1024 px wide, which looks soft when drawn
large. The files in `public/images/` are 2× Lanczos upscales with light
sharpening, served by Next.js as AVIF at quality 90 (`next.config.ts`). For the
sharpest result, regenerate or AI-upscale the illustrations at 2048 px or wider
and replace the files with the same names.

The Contact page reads public activity for `siteConfig.githubUsername` from the
GitHub API, refreshed hourly; nothing there is hard-coded.

### Résumé

`public/resume.pdf` is served at `/resume.pdf`. Replace the file to update it.

## Deployment

1. Set `siteConfig.domain` in `src/data/portfolio.ts` so metadata, the sitemap
   and robots resolve to the real URL.
2. `npm run build` then `npm run start`, or deploy the repo to Vercel.

## Folder structure

```
src/
  app/                 layout, template (page curtain), routes, metadata images
  components/
    layout/            navbar, mobile menu, preloader, footer
    motion/            providers and animation primitives
    sections/          page sections grouped by page
    project/           case-study page
    ui/                buttons, cards, chips, gear, marquee, flow diagram, icons
  data/portfolio.ts    all editable content
  hooks/               scroll lock
  lib/                 utilities and the literal palette for generated images
  types/portfolio.ts   content models
public/images/         page illustrations
scripts/               placeholder-résumé generator (one-off utility)
```
