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
        background: "#090909",
        border: "1px solid rgba(244, 235, 220, 0.24)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        color: "#f4ebdc",
        fontFamily: "Arial, sans-serif",
        fontWeight: 700,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          letterSpacing: -1,
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
          background: "#c45f32",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6,
          right: 6,
          bottom: 4,
          height: 1,
          background: "#c45f32",
        }}
      />
    </div>,
    size,
  );
}
