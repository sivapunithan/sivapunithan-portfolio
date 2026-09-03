import { ImageResponse } from "next/og";

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
        background: "#090909",
        border: "2px solid rgba(244, 235, 220, 0.24)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        color: "#f4ebdc",
        fontFamily: "Arial, sans-serif",
        fontWeight: 800,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            letterSpacing: -6,
          }}
        >
          SP
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#c45f32",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          <span
            style={{
              width: 14,
              height: 3,
              background: "#c45f32",
              display: "flex",
            }}
          />
          JAVA
        </div>
      </div>
    </div>,
    size,
  );
}
