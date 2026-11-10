import { SOURCE_GROUPS, sourceAnchor, SOURCES } from "../../model/sources";

import styles from "./Sources.module.scss";

// The numbered sources of the course in groups by who published them
const Sources = () => (
  <div className={styles.groups}>
    {SOURCE_GROUPS.map((group) => (
      <section key={group.title} className={styles.group} aria-label={group.title}>
        <h3 className={styles.title}>{group.title}</h3>
        <ol className={styles.list} start={group.first}>
          {SOURCES.slice(group.first - 1, group.last).map((source, index) => (
            <li key={source.url} id={sourceAnchor(group.first + index)} className={styles.source}>
              <span className={styles.number}>{group.first + index}</span>
              <span className={styles.body}>
                <a className={styles.link} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
                {source.note ? <span className={styles.note}>{source.note}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </section>
    ))}
  </div>
);

export default Sources;
