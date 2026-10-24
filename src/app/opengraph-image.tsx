import { OG_SIZE } from "@/features/seo/og/assets";
import { shareAlt, shareImage } from "@/features/seo/og/image";
import { SITE } from "@/shared/lib/site";

const CARD = {
  eyebrow: "Освітній портал",
  title: SITE.title,
  description: "Реактори, турбіни, історія галузі та матеріали.",
};

export const size = OG_SIZE;

export const contentType = "image/png";

export const alt = shareAlt(CARD);

// Share card of the home page
const OpenGraphImage = () => shareImage(CARD);

export default OpenGraphImage;
