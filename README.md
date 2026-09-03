# Sivapunithan S — Portfolio

**IDEA NOIR — Engineered with Intent.** A single-page portfolio for a
backend-focused full-stack developer, designed as a premium engineering
site introduced by a short Java-editor narrative. After the intro, the site
becomes an editorial engineering portfolio with dark surfaces, generous
spacing, thin dividers, and occasional IDE details where they add meaning.

## Tech stack

- [Next.js](https://nextjs.org) App Router (v16) — Server Components by default
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- [Motion for React](https://motion.dev) (`motion/react`) — conservative, one-time reveals
- local/system font stacks (no build-time font download) and `next/image`
- ESLint 9 + Prettier

## Local setup

```bash
npm install
npm run dev        # development server → http://localhost:3000
```

Other commands:

```bash
npm run lint           # ESLint
npm run typecheck      # TypeScript validation (tsc --noEmit)
npm run build          # production build
npm run start          # serve the production build
npm run format         # Prettier write
```

## Deployment

Any Node host or Vercel works:

1. Set the production domain in `src/data/portfolio.ts` (`siteConfig.domain`)
   so metadata, sitemap, and robots resolve to the real URL.
2. `npm run build` then `npm run start`, or connect the repo to Vercel —
   zero extra configuration is required.

## Content customisation

All content lives in **`src/data/portfolio.ts`** (typed by
`src/types/portfolio.ts`): site config, navigation, social links, projects,
intro and hero copy, stack groups, experience, focus items, and contact copy. Components never
hard-code content — edit the data file only.

### Placeholder checklist

Search `src/data/portfolio.ts` for `[ADD` and replace:

- [ ] `[ADD PORTRAIT IMAGE]` — optional portrait (abstract visual shown until set)
- [ ] `[ADD PROJECT REPOSITORY URL]` — per-project repo links (hidden until set)
- [ ] `[ADD PROJECT SCREENSHOT]` — per-project images (designed placeholder until set)

Email is already set. Placeholder links are never rendered as broken
actions; placeholder screenshots render a designed IDE-inspired visual.

### Screenshots

See [`public/projects/README.md`](public/projects/README.md). Drop a
1280×800 image into `public/projects/` and point the project's `image.src`
at it.

### Résumé

`public/resume.pdf` is a generated placeholder — replace it with the real
résumé (same filename) or change `siteConfig.resumePath`.

### Social links & metadata domain

Edit `socialLinks` and `siteConfig.domain` in `src/data/portfolio.ts`.
The OG image, sitemap, and robots files pick the domain up automatically.

### Fonts

The three roles use resilient local/system stacks, so production builds never
download a font. To add a premium local display font, follow
[`src/assets/fonts/README.md`](src/assets/fonts/README.md). **Only self-host
fonts you are licensed to embed.**

## Narrative intro

`CodeEditorIntro` is a small client boundary layered over the already-rendered
hero. It runs once per browser session, closes automatically after about 4.6
seconds, supports an immediate button or Escape skip, and is bypassed for
reduced-motion users. All remaining page sections are Server Components except
the existing navigation and one-time motion boundaries.

## Project routes

`src/app/projects/[slug]/page.tsx` statically generates a case-study route for
every project in `src/data/portfolio.ts`. Invalid slugs return not found; no
project route is hard-coded separately.

## Reduced motion

`MotionConfig reducedMotion="user"` disables transform-based animation
globally for users with `prefers-reduced-motion`; clip-path reveals check
`useReducedMotion` and render statically; CSS underline/hover transitions
are wrapped in `prefers-reduced-motion` media queries; smooth scrolling is
only enabled for `no-preference` users.

## Folder structure

```
src/
  app/                 layout, page, globals.css, metadata routes, and
                       data-driven projects/[slug] pages
  assets/fonts/        local display font slot + replacement guide
  components/
    intro/             session hook, editor profile, narrative intro boundary
    layout/            navbar, mobile menu, footer, active-section provider
    sections/          hero, introduction, projects, architecture, experience,
                       stack, education, current focus, contact
    project/           project-feature, project-visual, project-placeholder,
                       project-links
    ui/                container, section-label, text-link, status-label
    motion/            motion-provider, mask-reveal, fade-up, image-reveal,
                       section-reveal
  data/portfolio.ts    ALL editable content + placeholders
  types/portfolio.ts   typed content models
  lib/utils.ts         cn(), isPlaceholder(), getSiteUrl()
public/
  resume.pdf           placeholder résumé (replace)
  projects/            real screenshots (optional)
scripts/               placeholder-résumé generator (one-off utility)
```

Durable design and architecture rules for future changes live in
[`AGENTS.md`](AGENTS.md).
