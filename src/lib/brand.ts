/**
 * Literal palette for generated images (favicon, Apple icon, Open Graph card).
 * next/og renders outside the page, so CSS variables can't reach it; these mirror
 * the tokens in src/app/globals.css and must be kept in step with them.
 */
export const brand = {
  background: "#0f0b08",
  backgroundDeep: "#090705",
  textPrimary: "#f3e9d7",
  textSecondary: "#b9aa90",
  textMuted: "#8c7d67",
  accent: "#d6a85c",
  line: "rgba(226, 190, 130, 0.3)",
} as const;
