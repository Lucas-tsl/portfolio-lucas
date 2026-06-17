import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OGPageProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function createOGPage({ label, title, subtitle }: OGPageProps) {
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
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,150,105,0.30) 0%, transparent 70%)",
          }}
        />
        {/* Teal aura bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Top row: author + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 56,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#a1a1aa", letterSpacing: "-0.01em" }}>
            Lucas Troteseil
          </span>
          <span style={{ fontSize: 16, color: "#3f3f46" }}>lucastroteseil.com</span>
        </div>

        {/* Label badge */}
        <div style={{ display: "flex", marginBottom: 28 }}>
          <div
            style={{
              background: "rgba(5,150,105,0.15)",
              border: "1px solid rgba(5,150,105,0.40)",
              borderRadius: 999,
              padding: "6px 18px",
              color: "#6ee7b7",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#fafafa",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: subtitle ? 20 : 0,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 24,
              color: "#71717a",
              lineHeight: 1.45,
              maxWidth: 720,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom gradient bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #059669 0%, #0d9488 100%)",
          }}
        />
      </div>
    ),
    OG_SIZE
  );
}
