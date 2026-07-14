import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#14110f",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#cfa06c",
            marginBottom: 40,
          }}
        >
          RENOMA
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.2,
            color: "#faf7f2",
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          Wir stehen auf Ihrer Seite.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(250,247,242,0.6)",
            marginTop: 32,
            maxWidth: 800,
          }}
        >
          Renovieren, ohne sich darum kümmern zu müssen.
        </div>
      </div>
    ),
    size
  );
}
