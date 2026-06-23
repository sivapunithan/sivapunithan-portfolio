# Sivapunithan S — Portfolio

**IDEA NOIR — Engineered with Intent.** A single-page portfolio for a
backend-focused full-stack developer, designed as a premium engineering
workspace inspired by IntelliJ IDEA's dark aesthetic — without cloning the
IDE. Dark workspace surfaces, editorial spacing, thin dividers, three-role
typography, and syntax-colour accents used as sparingly as syntax
highlighting itself.

## Tech stack

- [Next.js](https://nextjs.org) App Router (v16) — Server Components by default
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- [Motion for React](https://motion.dev) (`motion/react`) — conservative, one-time reveals
- `next/font` (Manrope + JetBrains Mono) and `next/image`
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
stack groups, experience, focus items, and contact copy. Components never
hard-code content — edit the data file only.

### Placeholder checklist

Search `src/data/portfolio.ts` for `[ADD` and replace:

- [ ] `[ADD LINKEDIN URL]` — LinkedIn profile (link hidden until set)
- [ ] `[ADD GITHUB URL]` — GitHub profile (link hidden until set)
- [ ] `[ADD PRODUCTION DOMAIN]` — production domain for SEO/sitemap
- [ ] `[ADD COMPANY NAME]` — employer in the experience section
- [ ] `[ADD PROJECT REPOSITORY URL]` — per-project repo links (hidden until set)
- [ ] `[ADD LIVE DEMO URL]` — per-project demo links (hidden until set)
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

### Custom display font

The display role currently falls back to Manrope. To use a premium local
font, follow [`src/assets/fonts/README.md`](src/assets/fonts/README.md):
place a licensed `display-variable.woff2` there and swap the loader block in
`src/app/layout.tsx`. **Only self-host fonts you are licensed to embed.**

## Reduced motion

`MotionConfig reducedMotion="user"` disables transform-based animation
globally for users with `prefers-reduced-motion`; clip-path reveals check
`useReducedMotion` and render statically; CSS underline/hover transitions
are wrapped in `prefers-reduced-motion` media queries; smooth scrolling is
only enabled for `no-preference` users.

## Folder structure

```
src/
  app/                 layout (fonts, metadata, chrome), page, globals.css,
                       sitemap.ts, robots.ts, opengraph-image.tsx
  assets/fonts/        local display font slot + replacement guide
  components/
    layout/            workspace-bar, navbar, mobile-menu, workspace-gutter,
                       footer, active-section-provider
    sections/          hero, introduction, projects, stack, experience,
                       current-focus, contact
    project/           project-feature, project-visual, project-placeholder,
                       project-links
    ui/                container, section-label, divider, text-link,
                       status-label, breadcrumb
    motion/            motion-provider, text-reveal, mask-reveal, fade-up,
                       image-reveal, section-reveal
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
