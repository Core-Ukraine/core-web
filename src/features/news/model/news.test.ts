import { describe, expect, it } from "vitest";

import { NEWS, newestFirst } from "./news";

describe("news", () => {
  it("starts without news", () => {
    expect(NEWS).toEqual([]);
  });

  it("sorts the newest first without changing the list", () => {
    const items = [
      { date: "2026-09-01", title: "Old", summary: "" },
      { date: "2026-10-24", title: "New", summary: "" },
    ];
    expect(newestFirst(items).map((item) => item.title)).toEqual(["New", "Old"]);
    expect(items[0]?.title).toBe("Old");
  });
});
