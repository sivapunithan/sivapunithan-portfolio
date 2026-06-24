import { ImageResponse } from "next/og";

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
        background: "#050510",
        border: "1px solid rgba(255, 43, 214, 0.55)",
        borderRadius: 8,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        color: "#fff7fd",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255, 43, 214, 0.18), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          letterSpacing: -1,
          textShadow: "0 0 6px rgba(255, 43, 214, 0.45)",
        }}
      >
        SP
      </div>
      <div
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          width: 4,
          height: 4,
          borderRadius: 999,
          background: "#f89820",
          boxShadow: "0 0 6px rgba(248, 152, 32, 0.75)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6,
          right: 6,
          bottom: 4,
          height: 1,
          background: "rgba(255, 43, 214, 0.7)",
        }}
      />
    </div>,
    size,
  );
}
