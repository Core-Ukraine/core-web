import { PAGES, SECTIONS, sectionHref, topicHref } from "@/features/catalog/model/catalog";
import type { Path } from "@/shared/lib/path";

export interface MenuItem {
  href: Path;
  title: string;
  summary: string;
}

export interface MenuGroup {
  kind: "group";
  id: string;
  title: string;
  href: Path;
  align: "start" | "end";
  items: readonly MenuItem[];
}

export interface MenuLink {
  kind: "link";
  title: string;
  href: Path;
}

export type MenuEntry = MenuGroup | MenuLink;

// Four sections that open a list and two pages that open right away
export const MENU: readonly MenuEntry[] = [
  ...SECTIONS.map((section, index): MenuGroup => ({
    kind: "group",
    id: section.slug,
    title: section.title,
    href: sectionHref(section),
    // The last list opens to the left, so it stays inside the page
    align: index === SECTIONS.length - 1 ? "end" : "start",
    items: section.topics.map((topic) => ({
      href: topicHref(section, topic),
      title: topic.title,
      summary: topic.summary,
    })),
  })),
  { kind: "link", title: PAGES.about.title, href: PAGES.about.href },
  { kind: "link", title: PAGES.news.title, href: PAGES.news.href },
];

// Whether an address is a page or lies below it
export const isWithin = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

// The id of the list that holds the current page, if any
export const currentGroup = (pathname: string) =>
  MENU.find((entry): entry is MenuGroup => entry.kind === "group" && isWithin(pathname, entry.href))?.id ?? null;
