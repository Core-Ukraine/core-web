import { describe, expect, it } from "vitest";

import { trail } from "./trail";

describe("trail", () => {
  it("starts every way at the home page", () => {
    expect(trail()).toEqual([{ title: "Головна", href: "/" }]);
    expect(trail({ title: "Реактори", href: "/reaktory" }, { title: "AP-1000" })).toEqual([
      { title: "Головна", href: "/" },
      { title: "Реактори", href: "/reaktory" },
      { title: "AP-1000" },
    ]);
  });
});
