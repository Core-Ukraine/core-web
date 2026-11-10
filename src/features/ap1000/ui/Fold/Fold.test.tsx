import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Fold from "./Fold";

describe("Fold", () => {
  it("keeps a scheme folded under its name with the meaning of its colours", () => {
    const { container } = render(
      <Fold title="Схема" legend={[{ kind: "hot", label: "гаряча вода" }]} note="Не в масштабі.">
        <span>Креслення</span>
      </Fold>,
    );
    const details = container.querySelector("details");
    expect(details).not.toHaveAttribute("open");
    expect(container.querySelector("summary")).toHaveTextContent("Схема");
    const legend = screen.getByRole("list", { name: "Умовні позначення" });
    expect(within(legend).getByText("гаряча вода")).toBeInTheDocument();
    expect(legend.querySelector("[data-kind='hot']")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Не в масштабі.")).toBeInTheDocument();
  });

  it("can start unfolded and without a note", () => {
    const { container } = render(
      <Fold title="Схема" open legend={[]}>
        <span>Креслення</span>
      </Fold>,
    );
    expect(container.querySelector("details")).toHaveAttribute("open");
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });
});
