import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

// The palette of the site, for images drawn outside the CSS
export const OG_COLORS = {
  bg: "#0b1424",
  surface: "#111e33",
  line: "#22355a",
  blue: "#1d488c",
  red: "#e30220",
  accent: "#7fa6e6",
  heading: "#ffffff",
  body: "#c3cfe0",
  muted: "#8c9db8",
  grid: "rgba(127, 166, 230, 0.06)",
} as const;

// Families with their Cyrillic part, for the fontFamily of images
export const OG_FAMILIES = {
  display: "Unbounded, Unbounded Cyrillic",
  sans: "Montserrat, Montserrat Cyrillic",
  mono: "Martian Mono, Martian Mono Cyrillic",
} as const;

const fontDirectory = join(process.cwd(), "src/shared/assets/fonts");

const subsets = ["latin", "cyrillic"] as const;

const faces = [
  { name: "Unbounded", file: "unbounded", weight: 600 },
  { name: "Unbounded", file: "unbounded", weight: 700 },
  { name: "Montserrat", file: "montserrat", weight: 600 },
  { name: "Martian Mono", file: "martian-mono", weight: 400 },
] as const;

// Each subset gets a name of its own; Satori keeps one file per name and weight
export const OG_FONTS = await Promise.all(
  faces.flatMap(({ name, file, weight }) =>
    subsets.map(async (subset) => ({
      name: subset === "cyrillic" ? `${name} Cyrillic` : name,
      data: await readFile(join(fontDirectory, `${file}-${subset}-${weight}.woff`)),
      weight,
      style: "normal" as const,
    })),
  ),
);
