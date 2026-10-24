import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LogoMark from "./LogoMark";

describe("LogoMark", () => {
  it("draws the hexagon, six rods and the centre, hidden from screen readers", () => {
    const { container } = render(<LogoMark className="mark" />);
    const mark = container.querySelector("svg");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveClass("mark");
    expect(container.querySelectorAll("polygon")).toHaveLength(1);
    expect(container.querySelectorAll("circle")).toHaveLength(7);
  });
});
