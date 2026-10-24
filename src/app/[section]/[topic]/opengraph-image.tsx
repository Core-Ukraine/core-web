import { findTopic, SECTIONS } from "@/features/catalog/model/catalog";
import { OG_SIZE } from "@/features/seo/og/assets";
import { shareAlt, shareImage } from "@/features/seo/og/image";

export const size = OG_SIZE;

export const contentType = "image/png";

type Params = Promise<{ section: string; topic: string }>;

// One share card per topic
export const generateStaticParams = () =>
  SECTIONS.flatMap((section) => section.topics.map((topic) => ({ section: section.slug, topic: topic.slug })));

// The card of the topic in the address
const cardOf = async (params: Params) => {
  const { section, topic } = await params;
  const match = findTopic(section, topic);
  return {
    eyebrow: match?.section.title ?? "",
    title: match?.topic.title ?? "",
    description: match ? `${match.topic.summary}.` : "",
  };
};

// Alt text of the share card
export const generateImageMetadata = async ({ params }: { params: Params }) => [
  { id: "card", alt: shareAlt(await cardOf(params)), size, contentType },
];

// Share card of a topic
const OpenGraphImage = async ({ params }: { params: Params }) => shareImage(await cardOf(params));

export default OpenGraphImage;
