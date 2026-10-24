import { findSection, SECTIONS } from "@/features/catalog/model/catalog";
import { OG_SIZE } from "@/features/seo/og/assets";
import { shareAlt, shareImage } from "@/features/seo/og/image";

export const size = OG_SIZE;

export const contentType = "image/png";

// One share card per section
export const generateStaticParams = () => SECTIONS.map((section) => ({ section: section.slug }));

// The card of the section in the address
const cardOf = async (params: Promise<{ section: string }>) => {
  const section = findSection((await params).section);
  return { eyebrow: "Розділ", title: section?.title ?? "", description: section?.description ?? "" };
};

// Alt text of the share card
export const generateImageMetadata = async ({ params }: { params: Promise<{ section: string }> }) => [
  { id: "card", alt: shareAlt(await cardOf(params)), size, contentType },
];

// Share card of a section
const OpenGraphImage = async ({ params }: { params: Promise<{ section: string }> }) => shareImage(await cardOf(params));

export default OpenGraphImage;
