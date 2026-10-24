import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Logo from "./Logo";

describe("Logo", () => {
  it("draws the assembly with six rods and the red centre next to the name", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("circle")).toHaveLength(7);
    expect(container).toHaveTextContent(/^ЯДРО$/u);
  });

  it("adds the tagline on request", () => {
    const { container } = render(<Logo tagline />);
    expect(container).toHaveTextContent("ЯДРО Атомна енергетика");
  });
});
