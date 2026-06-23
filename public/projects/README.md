# Project screenshots

Real screenshots for the Selected Work section live here.

## How to add one

1. Export a screenshot, ideally **1280×800** (16:10) PNG or WebP, dark UI
   preferred so it sits well on the IDEA Noir surfaces.
2. Save it in this folder, e.g. `public/projects/library-management.png`.
3. In `src/data/portfolio.ts`, replace the placeholder on the matching project:

   ```ts
   image: {
     src: "/projects/library-management.png",
     alt: "Library Management System — admin lending dashboard",
   },
   ```

While `image.src` is still `[ADD PROJECT SCREENSHOT]`, the site renders a
designed IDE-inspired placeholder instead — nothing breaks without files here.

Do not add fabricated screenshots, and never add screenshots of confidential
enterprise work (Project 04 stays placeholder-only by design).
