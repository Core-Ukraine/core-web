import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SECTIONS } from "../../model/catalog";
import OtherSections from "./OtherSections";

describe("OtherSections", () => {
  it("links every section but the current one, with their numbers", () => {
    render(<OtherSections current={SECTIONS[1]!} />);
    expect(screen.getByRole("navigation", { name: "Інші розділи" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").map((link) => `${link.textContent} ${link.getAttribute("href")}`)).toEqual([
      "01Основи /osnovy",
      "03Історія /istoriia",
      "04Матеріали /materialy",
    ]);
  });
});
