import { ImageResponse } from "next/og";

export const alt = "Lucas Troteseil — Chef de projet Data / IA & Développeur Web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Next.js 15", "WordPress", "SEO Technique", "Python / IA"];
const STATS = [
  { value: "5", label: "Projets" },
  { value: "4", label: "Marques" },
  { value: "+40%", label: "Trafic" },
  { value: "98/100", label: "Lighthouse" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Emerald aura top-left */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -140,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,150,105,0.38) 0%, transparent 70%)",
          }}
        />
        {/* Teal aura bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div style={{ display: "flex", marginBottom: 40 }}>
          <div
            style={{
              background: "rgba(5,150,105,0.15)",
              border: "1px solid rgba(5,150,105,0.45)",
              borderRadius: 999,
              padding: "7px 20px",
              color: "#6ee7b7",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Portfolio 2026 · Bordeaux, France
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#059669",
            lineHeight: 1.05,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Lucas Troteseil
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 26,
            color: "#d4d4d8",
            fontWeight: 500,
            marginBottom: 36,
            lineHeight: 1.35,
          }}
        >
          Chef de projet Data / IA &amp; Développeur Web
        </div>

        {/* Divider bar */}
        <div
          style={{
            width: 56,
            height: 4,
            background: "#059669",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(5,150,105,0.1)",
                border: "1px solid rgba(5,150,105,0.25)",
                borderRadius: 10,
                padding: "10px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 800, color: "#059669" }}>{s.value}</span>
              <span style={{ fontSize: 12, color: "#6ee7b7", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {TAGS.map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "7px 16px",
                color: "#a1a1aa",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 72,
            color: "#52525b",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          lucastroteseil.com
        </div>
      </div>
    ),
    { ...size }
  );
}
