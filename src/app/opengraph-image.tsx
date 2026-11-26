import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

export const dynamic = "force-static";
export const alt = `${site.name}, ${site.role} at ${site.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fdf8ea",
          color: "#1c1917",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#5f574f" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#b4492a" }} />
          {site.role} · {site.company}
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, maxWidth: 1000, letterSpacing: -1.5 }}>
          {hero.headline}
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
          {site.name}
          <span style={{ color: "#b4492a" }}>.</span>
        </div>
      </div>
    ),
    size,
  );
}
