import { PAGES } from "@/features/catalog/model/catalog";
import { OG_SIZE } from "@/features/seo/og/assets";
import { shareAlt, shareImage } from "@/features/seo/og/image";
import { SITE } from "@/shared/lib/site";

const CARD = { eyebrow: SITE.name, title: PAGES.news.title, description: PAGES.news.description };

export const size = OG_SIZE;

export const contentType = "image/png";

export const alt = shareAlt(CARD);

// Share card of the page
const OpenGraphImage = () => shareImage(CARD);

export default OpenGraphImage;
