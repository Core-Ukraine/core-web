import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectDetails from "./ProjectDetails";

describe("ProjectDetails", () => {
  it("names every part of the project and keeps an anchor for the contacts", () => {
    render(<ProjectDetails />);
    expect(screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual([
      "Мета",
      "Що є на сайті",
      "Команда",
      "Історія проєкту",
      "Звʼязок",
    ]);
    expect(screen.getByRole("region", { name: "Звʼязок" })).toHaveAttribute("id", "zviazok");
    expect(screen.getByRole("region", { name: "Мета" })).toHaveTextContent("01");
  });
});
