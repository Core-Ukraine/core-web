import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Figure from "./Figure";

describe("Figure", () => {
  it("shows a drawing with its caption, labels and source", () => {
    const { container } = render(<Figure drawing="f5_1_1" note="Де стоять люки." />);
    const image = screen.getByRole("img", {
      name: "Сталева гермооболонка: вигляд збоку і план проходок (NRC, рис. 5.1-1)",
    });
    expect(image).toHaveAttribute("width", "1100");
    expect(image).toHaveAttribute("height", "1685");
    expect(container.querySelector("figure")).toHaveAttribute("data-size", "wide");
    expect(screen.getByText("Де стоять люки.")).toBeInTheDocument();
    expect(screen.getByText("Відмітки EL у футах і дюймах.")).toBeInTheDocument();
    expect(screen.getByText("Equipment hatch")).toBeInTheDocument();
    expect(screen.getByText("транспортний люк")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PDF" })).toHaveAttribute(
      "href",
      "https://www.nrc.gov/docs/ML1122/ML11221A107.pdf",
    );
    expect(screen.getByText(/NRC, навчальний курс AP1000, рис\. 5\.1-1/u)).toBeInTheDocument();
  });

  it("leaves out what a drawing does not have", () => {
    const { container } = render(<Figure drawing="f3_1" size="small" />);
    expect(container.querySelector("figure")).toHaveAttribute("data-size", "small");
    expect(screen.getByText("Петлі першого контуру, ізометрія")).toBeInTheDocument();
    expect(container.querySelectorAll("figcaption > span")).toHaveLength(1);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
