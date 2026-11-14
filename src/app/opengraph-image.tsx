import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";
import { brand } from "@/lib/brand";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card: the brass ring mark, the name in serif, and the one-line positioning. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.background,
          padding: "72px 88px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
              border: `2px solid ${brand.accent}`,
              color: brand.textPrimary,
              fontStyle: "italic",
              fontSize: 26,
            }}
          >
            {siteConfig.brandMark}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: 5,
              color: brand.accent,
            }}
          >
            {siteConfig.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              letterSpacing: -4,
              color: brand.textPrimary,
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              fontStyle: "italic",
              color: brand.textSecondary,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${brand.line}`,
            paddingTop: 26,
            fontFamily: "monospace",
            fontSize: 20,
            color: brand.textMuted,
          }}
        >
          <div style={{ display: "flex" }}>Java · Spring Boot · SQL · Next.js</div>
          <div style={{ display: "flex" }}>{siteConfig.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
