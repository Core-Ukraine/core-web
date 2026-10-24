export type RodKind = "rod" | "guide" | "centre";

export interface Rod {
  x: number;
  y: number;
  kind: RodKind;
  ring: number;
}

// Rings of rods around the centre and the distance between two rods
const RINGS = 5;
const PITCH = 30;

// Rounds a coordinate to a tenth, enough for a drawing
const tenth = (value: number) => Math.round(value * 10) / 10 || 0;

// The centre, a guide channel on even rows and columns, or a rod
const kindAt = (q: number, r: number): RodKind => {
  if (q === 0 && r === 0) return "centre";
  return q % 2 === 0 && r % 2 === 0 ? "guide" : "rod";
};

// Every position of a simplified VVER-1000 assembly, row by row
export const assembly = (rings = RINGS, pitch = PITCH): Rod[] =>
  Array.from({ length: 2 * rings + 1 }, (_, row) => row - rings).flatMap((r) =>
    Array.from({ length: 2 * rings + 1 }, (_, column) => column - rings)
      .filter((q) => Math.abs(q + r) <= rings)
      .map((q) => ({
        x: tenth(pitch * (q + r / 2)),
        y: tenth((pitch * r * Math.sqrt(3)) / 2),
        kind: kindAt(q, r),
        ring: Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)),
      })),
  );
