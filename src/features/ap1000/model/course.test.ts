import { describe, expect, it } from "vitest";

import { findTopic, topicHref } from "@/features/catalog/model/catalog";

import { type Block, blockKey, COURSE, COURSE_PATH, MODULES, PARAMETERS } from "./course";
import { DRAWINGS } from "./figures";
import { COUNTS, MILESTONES, UNITS } from "./history";
import { PART_NUMBERS, PIPES, SCENES } from "./plant";
import { POSITIONS } from "./positions";
import { citedIn } from "./rich";
import { SCENARIOS } from "./scenarios";
import { SOURCES } from "./sources";
import { videoOf } from "./videos";

const BLOCKS = MODULES.flatMap((module) => module.blocks);

// Every text of a block that may cite a source
const textsOf = (block: Block): readonly string[] => {
  if (block.kind === "text") return block.paragraphs;
  if (block.kind === "points") return block.points.map((point) => point.text);
  return block.kind === "note" ? [block.text] : [];
};

// Every text of the course that may cite a source
const TEXTS = [
  COURSE.lead,
  ...BLOCKS.flatMap(textsOf),
  ...PARAMETERS.map(([, value]) => value),
  ...POSITIONS.map((position) => position.text),
  ...SCENARIOS.map((scenario) => scenario.summary),
  ...MILESTONES.map((milestone) => milestone.text),
  ...COUNTS.map((count) => count.text),
  ...UNITS.map((unit) => unit.event),
];

describe("the course", () => {
  it("fills the AP-1000 topic of the catalog", () => {
    const match = findTopic("reaktory", "ap-1000");
    expect(match && topicHref(match.section, match.topic)).toBe(COURSE_PATH);
  });

  it("has nine modules with their own addresses, as its length says", () => {
    expect(MODULES).toHaveLength(9);
    expect(COURSE.length).toContain(`${MODULES.length} модулів`);
    expect(new Set(MODULES.map((module) => module.id)).size).toBe(MODULES.length);
    expect(MODULES.every((module) => /^[a-z0-9-]+$/u.test(module.id))).toBe(true);
  });

  it("gives every block of a module its own key", () => {
    for (const entry of MODULES) {
      const keys = entry.blocks.map(blockKey);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it("names every kind of block in its key", () => {
    expect(blockKey({ kind: "text", paragraphs: ["А", "Б"] })).toBe("text:А Б");
    expect(blockKey({ kind: "points", points: [{ lead: "Перший.", text: "" }] })).toBe("points:Перший.");
    expect(blockKey({ kind: "part", text: "Частина 1" })).toBe("part:Частина 1");
    expect(blockKey({ kind: "drawing", drawing: "f4_4" })).toBe("drawing:f4_4");
    expect(blockKey({ kind: "chain", label: "Шлях", links: [] })).toBe("chain:Шлях");
    expect(blockKey({ kind: "quiz" })).toBe("quiz");
  });

  it("cites only sources that are in the list", () => {
    const cited = new Set(TEXTS.flatMap(citedIn));
    expect([...cited].filter((number) => number < 1 || number > SOURCES.length)).toEqual([]);
    expect(cited.size).toBeGreaterThan(30);
  });

  it("shows only drawings that exist", () => {
    const shown = [
      ...BLOCKS.flatMap((block) => (block.kind === "drawing" ? [block.drawing] : [])),
      ...POSITIONS.flatMap((position) => (position.drawing ? [position.drawing] : [])),
      ...SCENARIOS.flatMap((scenario) => scenario.drawings.map(([drawing]) => drawing)),
      "f1_2" as const,
    ];
    expect(new Set(shown)).toEqual(new Set(Object.keys(DRAWINGS)));
  });

  it("describes every numbered position once, in the order of the numbers", () => {
    expect(POSITIONS.map((position) => PART_NUMBERS[position.id])).toEqual(
      Array.from({ length: 14 }, (_, index) => index + 1),
    );
  });

  it("draws every scenario on the section with flows that exist", () => {
    const pipes = new Set(PIPES.map((pipe) => pipe.id));
    expect(SCENARIOS.map((scenario) => scenario.id)).toEqual(Object.keys(SCENES));
    for (const scene of Object.values(SCENES)) expect(scene.flows.filter((flow) => !pipes.has(flow))).toEqual([]);
  });

  it("gives every step of a scenario its own moment and links videos of the list", () => {
    for (const scenario of SCENARIOS) {
      expect(new Set(scenario.steps.map(([time]) => time)).size).toBe(scenario.steps.length);
      for (const id of scenario.videos) expect(videoOf(id).id).toBe(id);
    }
  });
});
