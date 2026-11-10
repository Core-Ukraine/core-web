import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import PlantDiagram from "./PlantDiagram";

describe("PlantDiagram", () => {
  it("draws the section with its fourteen numbers and outlines the picked position", () => {
    const { container } = render(<PlantDiagram selected="pzr" />);
    expect(screen.getByRole("figure", { name: /^Спрощений розріз реакторної установки AP1000/u })).toBeInTheDocument();
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("data-mode", "positions");
    expect(svg).toHaveAttribute("data-pickable", "false");
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(container.querySelector("[data-part='pzr']")).toHaveAttribute("data-active", "true");
    expect(container.querySelector("[data-part='rpv']")).toHaveAttribute("data-active", "false");
    expect(container.querySelectorAll("[data-on='true'], [data-shown='true']")).toHaveLength(0);
  });

  it("picks a position with the pointer", () => {
    const onPick = vi.fn<(part: string) => void>();
    const { container } = render(<PlantDiagram selected="rpv" onPick={onPick} />);
    expect(container.querySelector("svg")).toHaveAttribute("data-pickable", "true");
    const tank = container.querySelector("[data-part='irwst'] rect");
    if (!tank) throw new Error("The section has no tank");
    fireEvent.click(tank);
    expect(onPick).toHaveBeenCalledWith("irwst");
  });

  it("sets the flows, parts and marks of a scenario at work", () => {
    const { container } = render(<PlantDiagram scenario="lloca" />);
    expect(container.querySelector("svg")).toHaveAttribute("data-mode", "scenario");
    expect(container.querySelector("[data-part='acc']")).toHaveAttribute("data-active", "true");
    expect(container.querySelector("[data-part='prhr']")).toHaveAttribute("data-active", "false");
    expect(container.querySelectorAll("path[data-on='true']").length).toBeGreaterThan(11);
    expect(container.querySelectorAll("[data-shown='true']")).toHaveLength(4);
  });
});
