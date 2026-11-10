import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Rich from "./Rich";

describe("Rich", () => {
  it("shows the text with links to its sources and its terms", () => {
    const { container } = render(
      <p>
        <Rich text="Тепло забирає `PRHR`.[4,21]" />
      </p>,
    );
    expect(container.querySelector("p")).toHaveTextContent("Тепло забирає PRHR.4,21");
    expect(screen.getByText("PRHR").tagName).toBe("SPAN");
    const first = screen.getByRole("link", { name: "Джерело 4" });
    expect(first).toHaveAttribute("href", "https://www.nrc.gov/docs/ML1122/ML11221A100.pdf");
    expect(first).toHaveAttribute("target", "_blank");
    expect(first).toHaveAttribute("rel", "noopener noreferrer");
    expect(first).toHaveAttribute("title", expect.stringMatching(/^NRC\. AP1000 Technology/u));
    expect(screen.getByRole("link", { name: "Джерело 21" })).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/AP1000",
    );
  });

  it("fails on a source that is not in the list", () => {
    expect(() => render(<Rich text="Ніде.[99]" />)).toThrow("source 99");
  });
});
