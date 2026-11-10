import { describe, expect, it } from "vitest";

import { SOURCE_GROUPS, sourceAnchor, sourceOf, SOURCES } from "./sources";

describe("sources", () => {
  it("finds a source by its number in the text", () => {
    expect(sourceOf(1).url).toBe("https://www.nrc.gov/docs/ML1117/ML11171A331.pdf");
    expect(sourceOf(SOURCES.length).title).toMatch(/^Cameco/u);
  });

  it("fails on a number that is not in the list", () => {
    expect(() => sourceOf(0)).toThrow("source 0");
    expect(() => sourceOf(SOURCES.length + 1)).toThrow(`source ${SOURCES.length + 1}`);
  });

  it("splits every source into one group, in order", () => {
    const numbers = SOURCE_GROUPS.flatMap(({ first, last }) =>
      Array.from({ length: last - first + 1 }, (_, index) => first + index),
    );
    expect(numbers).toEqual(SOURCES.map((_, index) => index + 1));
  });

  it("links every source to its own page", () => {
    expect(new Set(SOURCES.map((source) => source.url)).size).toBe(SOURCES.length);
    expect(SOURCES.every((source) => source.url.startsWith("https://"))).toBe(true);
  });

  it("gives every source an anchor in the list", () => {
    expect(sourceAnchor(4)).toBe("dzherelo-4");
  });
});
