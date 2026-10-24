import { Martian_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";

// Unbounded for Cyrillic headings and the name, in light static files
export const unboundedCyrillic = localFont({
  src: [
    { path: "../shared/assets/fonts/unbounded-cyrillic-600.woff2", weight: "600" },
    { path: "../shared/assets/fonts/unbounded-cyrillic-700.woff2", weight: "700" },
  ],
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116" }],
  // The Latin part brings the fallback, so marks never stick to a system font
  adjustFontFallback: false,
  variable: "--font-unbounded-cyrillic",
});

// Unbounded for digits and punctuation in headings, preloaded as well
export const unboundedLatin = localFont({
  src: [{ path: "../shared/assets/fonts/unbounded-latin-600.woff2", weight: "600" }],
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  variable: "--font-unbounded-latin",
});

// Montserrat for text, the menu and buttons, one variable file
export const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
});

// Martian Mono for the technical labels, a match for Unbounded, not preloaded
export const martianMono = Martian_Mono({
  subsets: ["cyrillic"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-martian-mono",
});

// The class names that define the font variables
export const fontVariables = [unboundedCyrillic, unboundedLatin, montserrat, martianMono]
  .map((font) => font.variable)
  .join(" ");
