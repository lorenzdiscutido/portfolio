import { ImageResponse } from "next/og";

export const alt = "Jose Lorenzo Discutido | Systems Engineer";
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
          background: "#0f1115",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#f8fafc",
          border: "14px solid #1e2128",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "24px",
                background: "#FF7A00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0f1115",
                fontWeight: 900,
                fontSize: "24px",
                marginRight: "16px",
              }}
            >
              J
            </div>
            <span
              style={{
                color: "#FF7A00",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "4px",
              }}
            >
              JOSE LORENZO DISCUTIDO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              background: "#1e2128",
              color: "#94a3b8",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "18px",
              border: "1px solid #2d313a",
            }}
          >
            Digital Data &amp; Systems Engineer
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "62px",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            <span>Digital Data &amp;&nbsp;</span>
            <span style={{ color: "#0052FF" }}>Systems Engineer</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#94a3b8",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            Bridging physical hardware &amp; automated kiosk fleets with enterprise cloud infrastructure, zero-trust Tailscale networks, and Gemini AI.
          </div>
        </div>

        {/* Bottom Skill Tags */}
        <div style={{ display: "flex" }}>
          {[
            "PUP Computer Engineering",
            "Vonotec AI/IoT",
            "Tailscale Mesh",
            "Gemini Multimodal",
            "Microsoft Entra ID",
          ].map((tag, idx) => (
            <div
              key={tag}
              style={{
                display: "flex",
                background: "#1e2128",
                color: "#f8fafc",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: 600,
                border: "1px solid #2d313a",
                marginRight: idx === 4 ? "0px" : "14px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
