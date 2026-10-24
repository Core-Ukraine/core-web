import type { Crumb } from "@/features/navigation/model/trail";
import Breadcrumbs from "@/features/navigation/ui/Breadcrumbs/Breadcrumbs";

import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  crumbs: readonly Crumb[];
  title: string;
  lead?: string;
  meta?: string;
}

// The top of an inner page: the way to it, the title, the lead and a short note
const PageHeader = ({ crumbs, title, lead, meta }: PageHeaderProps) => (
  <div className={styles.header}>
    <div className={styles.inner}>
      <Breadcrumbs items={crumbs} />
      <h1 className={styles.title}>{title}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {meta ? <p className={styles.meta}>{meta}</p> : null}
    </div>
  </div>
);

export default PageHeader;
