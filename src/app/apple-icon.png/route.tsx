import { ImageResponse } from "next/og";
import { MONOGRAM_PATHS } from "@/components/brand/geometry";

export const dynamic = "force-static";

/** Emitted as out/apple-icon.png (a real file name for static hosts). */
export function GET() {
  const { b, c, joint } = MONOGRAM_PATHS;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171715",
        }}
      >
        <svg width="116" height="116" viewBox="0 0 64 64" fill="none">
          <path d={c} stroke="#E9E2D5" strokeWidth="3.2" />
          <path d={b} stroke="#E9E2D5" strokeWidth="3.2" />
          <rect x={joint.x} y={joint.y} width={joint.size} height={joint.size} fill="#A76A45" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
