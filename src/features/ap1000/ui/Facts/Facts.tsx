import { FACTS } from "../../model/course";

import styles from "./Facts.module.scss";

// The key figures of AP1000 on a plate, like the nameplate of a machine
const Facts = () => (
  <dl className={styles.facts}>
    {FACTS.map(({ label, value, unit }) => (
      <div key={label} className={styles.fact}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.value}>
          {value}
          <span className={styles.unit}>{unit}</span>
        </dd>
      </div>
    ))}
  </dl>
);

export default Facts;
