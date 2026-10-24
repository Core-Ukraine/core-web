import type { Metadata } from "next";

import type { Crumb } from "@/features/navigation/model/trail";
import type { Path } from "@/shared/lib/path";
import { SITE } from "@/shared/lib/site";

export type Schema = Readonly<Record<string, unknown>>;

export interface PageInfo {
  title: string;
  description: string;
  path: Path;
}

// The title, description, canonical link and share cards of a page
export const pageMetadata = ({ title, description, path }: PageInfo): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${title} · ${SITE.name}`,
    description,
    url: path,
  },
  twitter: { card: "summary_large_image", title: `${title} · ${SITE.name}`, description },
});

// JSON-LD that cannot close the script tag it sits in
export const serializeJsonLd = (data: Schema) => JSON.stringify(data).replaceAll("<", "\\u003c");

// The schema.org id of the site
const websiteId = (base: URL) => new URL("/#website", base).href;

// The site as a schema.org WebSite
const website = (base: URL): Schema => ({
  "@type": "WebSite",
  "@id": websiteId(base),
  name: SITE.name,
  url: new URL("/", base).href,
  description: SITE.description,
  inLanguage: "uk",
});

// Structured data of the home page
export const homeSchema = (base: URL): Schema => ({ "@context": "https://schema.org", "@graph": [website(base)] });

// Structured data of a page inside the site, with the way to it
export const pageSchema = (page: PageInfo, crumbs: readonly Crumb[], base: URL): Schema => {
  const url = new URL(page.path, base).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(base),
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "uk",
        isPartOf: { "@id": websiteId(base) },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.title,
            item: new URL(crumb.href ?? page.path, base).href,
          })),
        },
      },
    ],
  };
};
