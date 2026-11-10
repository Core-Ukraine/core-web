import { describe, expect, it } from "vitest";

import { QUIZ } from "./quiz";

describe("the quiz", () => {
  it("has eight questions, each with four options and one of them right", () => {
    expect(QUIZ).toHaveLength(8);
    for (const question of QUIZ) {
      expect(question.options).toHaveLength(4);
      expect(question.options[question.answer]).toBeDefined();
      expect(new Set(question.options).size).toBe(question.options.length);
    }
  });
});
