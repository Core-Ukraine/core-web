// The year for the copyright line
export const currentYear = () => new Date().getFullYear();

const DATE = new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// A calendar date such as 2026-10-24 in words: 24 жовтня 2026 р.
export const formatDate = (isoDate: string) => DATE.format(new Date(`${isoDate}T00:00:00Z`));
