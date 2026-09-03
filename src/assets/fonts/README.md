# Display font — replacement guide

The display role (`--font-display`) is designed for a **premium local variable
font**. No font file is bundled because commercial display fonts require a
licence. Until one is added, the display, body, and mono roles use local system
stacks declared in `src/app/globals.css`; builds require no network request.

## How to activate a local display font

1. **Obtain a licensed font.** Buy or download a sans-serif variable font with
   a webfont (self-hosting) licence. Good sources:
   - Free, open licence: [Fontshare](https://www.fontshare.com) (e.g. General Sans,
     Clash Grotesk), [Google Fonts](https://fonts.google.com) (download as woff2)
   - Commercial: Pangram Pangram, Klim, Grilli Type — check the self-hosting tier.
2. **Place the file here** as:

   ```
   src/assets/fonts/display-variable.woff2
   ```

3. **Load it locally** with `next/font/local` in `src/app/layout.tsx`, exposing
   it as `--font-display`, or add a licensed `@font-face` declaration in
   `src/app/globals.css`.
4. Run `npm run build` to confirm the font resolves.

## Licensing reminder

Do **not** commit font files you are not licensed to self-host. Most
"free for personal use" fonts do not permit web embedding. Keep the licence
file next to the font if your foundry provides one.
