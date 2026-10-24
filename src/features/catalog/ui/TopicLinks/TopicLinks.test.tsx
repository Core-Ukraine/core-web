import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TopicLinks from "./TopicLinks";

describe("TopicLinks", () => {
  it("lists the links with hidden arrows and marks the open one", () => {
    render(
      <TopicLinks
        links={[
          { href: "/reaktory/vver-1000", title: "ВВЕР-1000", current: true },
          { href: "/reaktory/rbmk-1000", title: "РБМК-1000" },
        ]}
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/reaktory/vver-1000", "/reaktory/rbmk-1000"]);
    expect(screen.getByRole("link", { name: "ВВЕР-1000" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "РБМК-1000" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByText("→")[0]).toHaveAttribute("aria-hidden", "true");
  });
});
