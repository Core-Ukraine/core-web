// Outline icons on a 24 px grid; the shapes follow Lucide (lucide.dev)
export const icons = {
  chevron: ["m6 9 6 6 6-6"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
  arrowUp: ["M12 19V5", "m6 11 6-6 6 6"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  close: ["M18 6 6 18", "m6 6 12 12"],
  refresh: ["M21 12a9 9 0 1 1-9-9c2.5 0 4.9 1 6.7 2.7L21 8", "M21 3v5h-5"],
  offline: [
    "M12 20h.01",
    "M8.5 16.4a5 5 0 0 1 7 0",
    "M5 12.9a10 10 0 0 1 5.2-2.7",
    "M19 12.9a10 10 0 0 0-2-1.5",
    "M2 8.8a15 15 0 0 1 4.2-2.6",
    "M22 8.8a15 15 0 0 0-11.3-3.8",
    "m2 2 20 20",
  ],
} as const;

export type IconName = keyof typeof icons;
