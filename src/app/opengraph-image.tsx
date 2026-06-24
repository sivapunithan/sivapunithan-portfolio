import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = "Sivapunithan S — Backend-Focused Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * IDEA Noir Open Graph card: dark workspace surface, mono role label with
 * a small neon-pink active-tab indicator, display name, one thin divider.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#080812",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 30, height: 3, background: "#ff2bd6", display: "flex" }} />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 6,
              color: "#8f8aa8",
              fontFamily: "monospace",
            }}
          >
            BACKEND-FOCUSED FULL-STACK DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#fff7fd",
          }}
        >
          {siteConfig.name}.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: "100%",
            height: 1,
            background: "rgba(255, 255, 255, 0.14)",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 22,
            color: "#d8d2e8",
            fontFamily: "monospace",
          }}
        >
          Java · Spring Boot · SQL · Next.js · TypeScript
        </div>
      </div>
    ),
    size,
  );
}
