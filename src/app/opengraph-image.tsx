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
          backgroundColor: "#252422",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#b58a63",
            marginBottom: 40,
          }}
        >
          RENOMA
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.2,
            color: "#f7f4ee",
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          Wir stehen auf Ihrer Seite.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(247,244,238,0.65)",
            marginTop: 32,
            maxWidth: 800,
          }}
        >
          Sie freuen sich auf Ihr neues Zuhause. Wir kümmern uns um den Weg dorthin.
        </div>
      </div>
    ),
    size
  );
}
