import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MODULES } from "../../model/course";
import Course from "./Course";

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      // Follows nothing: the test reads the page as it renders
      observe() {}

      // Stops following nothing
      disconnect() {}
    },
  );
});

describe("Course", () => {
  it("shows the nine modules in order with the list beside them and what the page adds", () => {
    const { container } = render(
      <Course>
        <p>Теми розділу</p>
      </Course>,
    );
    expect(container.querySelectorAll("nav a")).toHaveLength(MODULES.length);
    const titles = [...container.querySelectorAll("h2[id$='-title']")].map((heading) => heading.textContent);
    expect(titles).toEqual(MODULES.map((module) => module.title));
    const intro = container.querySelector("#vstup");
    expect(intro).toHaveAttribute("aria-labelledby", "vstup-title");
    expect(intro).toHaveTextContent(/^Модуль 1 з 9Вступ/u);
    expect(container.querySelector("#test")).toHaveTextContent(/^Модуль 9 з 9Перевірка знань/u);
    expect(screen.getByText("Теми розділу")).toBeInTheDocument();
  });
});
