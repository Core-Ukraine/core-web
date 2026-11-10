import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Facts from "./Facts";

describe("Facts", () => {
  it("puts the key figures on a plate with their units", () => {
    const { container } = render(<Facts />);
    expect(container.querySelectorAll("dt")).toHaveLength(5);
    expect(screen.getByText("Теплова потужність")).toBeInTheDocument();
    expect(screen.getByText("Без оператора").nextElementSibling).toHaveTextContent("72год");
    expect(screen.getByText("ТВЗ")).toBeInTheDocument();
  });
});
