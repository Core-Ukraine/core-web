import Link from "next/link";

import type { Path } from "@/shared/lib/path";
import Icon from "@/shared/ui/Icon/Icon";

import styles from "./TopicCard.module.scss";

interface TopicCardProps {
  href: Path;
  number: string;
  title: string;
  summary: string;
}

// A topic of a section as one big link
const TopicCard = ({ href, number, title, summary }: TopicCardProps) => (
  <Link href={href} className={styles.card}>
    <span className={styles.number}>{number}</span>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.summary}>{summary}</p>
    <span className={styles.more} aria-hidden="true">
      Читати
      <Icon name="arrow" size={18} className={styles.arrow} />
    </span>
  </Link>
);

export default TopicCard;
