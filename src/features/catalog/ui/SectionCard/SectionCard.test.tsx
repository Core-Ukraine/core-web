import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SectionCard from "./SectionCard";

describe("SectionCard", () => {
  it("shows the number, links the name to the section and renders what follows", () => {
    render(
      <SectionCard number="02" title="Реактори" description="Будова та принцип роботи." href="/reaktory">
        <span>ВВЕР-1000</span>
      </SectionCard>,
    );
    const card = screen.getByRole("article");
    expect(card).toHaveTextContent("02");
    expect(card).not.toHaveAttribute("data-accent");
    expect(screen.getByRole("heading", { level: 3, name: "Реактори" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Реактори" })).toHaveAttribute("href", "/reaktory");
    expect(screen.getByText("ВВЕР-1000")).toBeInTheDocument();
  });

  it("can be filled with the brand blue", () => {
    render(
      <SectionCard number="06" title="Новини" description="Події галузі." href="/novyny" accent>
        <span>Усі новини</span>
      </SectionCard>,
    );
    expect(screen.getByRole("article")).toHaveAttribute("data-accent", "true");
  });
});
