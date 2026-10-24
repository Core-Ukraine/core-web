import type { Metadata } from "next";

import About from "@/features/home/ui/About/About";
import Hero from "@/features/home/ui/Hero/Hero";
import Overview from "@/features/home/ui/Overview/Overview";
import { NEWS } from "@/features/news/model/news";
import NewsBanner from "@/features/news/ui/NewsBanner/NewsBanner";
import { homeSchema } from "@/features/seo/model/seo";
import JsonLd from "@/features/seo/ui/JsonLd/JsonLd";
import { SITE, siteUrl } from "@/shared/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} · ${SITE.title}` },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: "/", title: SITE.title },
  twitter: { card: "summary_large_image", title: `${SITE.name} · ${SITE.title}`, description: SITE.description },
};

// The home page: the first screen, the sections to learn, the news and the project
const HomePage = () => (
  <>
    <JsonLd data={homeSchema(siteUrl())} />
    <Hero />
    <Overview />
    <NewsBanner items={NEWS} />
    <About />
  </>
);

export default HomePage;
