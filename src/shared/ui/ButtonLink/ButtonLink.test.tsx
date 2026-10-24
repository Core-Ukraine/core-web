import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ButtonLink from "./ButtonLink";

describe("ButtonLink", () => {
  it("links with the red style and an arrow", () => {
    render(
      <ButtonLink href="/osnovy" arrow>
        Почати з основ
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Почати з основ" });
    expect(link).toHaveAttribute("href", "/osnovy");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });

  it("can be white, compact and without the arrow", () => {
    render(
      <ButtonLink href="/reaktory" variant="light" compact>
        Типи реакторів
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Типи реакторів" });
    expect(link).toHaveAttribute("href", "/reaktory");
    expect(link.querySelector("svg")).not.toBeInTheDocument();
  });
});
