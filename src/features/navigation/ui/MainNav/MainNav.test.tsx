import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MainNav from "./MainNav";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

// The menu with a user who clicks and types
const setup = (path = "/") => {
  pathname.current = path;
  const user = userEvent.setup();
  const view = render(
    <>
      <MainNav />
      <button type="button">Elsewhere</button>
    </>,
  );
  return { user, rerender: view.rerender };
};

describe("MainNav", () => {
  it("offers four lists, all closed, and two direct links", () => {
    setup();
    const nav = screen.getByRole("navigation", { name: "Головне меню" });
    const buttons = screen.getAllByRole("button", { expanded: false });
    expect(buttons.map((button) => button.textContent)).toEqual(["Основи", "Реактори", "Історія", "Матеріали"]);
    expect(screen.getByRole("link", { name: "Про проєкт" })).toHaveAttribute("href", "/pro-proiekt");
    expect(screen.getByRole("link", { name: "Новини" })).toHaveAttribute("href", "/novyny");
    expect(nav.querySelectorAll("[hidden]")).toHaveLength(4);
  });

  it("opens one list at a time and closes it again", async () => {
    const { user } = setup();
    const reactors = screen.getByRole("button", { name: "Реактори" });
    await user.click(reactors);
    expect(reactors).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(reactors.getAttribute("aria-controls") ?? "");
    expect(panel).toBeVisible();
    expect(screen.getByRole("link", { name: /^ВВЕР-1000/u })).toHaveAttribute("href", "/reaktory/vver-1000");
    expect(screen.getByRole("link", { name: /^ВВЕР-1000/u })).toHaveTextContent("Водо-водяний енергетичний реактор");

    await user.click(screen.getByRole("button", { name: "Історія" }));
    expect(reactors).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Історія" })).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Історія" }));
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();
  });

  it("closes on Escape and returns the focus to the button", async () => {
    const { user } = setup();
    const basics = screen.getByRole("button", { name: "Основи" });
    await user.click(basics);
    await user.tab();
    expect(screen.getByRole("link", { name: /^Теорія ядерних реакторів/u })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(basics).toHaveAttribute("aria-expanded", "false");
    expect(basics).toHaveFocus();
  });

  it("closes on a click elsewhere, when the focus leaves and after a link", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Матеріали" }));
    await user.click(document.body);
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Матеріали" }));
    await user.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Матеріали" }));
    await user.click(screen.getByRole("link", { name: /^Відео/u }));
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();
  });

  it("closes when the keyboard focus moves out of the menu", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Основи" }));
    act(() => {
      screen.getByRole("button", { name: "Elsewhere" }).focus();
    });
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();
  });

  it("closes once the address changes, for example after going back", async () => {
    const { user, rerender } = setup();
    await user.click(screen.getByRole("button", { name: "Історія" }));
    pathname.current = "/reaktory";
    rerender(<MainNav />);
    expect(screen.queryByRole("button", { expanded: true })).not.toBeInTheDocument();
  });

  it("keeps other keys and clicks inside the menu from closing it", async () => {
    const { user } = setup();
    const basics = screen.getByRole("button", { name: "Основи" });
    await user.click(basics);
    await user.keyboard("a");
    await user.click(screen.getByText("Основи", { selector: "p" }));
    expect(basics).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on Escape and focuses the button even after the focus fell to the page", async () => {
    const { user } = setup();
    const history = screen.getByRole("button", { name: "Історія" });
    await user.click(history);
    history.blur();
    expect(history).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(history).toHaveAttribute("aria-expanded", "false");
    expect(history).toHaveFocus();
  });

  it("marks the current section and page", () => {
    setup("/reaktory/rbmk-1000");
    expect(screen.getByRole("button", { name: "Реактори" })).toHaveAttribute("data-current", "true");
    expect(screen.getByRole("button", { name: "Основи" })).not.toHaveAttribute("data-current");
    expect(screen.getByRole("link", { name: /^РБМК-1000/u, hidden: true })).toHaveAttribute("aria-current", "page");
  });

  it("marks a direct link as the current page", () => {
    setup("/novyny");
    expect(screen.getByRole("link", { name: "Новини" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Про проєкт" })).not.toHaveAttribute("aria-current");
  });
});
