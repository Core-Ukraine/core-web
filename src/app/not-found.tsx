import type { Metadata } from "next";

import ErrorScreen from "@/widgets/ErrorScreen/ErrorScreen";

export const metadata: Metadata = { title: "Сторінку не знайдено", robots: { index: false, follow: true } };

// The page for addresses the site does not have
const NotFound = () => (
  <ErrorScreen
    eyebrow="Помилка 404"
    title="Сторінку не знайдено"
    text="Можливо, її перенесли або в адресі є помилка. Почніть з головної або оберіть розділ."
  />
);

export default NotFound;
