import { afterEach, describe, expect, it, vi } from "vitest";

import sitemap from "./sitemap";

describe("sitemap.xml", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("lists the home page, four sections, ten topics and two pages", () => {
    vi.stubEnv("SITE_URL", "https://core.example");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(17);
    expect(urls.slice(0, 6)).toEqual([
      "https://core.example/",
      "https://core.example/osnovy",
      "https://core.example/reaktory",
      "https://core.example/istoriia",
      "https://core.example/materialy",
      "https://core.example/osnovy/teoriia",
    ]);
    expect(urls).toContain("https://core.example/reaktory/vver-1000");
    expect(urls.slice(-2)).toEqual(["https://core.example/pro-proiekt", "https://core.example/novyny"]);
    expect(sitemap()[0]?.priority).toBe(1);
  });
});
