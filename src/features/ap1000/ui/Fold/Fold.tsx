import type { ReactNode } from "react";

import Icon from "@/shared/ui/Icon/Icon";

import type { FlowKind } from "../../model/plant";

import styles from "./Fold.module.scss";

export interface LegendEntry {
  kind: FlowKind | "leak";
  label: string;
}

interface FoldProps {
  title: string;
  open?: boolean;
  legend: readonly LegendEntry[];
  note?: string;
  children: ReactNode;
}

// A simplified scheme that unfolds under its name, with the meaning of its colours
const Fold = ({ title, open = false, legend, note, children }: FoldProps) => (
  <details className={styles.fold} open={open}>
    <summary className={styles.summary}>
      <Icon name="chevron" size={18} className={styles.chevron} />
      {title}
    </summary>
    {children}
    <div className={styles.foot}>
      <ul className={styles.legend} aria-label="Умовні позначення">
        {legend.map(({ kind, label }) => (
          <li key={label} className={styles.entry}>
            <span className={styles.line} data-kind={kind} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
      {note ? <p className={styles.note}>{note}</p> : null}
    </div>
  </details>
);

export default Fold;
