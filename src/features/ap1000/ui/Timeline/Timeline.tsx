import { MILESTONES } from "../../model/history";
import Rich from "../Rich/Rich";

import styles from "./Timeline.module.scss";

// The history of AP1000 on a line, the turning points marked in red
const Timeline = () => (
  <ol className={styles.timeline}>
    {MILESTONES.map(({ date, title, text, key = false }) => (
      <li key={`${date} ${title}`} className={styles.milestone} data-key={key}>
        <span className={styles.date}>{date}</span>
        <p className={styles.text}>
          <strong className={styles.title}>{title}.</strong> <Rich text={text} />
        </p>
      </li>
    ))}
  </ol>
);

export default Timeline;
