import { describe, expect, it, vi } from "vitest";

import { log } from "./log";

describe("log", () => {
  it("names the app and adds the context as JSON", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    log.warn("Slow answer", { route: "/[section]", status: 503 });
    log.error("Broken");
    log.info("Ready");
    expect(warn).toHaveBeenCalledWith('[core-web] Slow answer {"route":"/[section]","status":503}');
    expect(error).toHaveBeenCalledWith("[core-web] Broken");
    expect(info).toHaveBeenCalledWith("[core-web] Ready");
  });
});
