import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("shows the way, the title, the lead and the note", () => {
    render(
      <PageHeader
        crumbs={[{ title: "Головна", href: "/" }, { title: "Новини" }]}
        title="Новини"
        lead="Події галузі."
        meta="Розділ 06"
      />,
    );
    expect(screen.getByText("Розділ 06")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Навігаційний ланцюжок" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Новини" })).toBeInTheDocument();
    expect(screen.getByText("Події галузі.")).toBeInTheDocument();
  });

  it("leaves the lead out when there is none", () => {
    const { container } = render(<PageHeader crumbs={[{ title: "Головна" }]} title="Сторінка" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("adds a line under the title and more of the first screen", () => {
    render(
      <PageHeader crumbs={[{ title: "Головна" }]} title="AP-1000" subtitle="Реактор покоління III+">
        <dl aria-label="Цифри" />
      </PageHeader>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "AP-1000" })).toBeInTheDocument();
    expect(screen.getByText("Реактор покоління III+")).toBeInTheDocument();
    expect(screen.getByLabelText("Цифри")).toBeInTheDocument();
  });
});
