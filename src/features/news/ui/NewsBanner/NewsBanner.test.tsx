import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NewsBanner from "./NewsBanner";

describe("NewsBanner", () => {
  it("leads to the news while there is none yet", () => {
    render(<NewsBanner items={[]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Що нового" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Усі новини" })).toHaveAttribute("href", "/novyny");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("shows the three latest news, newest first", () => {
    const items = ["2026-09-01", "2026-10-24", "2026-10-01", "2026-08-15"].map((date) => ({
      date,
      title: `Новина ${date}`,
      summary: "",
    }));
    render(<NewsBanner items={items} />);
    const links = screen.getAllByRole("listitem").map((item) => item.textContent);
    expect(links).toEqual([
      "24 жовтня 2026 р.Новина 2026-10-24",
      "1 жовтня 2026 р.Новина 2026-10-01",
      "1 вересня 2026 р.Новина 2026-09-01",
    ]);
  });
});
