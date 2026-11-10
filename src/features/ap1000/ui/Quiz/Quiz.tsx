"use client";

import { useState } from "react";

import { QUIZ } from "../../model/quiz";

import styles from "./Quiz.module.scss";

// The questions answered so far, by question number
type Answers = Readonly<Partial<Record<number, number>>>;

// How an option looks once its question is answered: right, wrong or as before
const stateOf = (option: number, chosen: number | undefined, answer: number) => {
  if (chosen !== undefined && option === answer) return "right";
  if (chosen !== undefined && option === chosen) return "wrong";
  return null;
};

// The test at the end: one answer per question, then the explanation and the score
const Quiz = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const given = Object.keys(answers).length;
  const right = QUIZ.filter((question, index) => answers[index] === question.answer).length;

  // Keeps the first answer to a question and ignores later clicks
  const choose = (question: number, option: number) => {
    if (answers[question] === undefined) setAnswers({ ...answers, [question]: option });
  };

  return (
    <div className={styles.quiz}>
      {QUIZ.map((question, index) => {
        const chosen = answers[index];
        return (
          <fieldset key={question.question} className={styles.question}>
            <legend className={styles.count}>{`Запитання ${index + 1} з ${QUIZ.length}`}</legend>
            <p className={styles.text}>{question.question}</p>
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => {
                const state = stateOf(optionIndex, chosen, question.answer);
                return (
                  <button
                    key={option}
                    type="button"
                    className={styles.option}
                    data-state={state}
                    aria-disabled={chosen !== undefined}
                    onClick={() => choose(index, optionIndex)}
                  >
                    {option}
                    {state ? (
                      <span className="visually-hidden">
                        {state === "right" ? ", правильна відповідь" : ", ваша відповідь"}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {chosen === undefined ? null : (
              <p className={styles.explanation} data-right={chosen === question.answer}>
                <strong>{chosen === question.answer ? "Правильно." : "Ні."}</strong> {question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      <div className={styles.score} aria-live="polite">
        {given < QUIZ.length ? (
          <span>{`Відповідей: ${given} з ${QUIZ.length}`}</span>
        ) : (
          <>
            <span className={styles.result}>{`Результат: ${right} з ${QUIZ.length}`}</span>
            <button type="button" className={styles.again} onClick={() => setAnswers({})}>
              Пройти ще раз
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
