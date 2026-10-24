import { ImageResponse } from "next/og";

import { OG_FONTS, OG_SIZE } from "./assets";
import { OgAppIcon, ShareCard } from "./components";

export interface ShareImage {
  eyebrow: string;
  title: string;
  description: string;
}

// The share card of a page as a PNG
export const shareImage = (card: ShareImage) =>
  new ImageResponse(<ShareCard {...card} />, { ...OG_SIZE, fonts: OG_FONTS });

// The app icon in a size as a PNG
export const appIcon = (size: number, maskable = false) =>
  new ImageResponse(<OgAppIcon size={size} maskable={maskable} />, { width: size, height: size });

// The alt text of a share card
export const shareAlt = ({ title, description }: ShareImage) => `${title}. ${description}`;
