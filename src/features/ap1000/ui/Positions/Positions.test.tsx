import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Positions from "./Positions";

describe("Positions", () => {
  it("lists the fourteen positions beside the NRC section, the vessel open first", () => {
    const { container } = render(<Positions />);
    const picks = container.querySelectorAll("button[aria-pressed]");
    expect(picks).toHaveLength(14);
    expect(picks[0]).toHaveTextContent("1 Корпус реактора");
    expect(picks[0]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByAltText("Розріз гермооболонки і захисної будівлі (NRC, рис. 1-2, аркуш 1)")).toBeVisible();
    expect(screen.getByText("Поз. 1. Корпус реактора").tagName).toBe("H4");
    expect(screen.getByText("Вхід / вихід")).toBeVisible();
    expect(screen.getByText("≈280 / 321 °C")).toBeVisible();
    expect(screen.getByAltText("Парогенератор Delta-125 (NRC, рис. 3-5)")).not.toBeVisible();
  });
});
