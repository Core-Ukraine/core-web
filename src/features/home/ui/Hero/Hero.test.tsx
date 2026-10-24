import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Hero from "./Hero";

describe("Hero", () => {
  it("names the site and leads to the basics and the reactors", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Атомна енергетика: від ядра до турбіни" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Почати з основ" })).toHaveAttribute("href", "/osnovy");
    expect(screen.getByRole("link", { name: "Типи реакторів" })).toHaveAttribute("href", "/reaktory");
    expect(screen.getByRole("figure", { name: /ВВЕР-1000/u })).toBeInTheDocument();
  });
});
