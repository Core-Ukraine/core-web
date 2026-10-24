import Link from "next/link";

import Icon from "@/shared/ui/Icon/Icon";

import type { TopicStep } from "../../model/catalog";

import styles from "./TopicPager.module.scss";

interface TopicPagerProps {
  previous?: TopicStep;
  next?: TopicStep;
}

// The topics before and after this one, so a reader can go on without the menu
const TopicPager = ({ previous, next }: TopicPagerProps) => (
  <nav aria-label="Інші теми" className={styles.pager}>
    {previous ? (
      <Link href={previous.href} className={styles.link} rel="prev">
        <span className={styles.label}>
          <Icon name="arrow" size={16} className={styles.back} />
          Попередня тема
        </span>{" "}
        <span className={styles.title}>{previous.title}</span>{" "}
        <span className={styles.section}>{previous.section}</span>
      </Link>
    ) : null}
    {next ? (
      <Link href={next.href} className={styles.link} rel="next" data-next>
        <span className={styles.label}>
          Наступна тема
          <Icon name="arrow" size={16} className={styles.forward} />
        </span>{" "}
        <span className={styles.title}>{next.title}</span> <span className={styles.section}>{next.section}</span>
      </Link>
    ) : null}
  </nav>
);

export default TopicPager;
