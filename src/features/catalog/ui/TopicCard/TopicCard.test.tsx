import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TopicCard from "./TopicCard";

describe("TopicCard", () => {
  it("turns the whole card into a link named after the topic", () => {
    render(<TopicCard href="/osnovy/turbiny" number="01.2" title="Турбіни" summary="Енергія пари" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/osnovy/turbiny");
    expect(link).toHaveAccessibleName("01.2 Турбіни Енергія пари");
    expect(screen.getByRole("heading", { level: 2, name: "Турбіни" })).toBeInTheDocument();
  });
});
