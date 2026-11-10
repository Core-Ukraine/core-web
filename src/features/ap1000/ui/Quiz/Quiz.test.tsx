import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { QUIZ } from "../../model/quiz";
import Quiz from "./Quiz";

// The group of a question by its number
const question = (number: number) => {
  const group = screen.getByText(`Запитання ${number} з ${QUIZ.length}`).closest("fieldset");
  if (!group) throw new Error(`Question ${number} has no group`);
  return group;
};

describe("Quiz", () => {
  it("marks a right answer, explains it and ignores later clicks", async () => {
    const user = userEvent.setup();
    render(<Quiz />);
    expect(screen.getByText(`Відповідей: 0 з ${QUIZ.length}`)).toBeInTheDocument();
    const first = within(question(1));
    await user.click(first.getByRole("button", { name: "Дві" }));
    expect(first.getByRole("button", { name: "Дві, правильна відповідь" })).toHaveAttribute("data-state", "right");
    expect(first.getByText("Правильно.")).toBeInTheDocument();
    expect(first.getByRole("button", { name: "Три" })).toHaveAttribute("aria-disabled", "true");

    await user.click(first.getByRole("button", { name: "Три" }));
    expect(first.getByRole("button", { name: "Три" })).not.toHaveAttribute("data-state");
    expect(screen.getByText(`Відповідей: 1 з ${QUIZ.length}`)).toBeInTheDocument();
  });

  it("marks a wrong answer beside the right one", async () => {
    const user = userEvent.setup();
    render(<Quiz />);
    const second = within(question(2));
    await user.click(second.getByRole("button", { name: "12 годин" }));
    expect(second.getByRole("button", { name: "12 годин, ваша відповідь" })).toHaveAttribute("data-state", "wrong");
    expect(second.getByRole("button", { name: "72 години, правильна відповідь" })).toBeInTheDocument();
    expect(second.getByText("Ні.")).toBeInTheDocument();
  });

  it("counts the score at the end and starts again", async () => {
    const user = userEvent.setup();
    render(<Quiz />);
    for (const [index, item] of QUIZ.entries()) {
      const options = within(question(index + 1)).getAllByRole("button");
      fireEvent.click(options[index === 0 ? (item.answer + 1) % 4 : item.answer]!);
    }
    expect(screen.getByText(`Результат: ${QUIZ.length - 1} з ${QUIZ.length}`)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Пройти ще раз" }));
    expect(screen.getByText(`Відповідей: 0 з ${QUIZ.length}`)).toBeInTheDocument();
    expect(within(question(1)).getByRole("button", { name: "Дві" })).toHaveAttribute("aria-disabled", "false");
  });
});
