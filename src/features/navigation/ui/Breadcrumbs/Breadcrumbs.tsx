import Link from "next/link";

import { cx } from "@/shared/lib/cx";

import type { Crumb } from "../../model/trail";

import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbsProps {
  items: readonly Crumb[];
  className?: string;
}

// The way from the home page to this one; the last step is the current page
const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="Навігаційний ланцюжок" className={cx(styles.nav, className)}>
    <ol className={styles.list}>
      {items.map(({ title, href }) => (
        <li key={title} className={styles.item}>
          {href ? (
            <Link href={href} className={styles.link}>
              {title}
            </Link>
          ) : (
            <span aria-current="page">{title}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
