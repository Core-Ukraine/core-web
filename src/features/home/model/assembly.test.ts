import { describe, expect, it } from "vitest";

import { assembly } from "./assembly";

// How many positions of each kind a lattice holds
const count = (rods: ReturnType<typeof assembly>) =>
  Object.fromEntries(["rod", "guide", "centre"].map((kind) => [kind, rods.filter((rod) => rod.kind === kind).length]));

describe("assembly", () => {
  it("lays out 72 rods, 18 guide channels and the central tube, like the drawing", () => {
    const rods = assembly();
    expect(rods).toHaveLength(91);
    expect(count(rods)).toEqual({ rod: 72, guide: 18, centre: 1 });
    expect(rods.find((rod) => rod.kind === "centre")).toEqual({ x: 0, y: 0, kind: "centre", ring: 0 });
  });

  it("places the positions of the drawing on a hexagonal grid", () => {
    const rods = assembly();
    // Whether the lattice has this kind at this point
    const has = (x: number, y: number, kind: string) =>
      rods.some((rod) => rod.x === x && rod.y === y && rod.kind === kind);
    expect(has(-150, 0, "rod")).toBe(true);
    expect(has(-135, 26, "rod")).toBe(true);
    expect(has(-120, 0, "guide")).toBe(true);
    expect(has(60, -103.9, "guide")).toBe(true);
    expect(has(75, 129.9, "rod")).toBe(true);
    expect(Math.max(...rods.map((rod) => rod.x))).toBe(150);
  });

  it("numbers the rings from the centre outwards", () => {
    const rods = assembly();
    expect(rods.filter((rod) => rod.ring === 1)).toHaveLength(6);
    expect(rods.filter((rod) => rod.ring === 5)).toHaveLength(30);
    expect(rods.find((rod) => rod.x === -150 && rod.y === 0)?.ring).toBe(5);
  });

  it("grows with the number of rings", () => {
    expect(assembly(1)).toHaveLength(7);
    expect(assembly(2, 10)).toHaveLength(19);
  });
});
