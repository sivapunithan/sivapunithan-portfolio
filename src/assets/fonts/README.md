# Display font — replacement guide

The display role (`--font-display`) is designed for a **premium local variable
font**. No font file is bundled because commercial display fonts require a
licence. Until one is added, Manrope doubles as the display face and the build
works without any change.

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

3. **Swap the loader** in `src/app/layout.tsx`: replace the Manrope-based
   `display` constant with the commented `next/font/local` block directly above
   it (it already points at this path).
4. Run `npm run build` to confirm the font resolves.

## Licensing reminder

Do **not** commit font files you are not licensed to self-host. Most
"free for personal use" fonts do not permit web embedding. Keep the licence
file next to the font if your foundry provides one.
