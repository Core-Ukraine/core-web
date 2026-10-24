import { formatDate } from "@/shared/lib/time";
import ButtonLink from "@/shared/ui/ButtonLink/ButtonLink";

import { newestFirst, type NewsItem } from "../../model/news";

import styles from "./NewsList.module.scss";

// The news from the newest, or a note that there are none yet
const NewsList = ({ items }: { items: readonly NewsItem[] }) => {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>Новин поки немає</h2>
        <p className={styles.emptyText}>
          Тут зʼявлятимуться події галузі, оновлення проєкту та нові матеріали. А поки можна почати навчання.
        </p>
        <ButtonLink href="/osnovy" variant="light" compact>
          Почати з основ
        </ButtonLink>
      </div>
    );
  }
  return (
    <ol className={styles.list}>
      {newestFirst(items).map((item) => (
        <li key={`${item.date}-${item.title}`} className={styles.item}>
          <article className={styles.article}>
            <time className={styles.date} dateTime={item.date}>
              {formatDate(item.date)}
            </time>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.summary}>{item.summary}</p>
          </article>
        </li>
      ))}
    </ol>
  );
};

export default NewsList;
