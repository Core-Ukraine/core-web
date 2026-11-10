import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SOURCES } from "../../model/sources";
import Sources from "./Sources";

describe("Sources", () => {
  it("numbers every source in its group, with its note and an anchor", () => {
    const { container } = render(<Sources />);
    expect([...container.querySelectorAll("h3")].map((heading) => heading.textContent)).toEqual([
      "NRC",
      "Westinghouse",
      "Довідкові статті",
      "Новини і звіти компаній",
    ]);
    expect(container.querySelectorAll("li")).toHaveLength(SOURCES.length);
    const westinghouse = container.querySelector("#dzherelo-18");
    expect(westinghouse).toHaveTextContent(/^18Westinghouse\. AP1000 Station Blackout/u);
    expect(westinghouse).toHaveTextContent("Хронологія знеструмлення");
    expect(container.querySelector("#dzherelo-21 span span")).toBeNull();
    expect(screen.getByText("Wikipedia. AP1000")).toHaveAttribute("rel", "noopener noreferrer");
  });
});
