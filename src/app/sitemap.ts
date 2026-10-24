import type { MetadataRoute } from "next";

import { PAGES, SECTIONS, sectionHref, topicHref } from "@/features/catalog/model/catalog";
import { siteUrl } from "@/shared/lib/site";

// Sitemap with the home page, every section and topic, the project and the news
const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteUrl();
  // An entry for an address of the site
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: new URL(path, base).href,
    changeFrequency: "weekly",
    priority,
  });
  return [
    entry("/", 1),
    ...SECTIONS.map((section) => entry(sectionHref(section), 0.9)),
    ...SECTIONS.flatMap((section) => section.topics.map((topic) => entry(topicHref(section, topic), 0.8))),
    entry(PAGES.about.href, 0.6),
    entry(PAGES.news.href, 0.6),
  ];
};

export default sitemap;
