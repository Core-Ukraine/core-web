import { describe, expect, it, vi } from "vitest";

import { currentYear, formatDate } from "./time";

describe("currentYear", () => {
  it("follows the clock", () => {
    vi.useFakeTimers({ now: new Date("2027-01-01T00:00:00Z") });
    expect(currentYear()).toBe(2027);
    vi.useRealTimers();
  });
});

describe("formatDate", () => {
  it("writes a calendar date in Ukrainian words, whatever the time zone", () => {
    expect(formatDate("2026-10-24")).toBe("24 жовтня 2026 р.");
    expect(formatDate("2027-01-01")).toBe("1 січня 2027 р.");
  });
});
