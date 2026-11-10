import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Jose Lorenzo Discutido | Digital Data & Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  let profileSrc = "";
  try {
    const profilePath = path.join(process.cwd(), "public", "profile.jpg");
    profileSrc = `data:image/jpeg;base64,${fs.readFileSync(profilePath).toString("base64")}`;
  } catch {
    profileSrc = "https://my-portfolio-ten-zeta-56.vercel.app/profile.jpg";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#090b0e",
          color: "#f8fafc",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left Information Panel */}
        <div
          style={{
            width: "660px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 0 56px 64px",
            position: "relative",
          }}
        >
          {/* Top Overline & Recruiter Status */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                color: "#38bdf8",
                fontWeight: 700,
              }}
            >
              ENGINEERING PORTFOLIO // 2026
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.25)",
                margin: "0 14px",
                fontSize: "14px",
              }}
            >
              •
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#10b981",
                padding: "4px 12px",
                borderRadius: "999px",
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: "8px", marginRight: "6px" }}>●</span>
              <span>Available for Roles</span>
            </div>
          </div>

          {/* Central Hero Identity */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: 900,
                letterSpacing: "-1.8px",
                lineHeight: 1.05,
                color: "#ffffff",
                marginBottom: "12px",
                display: "flex",
              }}
            >
              Lorenz Discutido
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0052FF",
                  letterSpacing: "-0.5px",
                  marginRight: "12px",
                }}
              >
                Digital Data &amp; Systems Engineer
              </span>
              <div
                style={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  background: "rgba(0, 82, 255, 0.12)",
                  border: "1px solid rgba(0, 82, 255, 0.35)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  color: "#38bdf8",
                  fontWeight: 600,
                }}
              >
                BS CpE • PUP
              </div>
            </div>

            <div
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                lineHeight: 1.5,
                maxWidth: "520px",
                display: "flex",
              }}
            >
              Bridging cyber-physical kiosk fleets with enterprise cloud governance, zero-trust WireGuard mesh topologies, and multimodal Gemini AI vision.
            </div>
          </div>

          {/* Bottom Telemetry Metrics Grid */}
          <div
            style={{
              display: "flex",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              maxWidth: "520px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "36px",
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}
              >
                4,750+
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: "2px",
                  letterSpacing: "0.5px",
                }}
              >
                DEFECTS PROCESSED
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "36px",
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}
              >
                0ms
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: "2px",
                  letterSpacing: "0.5px",
                }}
              >
                SPLIT-BRAIN FAILOVER
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}
              >
                100%
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: "2px",
                  letterSpacing: "0.5px",
                }}
              >
                ZERO-TRUST INTUNE
              </span>
            </div>
          </div>
        </div>

        {/* Right Portrait & Specular Gradient Panel */}
        <div
          style={{
            width: "540px",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {profileSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profileSrc}
              alt="Jose Lorenzo Discutido"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          )}

          {/* Left Obsidian Melt Gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "240px",
              background:
                "linear-gradient(to right, #090b0e 0%, rgba(9, 11, 14, 0.7) 40%, rgba(9, 11, 14, 0) 100%)",
            }}
          />

          {/* Bottom Obsidian Melt Gradient */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "110px",
              background:
                "linear-gradient(to top, #090b0e 0%, rgba(9, 11, 14, 0) 100%)",
            }}
          />

          {/* Docked Tailnet Telemetry Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              right: "28px",
              background: "rgba(15, 17, 21, 0.9)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              padding: "8px 16px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              color: "#38bdf8",
              fontSize: "12px",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}
          >
            SYS: ONLINE // TAILNET 100.64.0.0/10
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
