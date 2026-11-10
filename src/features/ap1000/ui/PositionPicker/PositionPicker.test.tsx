import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import PositionPicker, { type PositionEntry } from "./PositionPicker";

const POSITIONS: readonly PositionEntry[] = [
  { id: "rpv", number: 1, name: "Корпус реактора", details: <p>Про корпус</p> },
  { id: "pzr", number: 5, name: "Компенсатор тиску", details: <p>Про компенсатор</p> },
];

describe("PositionPicker", () => {
  it("shows the first position and switches with the list", async () => {
    const user = userEvent.setup();
    render(<PositionPicker positions={POSITIONS} first="rpv" drawing={<span>Розріз NRC</span>} />);
    expect(screen.getByText("Розріз NRC")).toBeInTheDocument();
    const vessel = screen.getByRole("button", { name: "1 Корпус реактора" });
    const pressurizer = screen.getByRole("button", { name: "5 Компенсатор тиску" });
    expect(vessel).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Про корпус")).toBeVisible();
    expect(screen.getByText("Про компенсатор")).not.toBeVisible();

    await user.click(pressurizer);
    expect(pressurizer).toHaveAttribute("aria-pressed", "true");
    expect(vessel).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Про компенсатор")).toBeVisible();
    expect(pressurizer.getAttribute("aria-controls")).toBe(screen.getByText("Про компенсатор").parentElement?.id);
  });

  it("follows a position picked on the section", () => {
    const { container } = render(<PositionPicker positions={POSITIONS} first="rpv" drawing={null} />);
    const pressurizer = container.querySelector("[data-part='pzr'] rect");
    if (!pressurizer) throw new Error("The section has no pressurizer");
    fireEvent.click(pressurizer);
    expect(screen.getByRole("button", { name: "5 Компенсатор тиску" })).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector("[data-part='pzr']")).toHaveAttribute("data-active", "true");
  });
});
