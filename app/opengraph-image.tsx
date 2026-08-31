import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0c1220 0%, #132238 45%, #1a365d 100%)",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 600, color: "#86efac" }}>
            EV CHARGING · ENERGY STORAGE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 20, maxWidth: 820, fontSize: 34, lineHeight: 1.35, color: "#cbd5e1" }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>
          Home charging · Fleet · Highway · M-Pesa
        </div>
      </div>
    ),
    { ...size },
  );
}
