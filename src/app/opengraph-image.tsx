import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 88px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Amber glow */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(251,191,36,0.22), transparent 70%)",
        }}
      />
      {/* Badge */}
      <div
        style={{
          display: "flex",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: "#451a03",
            border: "1px solid #92400e",
            borderRadius: 999,
            padding: "6px 20px",
            fontSize: 13,
            fontWeight: 700,
            color: "#fde68a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Portfolio 2026
        </div>
      </div>
      {/* Name */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 800,
          color: "#fafafa",
          lineHeight: 1.05,
          marginBottom: 16,
          letterSpacing: "-0.03em",
        }}
      >
        Lucas Troteseil
      </div>
      {/* Title */}
      <div
        style={{
          fontSize: 26,
          color: "#a1a1aa",
          marginBottom: 52,
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        Chef de projet Data / IA &amp; Développeur Web · Bordeaux
      </div>
      {/* Tech tags */}
      <div style={{ display: "flex", gap: 10 }}>
        {["Next.js", "TypeScript", "WordPress", "IA", "SEO"].map((tag) => (
          <div
            key={tag}
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 15,
              color: "#71717a",
              fontWeight: 500,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
      {/* URL bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 52,
          right: 88,
          fontSize: 17,
          color: "#3f3f46",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        lucastroteseil.com
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
