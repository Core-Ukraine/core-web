import { UNITS } from "../../model/history";
import Rich from "../Rich/Rich";

import styles from "./Fleet.module.scss";

// Every unit of AP1000 and CAP1000 with its status and its latest event
const Fleet = () => (
  <div className={styles.scroll}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Блок</th>
          <th scope="col">Країна</th>
          <th scope="col">Тип</th>
          <th scope="col">Статус</th>
          <th scope="col">Ключова подія</th>
        </tr>
      </thead>
      <tbody>
        {UNITS.map((unit) => (
          <tr key={unit.name}>
            <th scope="row" className={styles.unit}>
              {unit.name}
            </th>
            <td>{unit.country}</td>
            <td className={styles.type}>{unit.type}</td>
            <td>
              <span className={styles.status} data-status={unit.status}>
                {unit.label}
              </span>
            </td>
            <td>
              <Rich text={unit.event} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Fleet;
