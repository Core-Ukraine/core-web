import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PowerCycle from "./PowerCycle";

describe("PowerCycle", () => {
  it("draws the unit from the reactor to the generator, unfolded", () => {
    const { container } = render(<PowerCycle />);
    expect(container.querySelector("details")).toHaveAttribute("open");
    expect(screen.getByRole("figure", { name: /^Спрощена схема енергоблока AP1000/u })).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Генератор")).toBeInTheDocument();
    expect(container.querySelectorAll("path[data-kind]")).toHaveLength(14);
    expect(screen.getByText("живильна і циркуляційна вода")).toBeInTheDocument();
  });
});
