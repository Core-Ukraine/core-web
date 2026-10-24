import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Overview from "./Overview";

describe("Overview", () => {
  it("shows the four numbered sections with links to every topic", () => {
    render(<Overview />);
    expect(screen.getByRole("heading", { level: 2, name: "Що можна вивчити" })).toBeInTheDocument();
    const cards = screen.getAllByRole("article");
    expect(cards.map((card) => within(card).getByRole("heading").textContent)).toEqual([
      "Основи",
      "Реактори",
      "Історія",
      "Матеріали",
    ]);
    expect(cards.map((card) => card.textContent.slice(0, 2))).toEqual(["01", "02", "03", "04"]);
    expect(
      within(cards[1]!)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/reaktory", "/reaktory/vver-1000", "/reaktory/rbmk-1000", "/reaktory/ap-1000"]);
  });
});
