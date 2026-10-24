"use client";

import "./globals.scss";
import ErrorScreen from "@/widgets/ErrorScreen/ErrorScreen";

import { fontVariables } from "./fonts";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

// Last resort when even the layout fails
const GlobalError = ({ error, retry }: GlobalErrorProps) => (
  <html lang="uk" className={fontVariables} data-scroll-behavior="smooth">
    <body>
      <main id="content">
        <ErrorScreen
          eyebrow="Помилка"
          title="Щось пішло не так"
          text="Сайт не зміг відкритися через збій на сервері. Спробуйте ще раз за хвилину."
          digest={error.digest}
          onRetry={retry}
        />
      </main>
    </body>
  </html>
);

export default GlobalError;
