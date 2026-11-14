import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";
import { brand } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background: brand.background,
        border: `1.5px solid ${brand.accent}`,
        color: brand.accent,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontSize: 15,
        letterSpacing: -0.5,
      }}
    >
      {siteConfig.brandMark}
    </div>,
    size,
  );
}
