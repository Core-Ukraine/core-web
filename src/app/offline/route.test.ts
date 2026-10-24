import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /offline", () => {
  it("serves a Ukrainian page that needs nothing else, under its own policy", async () => {
    const response = GET();
    const html = await response.text();
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("content-security-policy")).toContain("default-src 'none'");
    expect(html).toContain('<html lang="uk">');
    expect(html).toContain("<h1>Немає звʼязку</h1>");
    expect(html).toContain("Немає звʼязку · ЯДРО");
  });
});
