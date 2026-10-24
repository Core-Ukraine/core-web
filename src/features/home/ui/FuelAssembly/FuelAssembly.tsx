import { cx } from "@/shared/lib/cx";

import { assembly } from "../../model/assembly";
import { FIGURE } from "../../model/home";

import styles from "./FuelAssembly.module.scss";

const RODS = assembly();

// Small round swatches for the legend
const SWATCHES = [
  { kind: "rod", label: FIGURE.legend.rod },
  { kind: "guide", label: FIGURE.legend.guide },
  { kind: "centre", label: FIGURE.legend.centre },
] as const;

// The drawing of a VVER-1000 fuel assembly with its legend and caption
const FuelAssembly = ({ className }: { className?: string }) => (
  <figure className={cx(styles.figure, className)} aria-label={FIGURE.label}>
    <svg className={styles.drawing} viewBox="-200 -190 430 380" aria-hidden="true" focusable="false">
      <line className={styles.axis} x1="-196" y1="0" x2="196" y2="0" />
      <line className={styles.axis} x1="0" y1="-182" x2="0" y2="182" />
      <polygon className={styles.envelope} points="184,0 92,159.3 -92,159.3 -184,0 -92,-159.3 92,-159.3" />
      <polygon className={styles.body} points="172,0 86,149 -86,149 -172,0 -86,-149 86,-149" />
      {RODS.map(({ x, y, kind, ring }) => (
        <circle key={`${x},${y}`} className={styles[kind]} data-ring={ring} cx={x} cy={y} r="10" />
      ))}
      <g className={styles.dimension}>
        <line x1="92" y1="-149" x2="214" y2="-149" />
        <line x1="92" y1="149" x2="214" y2="149" />
        <line x1="206" y1="-149" x2="206" y2="149" />
        <line x1="200" y1="-143" x2="212" y2="-155" />
        <line x1="200" y1="155" x2="212" y2="143" />
      </g>
      <text className={styles.size} x="214" y="5">
        S
      </text>
    </svg>
    <figcaption className={styles.caption}>
      <ul className={styles.legend}>
        {SWATCHES.map(({ kind, label }) => (
          <li key={kind} className={styles.entry} data-kind={kind}>
            <svg className={styles.swatch} viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
              <circle className={styles[kind]} cx="7" cy="7" r="5.5" />
            </svg>
            {label}
          </li>
        ))}
      </ul>
      <span className={styles.title}>{FIGURE.caption}</span>
    </figcaption>
  </figure>
);

export default FuelAssembly;
