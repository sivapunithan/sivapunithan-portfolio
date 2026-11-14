import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.background,
      }}
    >
      <div
        style={{
          width: 132,
          height: 132,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 66,
          border: `3px solid ${brand.accent}`,
          color: brand.textPrimary,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 58,
          letterSpacing: -2,
        }}
      >
        {siteConfig.brandMark}
      </div>
    </div>,
    size,
  );
}
