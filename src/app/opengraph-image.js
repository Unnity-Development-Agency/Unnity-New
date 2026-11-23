import { ImageResponse } from "next/og";
export const alt =
  "Unnity Media — Digital marketing and creative. Big ideas. Real-world impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function SocialImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#fdfcfe",
        color: "#0f032b",
        padding: "66px 80px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 25, color: "#7c6a96" }}>
        Unnity Media · Digital marketing · Development House
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          letterSpacing: "-4px",
          lineHeight: 1.1,
        }}
      >
        <span>Big ideas.</span>
        <span>Real-world impact.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          borderTop: "2px solid #d8cbe9",
          paddingTop: 28,
        }}
      >
        Brand strategy · Paid media · Content & creative
      </div>
    </div>,
    size,
  );
}
