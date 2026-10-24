import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import About from "./About";

describe("About", () => {
  it("explains the site in three paragraphs and links the project page", () => {
    render(<About />);
    expect(screen.getByRole("region", { name: "Про що цей сайт" })).toBeInTheDocument();
    expect(screen.getByText(/^\[Абзац 1\./u)).toBeInTheDocument();
    expect(screen.getByText(/^\[Абзац 3\./u)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Детальніше про проєкт" })).toHaveAttribute("href", "/pro-proiekt");
  });
});
