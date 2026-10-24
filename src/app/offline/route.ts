import { offlinePage } from "@/features/notifications/model/offlinePage";
import { SITE } from "@/shared/lib/site";

export const dynamic = "force-static";

// The page the service worker shows when another page cannot load offline
export const GET = () => {
  const colors = {
    background: "#0b1424",
    surface: "#111e33",
    text: "#f2f5fa",
    muted: "#c3cfe0",
    accent: "#e30220",
    onAccent: "#ffffff",
  };
  const { html, policy } = offlinePage({
    lang: "uk",
    name: SITE.name,
    title: "Немає звʼязку",
    message: "Ця сторінка ще не збережена на пристрої. Вона відкриється, щойно зʼявиться інтернет.",
    retry: "Спробувати ще раз",
    light: colors,
    dark: colors,
  });
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": policy,
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
};
