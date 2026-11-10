import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ScenarioPicker, { type ScenarioEntry } from "./ScenarioPicker";

const SCENARIOS: readonly ScenarioEntry[] = [
  { id: "normal", name: "Нормальна робота", details: <p>Усе працює</p> },
  { id: "sbo", name: "Повне знеструмлення (SBO)", details: <p>Живлення немає</p> },
];

describe("ScenarioPicker", () => {
  it("opens the first scenario and switches its details and flows", async () => {
    const user = userEvent.setup();
    const { container } = render(<ScenarioPicker scenarios={SCENARIOS} first="sbo" />);
    expect(screen.getByRole("group", { name: "Сценарій" })).toBeInTheDocument();
    const normal = screen.getByRole("button", { name: "Нормальна робота" });
    const blackout = screen.getByRole("button", { name: "Повне знеструмлення (SBO)" });
    expect(blackout).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Живлення немає")).toBeVisible();
    expect(screen.getByText("Усе працює")).not.toBeVisible();
    expect(container.querySelector("[data-part='prhr']")).toHaveAttribute("data-active", "true");

    await user.click(normal);
    expect(normal).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Усе працює")).toBeVisible();
    expect(normal.getAttribute("aria-controls")).toBe(screen.getByText("Усе працює").parentElement?.id);
    expect(container.querySelector("[data-part='prhr']")).toHaveAttribute("data-active", "false");
    expect(container.querySelector("[data-part='rcp']")).toHaveAttribute("data-active", "true");
    expect(screen.getByText("місце течі")).toBeInTheDocument();
  });
});
