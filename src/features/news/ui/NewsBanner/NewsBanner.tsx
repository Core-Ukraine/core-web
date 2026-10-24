import Link from "next/link";

import { PAGES } from "@/features/catalog/model/catalog";
import { formatDate } from "@/shared/lib/time";
import ButtonLink from "@/shared/ui/ButtonLink/ButtonLink";

import { newestFirst, type NewsItem } from "../../model/news";

import styles from "./NewsBanner.module.scss";

// How many of the latest news the banner shows
const LATEST = 3;

// A blue band with the latest news, or a word about them while there is none
const NewsBanner = ({ items }: { items: readonly NewsItem[] }) => {
  const latest = newestFirst(items).slice(0, LATEST);
  return (
    <section className={styles.banner} aria-labelledby="news-title">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{PAGES.news.title}</p>
            <h2 id="news-title" className={styles.title}>
              Що нового
            </h2>
            <p className={styles.text}>{PAGES.news.description}</p>
          </div>
          {latest.length > 0 ? (
            <ul className={styles.list}>
              {latest.map((item) => (
                <li key={`${item.date}-${item.title}`}>
                  <Link href={PAGES.news.href} className={styles.item}>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <ButtonLink href={PAGES.news.href} arrow className={styles.button}>
            Усі новини
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default NewsBanner;
