import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "./Footer";

// The texts and addresses of the links in a footer column
const titles = (name: string) =>
  within(screen.getByRole("navigation", { name }))
    .getAllByRole("link")
    .map((link) => `${link.textContent} ${link.getAttribute("href")}`);

describe("Footer", () => {
  it("groups the links into sections and the project", () => {
    render(<Footer />);
    expect(titles("Розділи")).toEqual([
      "Основи /osnovy",
      "Реактори /reaktory",
      "Історія /istoriia",
      "Матеріали /materialy",
    ]);
    expect(titles("Проєкт")).toEqual(["Про проєкт /pro-proiekt", "Новини /novyny"]);
  });

  it("shows the contacts, the year, the version and the way back up", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "ЯДРО, на головну" })).toHaveAttribute("href", "/");
    expect(screen.getByText("[e-mail проєкту]")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Написати нам" })).toHaveAttribute("href", "/pro-proiekt#zviazok");
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      `© ${new Date().getFullYear()} ЯДРО · Освітній проєкт про атомну енергетику`,
    );
    expect(screen.getByText("v1.1.0")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Вгору" })).toHaveAttribute("href", "#top");
  });
});
