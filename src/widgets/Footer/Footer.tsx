import Link from "next/link";

import { PAGES, SECTIONS, sectionHref } from "@/features/catalog/model/catalog";
import { CONTACT } from "@/features/project/model/project";
import { SITE } from "@/shared/lib/site";
import { currentYear } from "@/shared/lib/time";
import Icon from "@/shared/ui/Icon/Icon";
import Logo from "@/shared/ui/Logo/Logo";

import styles from "./Footer.module.scss";

// Every section to learn, then the pages about the project
const COLUMNS = [
  { label: "Розділи", links: SECTIONS.map((section) => ({ href: sectionHref(section), title: section.title })) },
  { label: "Проєкт", links: [PAGES.about, PAGES.news] },
];

// The logo, the link columns, the contacts and the way back up
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.top}>
        <div className={styles.about}>
          <Link href="/" className={styles.brand}>
            <Logo />
            <span className="visually-hidden">, на головну</span>
          </Link>
          <p className={styles.tagline}>
            Освітній портал про атомну енергетику: від фізики ядра до турбіни, від перших АЕС до сучасних реакторів.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.label} aria-label={column.label} className={styles.column}>
            <p className={styles.label}>{column.label}</p>
            <ul className={styles.links}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className={styles.column}>
          <p className={styles.label}>Звʼязок</p>
          <ul className={styles.links}>
            <li>{CONTACT.email}</li>
            <li>
              <Link href={CONTACT.href} className={styles.link}>
                {CONTACT.write}
                <Icon name="arrow" size={16} className={styles.arrow} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>{`© ${currentYear()} ${SITE.name} · Освітній проєкт про атомну енергетику`}</p>
        <div className={styles.meta}>
          <span className={styles.version}>{`v${SITE.version}`}</span>
          <a href="#top" className={styles.link}>
            Вгору
            <Icon name="arrowUp" size={16} className={styles.arrow} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
