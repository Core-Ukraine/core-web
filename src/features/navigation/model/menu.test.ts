import { describe, expect, it } from "vitest";

import { currentGroup, isWithin, MENU } from "./menu";

describe("MENU", () => {
  it("has four lists and two direct links, like the navigation map", () => {
    expect(MENU.map((entry) => `${entry.kind}:${entry.title}`)).toEqual([
      "group:Основи",
      "group:Реактори",
      "group:Історія",
      "group:Матеріали",
      "link:Про проєкт",
      "link:Новини",
    ]);
    const items = MENU.flatMap((entry) => (entry.kind === "group" ? entry.items : []));
    expect(items).toHaveLength(10);
    expect(items[2]).toEqual({
      href: "/reaktory/vver-1000",
      title: "ВВЕР-1000",
      summary: "Водо-водяний енергетичний реактор",
    });
  });

  it("opens only the last list to the left", () => {
    const aligns = MENU.flatMap((entry) => (entry.kind === "group" ? [entry.align] : []));
    expect(aligns).toEqual(["start", "start", "start", "end"]);
  });
});

describe("isWithin", () => {
  it("matches a page and the pages below it, not similar names", () => {
    expect(isWithin("/reaktory", "/reaktory")).toBe(true);
    expect(isWithin("/reaktory/ap-1000", "/reaktory")).toBe(true);
    expect(isWithin("/reaktory-x", "/reaktory")).toBe(false);
  });
});

describe("currentGroup", () => {
  it("names the list of the current page", () => {
    expect(currentGroup("/istoriia/svit")).toBe("istoriia");
    expect(currentGroup("/materialy")).toBe("materialy");
    expect(currentGroup("/novyny")).toBeNull();
    expect(currentGroup("/")).toBeNull();
  });
});
