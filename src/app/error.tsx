"use client";

import ErrorScreen from "@/widgets/ErrorScreen/ErrorScreen";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

// Shown when a page fails to render, with a way to try again
const ErrorPage = ({ error, retry }: ErrorPageProps) => (
  <ErrorScreen
    eyebrow="Помилка"
    title="Щось пішло не так"
    text="Сторінка не відкрилася через збій на сервері. Спробуйте ще раз за хвилину."
    digest={error.digest}
    onRetry={retry}
  />
);

export default ErrorPage;
