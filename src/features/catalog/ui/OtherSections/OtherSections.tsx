import Link from "next/link";

import Icon from "@/shared/ui/Icon/Icon";

import { cardNumber, SECTIONS, sectionHref, type Section } from "../../model/catalog";

import styles from "./OtherSections.module.scss";

// The other sections in a row at the end of a section page
const OtherSections = ({ current }: { current: Section }) => (
  <nav aria-labelledby="other-sections" className={styles.other}>
    <h2 id="other-sections" className={styles.title}>
      Інші розділи
    </h2>
    <ul className={styles.list}>
      {SECTIONS.map((section, index) =>
        section.slug === current.slug ? null : (
          <li key={section.slug}>
            <Link href={sectionHref(section)} className={styles.link}>
              <span className={styles.number}>{cardNumber(index)}</span>
              <span className={styles.name}>{section.title}</span>
              <Icon name="arrow" size={18} className={styles.arrow} />
            </Link>
          </li>
        ),
      )}
    </ul>
  </nav>
);

export default OtherSections;
