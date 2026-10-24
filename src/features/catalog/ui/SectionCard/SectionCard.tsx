import Link from "next/link";
import type { ReactNode } from "react";

import type { Path } from "@/shared/lib/path";

import styles from "./SectionCard.module.scss";

interface SectionCardProps {
  number: string;
  title: string;
  description: string;
  href: Path;
  accent?: boolean;
  children: ReactNode;
}

// A card of a section: its number, name, description and what to open next
const SectionCard = ({ number, title, description, href, accent = false, children }: SectionCardProps) => (
  <article className={styles.card} data-accent={accent || undefined}>
    <span className={styles.number}>{number}</span>
    <h3 className={styles.title}>
      <Link href={href} className={styles.titleLink}>
        {title}
      </Link>
    </h3>
    <p className={styles.description}>{description}</p>
    <div className={styles.footer}>{children}</div>
  </article>
);

export default SectionCard;
