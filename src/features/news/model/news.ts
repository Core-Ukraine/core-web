export interface NewsItem {
  date: string;
  title: string;
  summary: string;
}

// The news of the project, with the date as YYYY-MM-DD; empty until the first one
export const NEWS: readonly NewsItem[] = [];

// The news from the newest to the oldest
export const newestFirst = (items: readonly NewsItem[]) => items.toSorted((a, b) => b.date.localeCompare(a.date));
