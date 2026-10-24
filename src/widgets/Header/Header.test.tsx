import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "./Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header", () => {
  it("links home and holds both menus", () => {
    render(<Header />);
    const home = screen.getByRole("link", { name: "ЯДРО Атомна енергетика, на головну" });
    expect(home).toHaveAttribute("href", "/");
    expect(screen.getByRole("banner")).toHaveAttribute("id", "top");
    expect(screen.getByRole("navigation", { name: "Головне меню" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Відкрити меню" })).toBeInTheDocument();
    expect(document.querySelector("dialog")).toHaveTextContent(`© ${new Date().getFullYear()} ЯДРО`);
  });
});
