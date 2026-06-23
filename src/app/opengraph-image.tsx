import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = "Sivapunithan S — Backend-Focused Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * IDEA Noir Open Graph card: dark workspace surface, mono role label with
 * a small blue active-tab indicator, display name, one thin divider.
 * No icons, no gradients, no purple.
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
          background: "#1e1f22",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 30, height: 3, background: "#6ea8fe", display: "flex" }} />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 6,
              color: "#7a7e85",
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
            color: "#dfe1e5",
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
            background: "rgba(255, 255, 255, 0.09)",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 22,
            color: "#bcbec4",
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
