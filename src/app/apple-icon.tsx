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
        background: "#050510",
        borderRadius: 36,
        border: "2px solid rgba(255, 43, 214, 0.6)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        color: "#fff7fd",
        fontFamily: "Arial, sans-serif",
        fontWeight: 800,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255, 43, 214, 0.22), transparent 60%)",
        }}
      />
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
            textShadow: "0 0 18px rgba(255, 43, 214, 0.55)",
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
            color: "rgba(248, 152, 32, 0.95)",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          <span
            style={{
              width: 14,
              height: 3,
              borderRadius: 999,
              background: "#f89820",
              display: "flex",
              boxShadow: "0 0 12px rgba(248, 152, 32, 0.8)",
            }}
          />
          JAVA
        </div>
      </div>
    </div>,
    size,
  );
}
