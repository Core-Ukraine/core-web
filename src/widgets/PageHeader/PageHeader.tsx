import type { ReactNode } from "react";

import type { Crumb } from "@/features/navigation/model/trail";
import Breadcrumbs from "@/features/navigation/ui/Breadcrumbs/Breadcrumbs";

import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  crumbs: readonly Crumb[];
  title: string;
  subtitle?: string;
  lead?: ReactNode;
  meta?: string;
  // More of the first screen under the note, such as a plate of key figures
  children?: ReactNode;
}

// The top of an inner page: the way to it, the title, the lead and a short note
const PageHeader = ({ crumbs, title, subtitle, lead, meta, children }: PageHeaderProps) => (
  <div className={styles.header}>
    <div className={styles.inner}>
      <Breadcrumbs items={crumbs} />
      <div className={styles.heading}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {meta ? <p className={styles.meta}>{meta}</p> : null}
      {children}
    </div>
  </div>
);

export default PageHeader;
