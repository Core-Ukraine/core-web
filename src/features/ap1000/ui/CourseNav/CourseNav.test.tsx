import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CourseNav from "./CourseNav";

const MODULES = [
  { id: "vstup", label: "Вступ" },
  { id: "bezpeka", label: "Системи безпеки" },
  { id: "test", label: "Тест" },
];

// An observer that the test drives, with the options and sections it got
const watcher = vi.hoisted(() => ({
  callback: (() => {}) as (entries: { isIntersecting: boolean; target: Element }[]) => void,
  options: undefined as IntersectionObserverInit | undefined,
  observed: [] as Element[],
  disconnect: () => {},
}));

// Reports that a module crosses the reading line or leaves it
const cross = (id: string, isIntersecting = true) => {
  const target = document.getElementById(id);
  if (!target) throw new Error(`No section ${id}`);
  act(() => watcher.callback([{ isIntersecting, target }]));
};

beforeEach(() => {
  watcher.observed = [];
  watcher.disconnect = vi.fn<() => void>();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      // Keeps the callback and the options for the test
      constructor(callback: typeof watcher.callback, options: IntersectionObserverInit) {
        watcher.callback = callback;
        watcher.options = options;
      }

      // Records a section the list follows
      observe(element: Element) {
        watcher.observed.push(element);
      }

      // Stops following the sections
      disconnect() {
        watcher.disconnect();
      }
    },
  );
  for (const { id } of MODULES.slice(0, 2)) {
    const section = document.createElement("section");
    section.id = id;
    document.body.append(section);
  }
});

afterEach(() => {
  for (const section of document.querySelectorAll("section")) section.remove();
});

describe("CourseNav", () => {
  it("lists the modules as links to their sections", () => {
    render(<CourseNav modules={MODULES} />);
    const nav = screen.getByRole("navigation", { name: "Модулі курсу" });
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "#vstup",
      "#bezpeka",
      "#test",
    ]);
    expect(screen.getByRole("link", { name: "1 Вступ" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "2 Системи безпеки" })).not.toHaveAttribute("aria-current");
  });

  it("marks nothing while there are no modules", () => {
    render(<CourseNav modules={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("marks the module that crosses the reading line and follows only the sections there are", () => {
    const { unmount } = render(<CourseNav modules={MODULES} />);
    expect(watcher.options).toEqual({ rootMargin: "-30% 0px -69% 0px" });
    expect(watcher.observed.map((section) => section.id)).toEqual(["vstup", "bezpeka"]);

    cross("bezpeka");
    expect(screen.getByRole("link", { name: "2 Системи безпеки" })).toHaveAttribute("aria-current", "location");
    cross("vstup", false);
    expect(screen.getByRole("link", { name: "2 Системи безпеки" })).toHaveAttribute("aria-current", "location");
    cross("vstup");
    expect(screen.getByRole("link", { name: "1 Вступ" })).toHaveAttribute("aria-current", "location");

    unmount();
    expect(watcher.disconnect).toHaveBeenCalled();
  });

  it("scrolls the band of modules to the one being read", () => {
    render(<CourseNav modules={MODULES} />);
    const list = screen.getByRole("list");
    const link = screen.getByRole("link", { name: "2 Системи безпеки" });
    Object.defineProperties(list, { clientWidth: { value: 300 }, scrollLeft: { value: 0, writable: true } });
    Object.defineProperties(link, { offsetLeft: { value: 400 }, offsetWidth: { value: 100 } });
    cross("bezpeka");
    expect(list.scrollLeft).toBe(300);
  });
});
