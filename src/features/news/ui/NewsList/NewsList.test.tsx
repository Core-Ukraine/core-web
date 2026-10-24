import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NewsList from "./NewsList";

describe("NewsList", () => {
  it("says there is no news yet and suggests where to start", () => {
    render(<NewsList items={[]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Новин поки немає" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Почати з основ" })).toHaveAttribute("href", "/osnovy");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("lists the news from the newest with readable dates", () => {
    render(
      <NewsList
        items={[
          { date: "2026-09-01", title: "Відкрито розділ «Основи»", summary: "Перші статті." },
          { date: "2026-10-24", title: "Сайт запущено", summary: "Перша версія порталу." },
        ]}
      />,
    );
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toEqual(["Сайт запущено", "Відкрито розділ «Основи»"]);
    expect(screen.getByText("24 жовтня 2026 р.")).toHaveAttribute("datetime", "2026-10-24");
  });
});
