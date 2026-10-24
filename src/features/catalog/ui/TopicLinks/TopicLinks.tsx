import Link from "next/link";

import { cx } from "@/shared/lib/cx";
import type { Path } from "@/shared/lib/path";

import styles from "./TopicLinks.module.scss";

export interface TopicLink {
  href: Path;
  title: string;
  current?: boolean;
}

interface TopicLinksProps {
  links: readonly TopicLink[];
  className?: string;
}

// Links in rows between thin lines, each with a red arrow
const TopicLinks = ({ links, className }: TopicLinksProps) => (
  <ul className={cx(styles.list, className)}>
    {links.map(({ href, title, current = false }) => (
      <li key={href} className={styles.item}>
        <Link href={href} className={styles.link} aria-current={current ? "page" : undefined}>
          {title}
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

export default TopicLinks;
