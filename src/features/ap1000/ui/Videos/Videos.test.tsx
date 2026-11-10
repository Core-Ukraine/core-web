import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Videos from "./Videos";

describe("Videos", () => {
  it("lists the videos in four groups, each with what it shows and its language", () => {
    const { container } = render(<Videos />);
    expect([...container.querySelectorAll("h3")].map((heading) => heading.textContent)).toEqual([
      "Як влаштований AP1000",
      "Повне знеструмлення станції (SBO)",
      "Будівництво і монтаж обладнання",
      "Пуск блока: від палива до комерційної роботи",
    ]);
    const czech = screen.getByText("Jaderný reaktor AP1000");
    expect(czech).toHaveAttribute("href", "https://www.youtube.com/watch?v=PpCVzEzY_gk");
    expect(czech).toHaveAttribute("target", "_blank");
    const row = czech.closest("li");
    if (!row) throw new Error("The video has no row");
    expect(within(row).getByText("CZ")).toBeInTheDocument();
    expect(within(row).getByText("Пояснення будови реактора чеською.")).toBeInTheDocument();
  });
});
