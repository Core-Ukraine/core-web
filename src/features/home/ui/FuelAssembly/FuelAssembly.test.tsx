import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FuelAssembly from "./FuelAssembly";

describe("FuelAssembly", () => {
  it("draws the assembly and describes it in the caption with a legend", () => {
    const { container } = render(<FuelAssembly />);
    const figure = screen.getByRole("figure", { name: /тепловидільної збірки реактора ВВЕР-1000/u });
    expect(figure.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(figure.querySelectorAll("circle[data-ring]")).toHaveLength(91);
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Твел",
      "Напрямний канал",
      "Центральна труба",
    ]);
    expect(container.querySelector("figcaption")).toHaveTextContent("Рис. 1. ТВЗ реактора ВВЕР-1000, спрощена схема");
  });
});
