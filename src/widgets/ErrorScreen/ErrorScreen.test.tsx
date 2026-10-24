import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ErrorScreen from "./ErrorScreen";

describe("ErrorScreen", () => {
  it("leads from a missing page home and to the sections", () => {
    render(<ErrorScreen eyebrow="Помилка 404" title="Сторінку не знайдено" text="Її немає." />);
    expect(screen.getByRole("heading", { level: 1, name: "Сторінку не знайдено" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "На головну" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Усі розділи" })).toHaveAttribute("href", "/#rozdily");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("offers a retry after a failure and shows the reference", async () => {
    const onRetry = vi.fn<() => void>();
    render(<ErrorScreen eyebrow="Помилка" title="Щось пішло не так" text="Збій." digest="42" onRetry={onRetry} />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Спробувати ще раз" }));
    expect(onRetry).toHaveBeenCalledOnce();
    expect(screen.getByText("Код помилки: 42")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Усі розділи" })).not.toBeInTheDocument();
  });
});
