import { describe, expect, it } from "vitest";

import {
  cardNumber,
  neighbours,
  topicCount,
  findSection,
  findTopic,
  PAGES,
  SECTIONS,
  sectionHref,
  topicBody,
  topicHref,
  topicNumber,
  TOPIC_PLACEHOLDER,
} from "./catalog";

describe("catalog", () => {
  it("holds the four sections and ten topics of the navigation map", () => {
    expect(SECTIONS.map((section) => section.title)).toEqual(["Основи", "Реактори", "Історія", "Матеріали"]);
    expect(SECTIONS.flatMap((section) => section.topics)).toHaveLength(10);
    expect(Object.values(PAGES).map((page) => page.title)).toEqual(["Про проєкт", "Новини"]);
  });

  it("uses unique lowercase Latin slugs", () => {
    const slugs = [
      ...SECTIONS.map((section) => section.slug),
      ...Object.values(PAGES).map((page) => page.href.slice(1)),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const section of SECTIONS) {
      const topics = section.topics.map((topic) => topic.slug);
      expect(new Set(topics).size).toBe(topics.length);
      for (const slug of [section.slug, ...topics]) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
    }
  });

  it("builds the addresses of sections and topics", () => {
    const reactors = findSection("reaktory");
    expect(reactors && sectionHref(reactors)).toBe("/reaktory");
    const match = findTopic("reaktory", "vver-1000");
    expect(match && topicHref(match.section, match.topic)).toBe("/reaktory/vver-1000");
  });

  it("finds a topic with its position and nothing for unknown slugs", () => {
    expect(findTopic("materialy", "kreslennia")).toMatchObject({ sectionIndex: 3, topicIndex: 2 });
    expect(findTopic("materialy", "nowhere")).toBeUndefined();
    expect(findTopic("nowhere", "video")).toBeUndefined();
    expect(findSection("nowhere")).toBeUndefined();
  });

  it("numbers cards and topics", () => {
    expect(cardNumber(0)).toBe("01");
    expect(cardNumber(5)).toBe("06");
    expect(topicNumber(1, 2)).toBe("02.3");
  });

  it("shows the placeholder until a topic has its own text", () => {
    expect(topicBody({ slug: "a", title: "A", summary: "" })).toBe(TOPIC_PLACEHOLDER);
    expect(topicBody({ slug: "a", title: "A", summary: "", body: [] })).toBe(TOPIC_PLACEHOLDER);
    expect(topicBody({ slug: "a", title: "A", summary: "", body: ["Текст"] })).toEqual(["Текст"]);
  });

  it("counts topics in Ukrainian", () => {
    expect([1, 2, 3, 5, 11, 21, 22].map(topicCount)).toEqual([
      "1 тема",
      "2 теми",
      "3 теми",
      "5 тем",
      "11 тем",
      "21 тема",
      "22 теми",
    ]);
  });

  it("leads from topic to topic in reading order, across sections", () => {
    const [basics, reactors] = SECTIONS;
    const first = neighbours(basics!, basics!.topics[0]!);
    expect(first.previous).toBeUndefined();
    expect(first.next).toEqual({ href: "/osnovy/turbiny", title: "Турбіни", section: "Основи" });
    const crossing = neighbours(reactors!, reactors!.topics[0]!);
    expect(crossing.previous?.href).toBe("/osnovy/turbiny");
    expect(crossing.next?.href).toBe("/reaktory/rbmk-1000");
    const last = SECTIONS.at(-1)!;
    expect(neighbours(last, last.topics.at(-1)!).next).toBeUndefined();
    expect(neighbours(last, { slug: "x", title: "X", summary: "" })).toEqual({ previous: undefined, next: undefined });
  });
});
