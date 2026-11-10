import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UNITS } from "../../model/history";
import Fleet from "./Fleet";

describe("Fleet", () => {
  it("lists every unit with its country, type, status and latest event", () => {
    const { container } = render(<Fleet />);
    expect([...container.querySelectorAll("th[scope='col']")].map((cell) => cell.textContent)).toEqual([
      "Блок",
      "Країна",
      "Тип",
      "Статус",
      "Ключова подія",
    ]);
    expect(container.querySelectorAll("th[scope='row']")).toHaveLength(UNITS.length);
    const row = screen.getByText("Хмельницька 5-6").closest("tr");
    if (!row) throw new Error("The unit has no row");
    expect(within(row).getByText("Україна")).toBeInTheDocument();
    expect(within(row).getByText("Призупинено")).toHaveAttribute("data-status", "stop");
    expect(within(row).getByRole("link", { name: "Джерело 30" })).toBeInTheDocument();
  });
});
