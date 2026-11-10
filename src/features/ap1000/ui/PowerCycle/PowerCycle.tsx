import type { FlowKind } from "../../model/plant";
import Fold from "../Fold/Fold";

import styles from "./PowerCycle.module.scss";

// The pipes of the cycle: the primary circuit, steam, feed and cooling water
const PIPES: readonly { path: string; kind: FlowKind }[] = [
  { path: "M140 86 H210", kind: "hot" },
  { path: "M210 176 H140", kind: "cold" },
  { path: "M282 66 H386", kind: "steam" },
  { path: "M430 120 V170", kind: "steam" },
  { path: "M384 205 H330 V170 H282", kind: "water" },
  { path: "M720 180 H492", kind: "water" },
  { path: "M492 206 H720", kind: "water" },
];

// The simplified unit from the reactor to the generator, with moving flows
const PowerCycle = () => (
  <Fold
    title="Спрощена схема енергоблока"
    open
    legend={[
      { kind: "hot", label: "перший контур, гарячий" },
      { kind: "cold", label: "перший контур, холодний" },
      { kind: "steam", label: "пара" },
      { kind: "water", label: "живильна і циркуляційна вода" },
    ]}
  >
    <figure
      className={styles.figure}
      aria-label="Спрощена схема енергоблока AP1000: перший і другий контури, циркуляційна вода"
    >
      <svg className={styles.scheme} viewBox="0 0 760 250" aria-hidden="true" focusable="false">
        {PIPES.map(({ path, kind }) => (
          <g key={path}>
            <path className={styles.pipe} data-kind={kind} d={path} />
            <path className={styles.flow} data-kind={kind} d={path} />
          </g>
        ))}
        <rect className={styles.vessel} x="30" y="46" width="110" height="160" rx="12" />
        <rect className={styles.core} x="60" y="120" width="50" height="60" />
        <text className={styles.name} x="85" y="70" textAnchor="middle">
          Реактор
        </text>
        <text className={styles.caption} x="85" y="88" textAnchor="middle">
          3 400 МВт тепл.
        </text>
        <text className={styles.caption} x="85" y="226" textAnchor="middle">
          15,5 МПа
        </text>
        <text className={styles.caption} x="175" y="78" textAnchor="middle">
          321 °C
        </text>
        <text className={styles.caption} x="175" y="196" textAnchor="middle">
          ≈280 °C
        </text>
        <circle className={styles.vessel} cx="175" cy="176" r="9" />
        <text className={styles.caption} x="175" y="160" textAnchor="middle">
          ГЦН
        </text>
        <rect className={styles.vessel} x="210" y="40" width="72" height="170" rx="30" />
        <text className={styles.name} x="246" y="130" textAnchor="middle">
          ПГ
        </text>
        <polygon className={styles.vessel} points="386,46 474,24 474,118 386,98" />
        <text className={styles.name} x="430" y="76" textAnchor="middle">
          Турбіна
        </text>
        <line className={styles.shaft} x1="474" y1="72" x2="526" y2="72" />
        <rect className={styles.vessel} x="526" y="46" width="112" height="52" rx="6" />
        <text className={styles.name} x="582" y="68" textAnchor="middle">
          Генератор
        </text>
        <text className={styles.caption} x="582" y="86" textAnchor="middle">
          1 117 МВт нетто
        </text>
        <rect className={styles.tank} x="384" y="170" width="108" height="46" rx="4" />
        <text className={styles.name} x="438" y="198" textAnchor="middle">
          Конденсатор
        </text>
        <circle className={styles.vessel} cx="330" cy="188" r="9" />
        <text className={styles.caption} x="330" y="234" textAnchor="middle">
          живильний насос
        </text>
        <text className={styles.caption} x="606" y="170" textAnchor="middle">
          циркуляційна вода
        </text>
        <text className={styles.caption} x="330" y="56" textAnchor="middle">
          пара
        </text>
      </svg>
    </figure>
  </Fold>
);

export default PowerCycle;
