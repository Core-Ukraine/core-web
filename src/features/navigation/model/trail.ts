import type { Path } from "@/shared/lib/path";

export interface Crumb {
  title: string;
  href?: Path;
}

// The way to a page: the home page first, then the given steps
export const trail = (...steps: readonly Crumb[]): Crumb[] => [{ title: "Головна", href: "/" }, ...steps];
