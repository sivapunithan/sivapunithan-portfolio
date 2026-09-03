import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = "Sivapunithan S — Backend-Focused Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * IDEA Noir Open Graph card: dark workspace surface, mono role label with
 * a small orange active-tab indicator, display name, and one thin divider.
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
          background: "#090909",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 30, height: 3, background: "#c45f32", display: "flex" }} />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 6,
              color: "#8f8678",
              fontFamily: "monospace",
            }}
          >
            JAVA BACKEND ENGINEER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f4ebdc",
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
            color: "#c9bead",
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
