import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("links every step but the current page", () => {
    render(
      <Breadcrumbs
        items={[{ title: "Головна", href: "/" }, { title: "Реактори", href: "/reaktory" }, { title: "ВВЕР-1000" }]}
      />,
    );
    const trail = screen.getByRole("navigation", { name: "Навігаційний ланцюжок" });
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Реактори" })).toHaveAttribute("href", "/reaktory");
    expect(screen.getByText("ВВЕР-1000")).toHaveAttribute("aria-current", "page");
    expect(trail.querySelectorAll("a")).toHaveLength(2);
  });
});
