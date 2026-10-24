import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TopicPager from "./TopicPager";

describe("TopicPager", () => {
  it("links the topics before and after this one", () => {
    render(
      <TopicPager
        previous={{ href: "/osnovy/turbiny", title: "Турбіни", section: "Основи" }}
        next={{ href: "/reaktory/rbmk-1000", title: "РБМК-1000", section: "Реактори" }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Інші теми" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Попередня тема Турбіни/u })).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link", { name: /^Наступна тема РБМК-1000 Реактори$/u })).toHaveAttribute(
      "href",
      "/reaktory/rbmk-1000",
    );
  });

  it("leaves out a side that does not exist", () => {
    const { rerender } = render(<TopicPager next={{ href: "/osnovy/turbiny", title: "Турбіни", section: "Основи" }} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText("Попередня тема")).not.toBeInTheDocument();
    rerender(<TopicPager previous={{ href: "/osnovy/teoriia", title: "Теорія", section: "Основи" }} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText("Наступна тема")).not.toBeInTheDocument();
  });
});
