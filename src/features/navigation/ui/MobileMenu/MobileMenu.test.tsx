import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MobileMenu from "./MobileMenu";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

// A media query that the test can switch, with the listener it got
const fakeMediaQuery = () => {
  const query = { matches: false, listener: null as (() => void) | null };
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return query.matches;
    },
    addEventListener: (_type: string, listener: () => void) => {
      query.listener = listener;
    },
    removeEventListener: vi.fn<() => void>(),
  }));
  return query;
};

// The menu on a page, with a user who taps
const setup = (path = "/") => {
  pathname.current = path;
  const query = fakeMediaQuery();
  const user = userEvent.setup();
  const view = render(<MobileMenu year={2026} />);
  const dialog = view.container.querySelector("dialog");
  if (!dialog) throw new Error("The menu has no dialog");
  return { user, dialog, query, ...view };
};

describe("MobileMenu", () => {
  it("opens the whole menu over the page and closes it with the cross", async () => {
    const { user, dialog } = setup();
    const toggle = screen.getByRole("button", { name: "Відкрити меню" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dialog).not.toHaveAttribute("open");

    await user.click(toggle);
    expect(dialog).toHaveAttribute("open");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "ЯДРО, на головну" })).toHaveAttribute("href", "/");
    expect(screen.getByText("© 2026 ЯДРО")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Основи", expanded: true })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Закрити меню" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps one section open at a time", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Відкрити меню" }));
    const reactors = screen.getByRole("button", { name: "Реактори" });
    await user.click(reactors);
    expect(reactors).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(reactors.getAttribute("aria-controls") ?? "");
    expect(panel).toHaveAttribute("data-open", "true");
    expect(panel).not.toHaveAttribute("inert");
    expect(screen.getByRole("link", { name: "AP-1000" })).toBeInTheDocument();
    expect(
      document.getElementById(screen.getByRole("button", { name: "Основи" }).getAttribute("aria-controls") ?? ""),
    ).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: "Історія" }));
    expect(reactors).toHaveAttribute("aria-expanded", "false");
    await user.click(screen.getByRole("button", { name: "Історія" }));
    const menu = screen.getByRole("navigation", { name: "Головне меню" });
    expect(within(menu).queryByRole("button", { expanded: true })).not.toBeInTheDocument();
  });

  it("unfolds the section of the current page and closes after a link", async () => {
    const { user, dialog } = setup("/materialy/video");
    await user.click(screen.getByRole("button", { name: "Відкрити меню" }));
    expect(screen.getByRole("button", { name: "Матеріали" })).toHaveAttribute("aria-expanded", "true");
    const video = screen.getByRole("link", { name: "Відео" });
    expect(video).toHaveAttribute("aria-current", "page");
    await user.click(video);
    expect(dialog).not.toHaveAttribute("open");
  });

  it("links the two pages directly and marks the current one", async () => {
    const { user, dialog } = setup("/pro-proiekt");
    await user.click(screen.getByRole("button", { name: "Відкрити меню" }));
    expect(screen.getByRole("link", { name: "Про проєкт" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("link", { name: "Новини" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("closes once the address changes, for example after going back", async () => {
    const { user, dialog, rerender } = setup("/osnovy");
    await user.click(screen.getByRole("button", { name: "Відкрити меню" }));
    rerender(<MobileMenu year={2026} />);
    expect(dialog).toHaveAttribute("open");
    pathname.current = "/reaktory";
    rerender(<MobileMenu year={2026} />);
    expect(dialog).not.toHaveAttribute("open");
  });

  it("closes once the screen is wide enough for the full menu", async () => {
    const { user, dialog, query, unmount } = setup();
    await user.click(screen.getByRole("button", { name: "Відкрити меню" }));
    query.listener?.();
    expect(dialog).toHaveAttribute("open");
    query.matches = true;
    query.listener?.();
    expect(dialog).not.toHaveAttribute("open");
    unmount();
  });
});
