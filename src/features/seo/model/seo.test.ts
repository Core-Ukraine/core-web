import { describe, expect, it } from "vitest";

import { homeSchema, pageMetadata, pageSchema, serializeJsonLd } from "./seo";

const BASE = new URL("https://core.example");

describe("pageMetadata", () => {
  it("gives a page its canonical link and share cards in Ukrainian", () => {
    expect(pageMetadata({ title: "Реактори", description: "Будова реакторів.", path: "/reaktory" })).toEqual({
      title: "Реактори",
      description: "Будова реакторів.",
      alternates: { canonical: "/reaktory" },
      openGraph: {
        type: "website",
        siteName: "ЯДРО",
        locale: "uk_UA",
        title: "Реактори · ЯДРО",
        description: "Будова реакторів.",
        url: "/reaktory",
      },
      twitter: { card: "summary_large_image", title: "Реактори · ЯДРО", description: "Будова реакторів." },
    });
  });
});

describe("structured data", () => {
  it("describes the site on the home page", () => {
    expect(homeSchema(BASE)).toMatchObject({
      "@graph": [{ "@type": "WebSite", "@id": "https://core.example/#website", url: "https://core.example/" }],
    });
  });

  it("describes a page with the way to it", () => {
    const schema = pageSchema(
      { title: "ВВЕР-1000", description: "Реактор.", path: "/reaktory/vver-1000" },
      [{ title: "Головна", href: "/" }, { title: "Реактори", href: "/reaktory" }, { title: "ВВЕР-1000" }],
      BASE,
    );
    expect(schema).toHaveProperty(["@graph", "1", "@type"], "WebPage");
    expect(schema).toHaveProperty(["@graph", "1", "url"], "https://core.example/reaktory/vver-1000");
    expect(schema).toHaveProperty(["@graph", "1", "isPartOf", "@id"], "https://core.example/#website");
    expect(schema).toHaveProperty(["@graph", "1", "breadcrumb", "itemListElement", "2"], {
      "@type": "ListItem",
      position: 3,
      name: "ВВЕР-1000",
      item: "https://core.example/reaktory/vver-1000",
    });
  });

  it("cannot close the script tag it sits in", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});
