import { assembly } from "@/features/home/model/assembly";
import { SITE } from "@/shared/lib/site";

import { OG_COLORS, OG_FAMILIES } from "./assets";

const RODS = assembly();

// Rod colours of the drawing: fill and outline
const ROD_COLORS = {
  rod: { fill: OG_COLORS.blue, stroke: OG_COLORS.accent, width: 1.5 },
  guide: { fill: OG_COLORS.bg, stroke: OG_COLORS.red, width: 2 },
  centre: { fill: OG_COLORS.red, stroke: OG_COLORS.red, width: 0 },
} as const;

// The logo mark drawn for images; small marks keep only the hexagon and the centre
export const OgMark = ({ size, color = OG_COLORS.accent }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <polygon
      points="38,20 29,35.6 11,35.6 2,20 11,4.4 29,4.4"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {size > 24
      ? [
          [28.5, 20],
          [24.25, 27.36],
          [15.75, 27.36],
          [11.5, 20],
          [15.75, 12.64],
          [24.25, 12.64],
        ].map(([x, y]) => (
          <circle key={`${x},${y}`} cx={x} cy={y} r="2.6" fill="none" stroke={color} strokeWidth="1.6" />
        ))
      : null}
    <circle cx="20" cy="20" r="3.4" fill={OG_COLORS.red} />
  </svg>
);

// The fuel assembly of the first screen, for share cards
export const OgAssembly = ({ size }: { size: number }) => (
  <svg width={size} height={(size * 380) / 430} viewBox="-200 -190 430 380">
    <polygon
      points="184,0 92,159.3 -92,159.3 -184,0 -92,-159.3 92,-159.3"
      fill="none"
      stroke={OG_COLORS.line}
      strokeWidth="1.5"
      strokeDasharray="6 6"
    />
    <polygon
      points="172,0 86,149 -86,149 -172,0 -86,-149 86,-149"
      fill={OG_COLORS.surface}
      stroke={OG_COLORS.accent}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {RODS.map(({ x, y, kind }) => (
      <circle
        key={`${x},${y}`}
        cx={x}
        cy={y}
        r="10"
        fill={ROD_COLORS[kind].fill}
        stroke={ROD_COLORS[kind].stroke}
        strokeWidth={ROD_COLORS[kind].width}
      />
    ))}
  </svg>
);

interface ShareCardProps {
  eyebrow: string;
  title: string;
  description: string;
}

// A share card: the logo, a label, the title with its description and the drawing
export const ShareCard = ({ eyebrow, title, description }: ShareCardProps) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      padding: "64px 72px",
      gap: 56,
      color: OG_COLORS.heading,
      fontFamily: OG_FAMILIES.sans,
      backgroundColor: OG_COLORS.bg,
      backgroundImage: `linear-gradient(${OG_COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${OG_COLORS.grid} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <OgMark size={64} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: OG_FAMILIES.display, fontWeight: 700, fontSize: 36, letterSpacing: 2 }}>
            {SITE.name}
          </span>
          <span style={{ fontFamily: OG_FAMILIES.mono, fontSize: 16, letterSpacing: 2, color: OG_COLORS.muted }}>
            {SITE.tagline.toUpperCase()}
          </span>
        </div>
      </div>
      <span
        style={{
          marginTop: "auto",
          fontFamily: OG_FAMILIES.mono,
          fontSize: 22,
          letterSpacing: 3,
          color: OG_COLORS.accent,
        }}
      >
        {eyebrow.toUpperCase()}
      </span>
      <span
        style={{
          marginTop: 20,
          fontFamily: OG_FAMILIES.display,
          fontWeight: 600,
          fontSize: title.length > 40 ? 46 : 58,
          lineHeight: 1.15,
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginTop: 28,
          paddingLeft: 22,
          borderLeft: `4px solid ${OG_COLORS.red}`,
          fontSize: 26,
          lineHeight: 1.45,
          color: OG_COLORS.body,
        }}
      >
        {description}
      </span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <OgAssembly size={340} />
    </div>
  </div>
);

// The app icon: the mark on the night background, smaller when the system masks it
export const OgAppIcon = ({ size, maskable = false }: { size: number; maskable?: boolean }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      backgroundColor: OG_COLORS.bg,
    }}
  >
    <OgMark size={Math.round(size * (maskable ? 0.56 : 0.72))} />
  </div>
);
