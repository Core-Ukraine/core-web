import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Zoom from "./Zoom";

describe("Zoom", () => {
  it("opens the full drawing over the page and closes it again", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Zoom title="Компенсатор тиску" full={<span>Велике креслення</span>}>
        <span>Мале креслення</span>
      </Zoom>,
    );
    const dialog = container.querySelector("dialog");
    expect(dialog).not.toHaveAttribute("open");
    expect(screen.queryByText("Велике креслення")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Відкрити на весь екран: Компенсатор тиску" }));
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("aria-label", "Компенсатор тиску");
    expect(screen.getByText("Велике креслення")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Закрити" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(screen.queryByText("Велике креслення")).not.toBeInTheDocument();
  });
});
