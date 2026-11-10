import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Scenarios from "./Scenarios";

describe("Scenarios", () => {
  it("opens the blackout with its drawings, its events and its videos", () => {
    const { container } = render(<Scenarios />);
    expect(container.querySelectorAll("fieldset button")).toHaveLength(6);
    expect(screen.getByText("Повне знеструмлення (SBO)")).toHaveAttribute("aria-pressed", "true");
    const last = screen.getByText("72 год");
    expect(last).toBeVisible();
    expect(last.closest("ol")?.children).toHaveLength(11);
    expect(last.closest("ol")).toHaveAttribute("aria-label", "Послідовність подій");
    const drawings = screen.getAllByAltText("Пасивне відведення залишкового тепла (PRHR) (NRC, рис. 4-1)");
    expect(drawings).toHaveLength(3);
    expect(drawings[0]).toBeVisible();
    expect(screen.getAllByText("Відео до сценарію")[1]?.tagName).toBe("H4");
    expect(screen.getByText("AP1000 Station Blackout - Spent Fuel Pool Cooling")).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=jzBe_kwIs28",
    );
  });
});
