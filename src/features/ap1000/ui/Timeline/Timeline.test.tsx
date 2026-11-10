import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MILESTONES } from "../../model/history";
import Timeline from "./Timeline";

describe("Timeline", () => {
  it("puts every milestone on the line and marks the turning points", () => {
    const { container } = render(<Timeline />);
    expect(container.querySelectorAll("li")).toHaveLength(MILESTONES.length);
    expect(screen.getByText("27.01.2006")).toBeInTheDocument();
    expect(screen.getByText("Сертифікація в США.").closest("li")).toHaveAttribute("data-key", "true");
    expect(screen.getByText("Програма ALWR.").closest("li")).toHaveAttribute("data-key", "false");
    expect(container.querySelectorAll("[data-key='true']")).toHaveLength(MILESTONES.filter((item) => item.key).length);
    expect(screen.getByLabelText("Джерело 20")).toHaveAttribute("href", "https://www.osti.gov/biblio/6719655");
  });
});
