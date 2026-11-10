import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Block } from "../../model/course";
import Article from "./Article";

describe("Article", () => {
  it("sets text, points, headings, notes and drawings in order", () => {
    const blocks: readonly Block[] = [
      { kind: "heading", text: "Реактор" },
      { kind: "subheading", text: "Корпус" },
      { kind: "text", paragraphs: ["Перший абзац.[9]", "Другий абзац з `PRHR`."] },
      { kind: "points", points: [{ lead: "Перший контур.", text: "Вода нагрівається.[2]" }] },
      { kind: "part", text: "Частина 1 · Кожна система окремо" },
      { kind: "note", text: "Для порівняння.[17]" },
      { kind: "drawing", drawing: "f3_2", note: "Вигляд у плані." },
    ];
    render(<Article blocks={blocks} />);
    expect(screen.getByRole("heading", { level: 3, name: "Реактор" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Корпус" })).toBeInTheDocument();
    expect(screen.getByText("Другий абзац з", { exact: false })).toHaveTextContent("Другий абзац з PRHR.");
    expect(screen.getByText("Перший контур.").tagName).toBe("STRONG");
    expect(screen.getByText("Частина 1 · Кожна система окремо")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Джерело 17" })).toBeInTheDocument();
    expect(screen.getByText("Вигляд у плані.")).toBeInTheDocument();
  });

  it("lists the labels of a drawing and the stages of a chain", () => {
    render(
      <Article
        blocks={[
          { kind: "glossary", label: "Позначення на рисунку 3-2", terms: [{ term: "RV", meaning: "корпус реактора" }] },
          {
            kind: "chain",
            label: "Черговість джерел води при течі",
            links: [{ name: "CMT", note: "за повного тиску" }, { name: "Рециркуляція" }],
          },
        ]}
      />,
    );
    const glossary = screen.getByRole("region", { name: "Позначення на рисунку 3-2" });
    expect(within(glossary).getByText("Позначення на кресленні")).toBeInTheDocument();
    expect(within(glossary).getByRole("term")).toHaveTextContent("RV");
    expect(within(glossary).getByRole("definition")).toHaveTextContent("корпус реактора");
    const chain = screen.getByRole("list", { name: "Черговість джерел води при течі" });
    expect(
      within(chain)
        .getAllByRole("listitem")
        .map((stage) => stage.textContent),
    ).toEqual(["CMTза повного тиску", "Рециркуляція"]);
  });

  it("shows the parameters, the counts and the parts of the course", () => {
    render(
      <Article
        blocks={[
          { kind: "parameters" },
          { kind: "counts" },
          { kind: "cycle" },
          { kind: "timeline" },
          { kind: "fleet" },
          { kind: "videos" },
          { kind: "sources" },
          { kind: "quiz" },
        ]}
      />,
    );
    const parameters = screen.getByText("Тиск у першому контурі");
    expect(parameters.tagName).toBe("TH");
    expect(parameters.closest("tbody")?.children).toHaveLength(17);
    expect(screen.getByText("12-14").tagName).toBe("STRONG");
    expect(screen.getByLabelText(/^Спрощена схема енергоблока/u).tagName).toBe("FIGURE");
    expect(screen.getByText("27.01.2006")).toBeInTheDocument();
    expect(screen.getByText("Богуниці").tagName).toBe("TH");
    expect(screen.getByText("AP1000 Safety Systems").tagName).toBe("A");
    expect(screen.getByText("Wikipedia. AP600").tagName).toBe("A");
    expect(screen.getByText("Запитання 1 з 8").tagName).toBe("LEGEND");
  });

  it("brings in the equipment and the scenarios", () => {
    render(<Article blocks={[{ kind: "positions" }, { kind: "scenarios" }]} />);
    expect(screen.getByLabelText("Перелік обладнання").tagName).toBe("UL");
    expect(screen.getByText("Сценарій").tagName).toBe("LEGEND");
  });
});
