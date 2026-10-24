import Link from "next/link";

import { PAGES } from "@/features/catalog/model/catalog";
import Icon from "@/shared/ui/Icon/Icon";

import { ABOUT } from "../../model/home";

import styles from "./About.module.scss";

// What the site is about, on a deeper background between its neighbours
const About = () => (
  <section className={styles.about} aria-labelledby="about-title">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{ABOUT.eyebrow}</p>
        <h2 id="about-title" className={styles.title}>
          {ABOUT.title}
        </h2>
      </div>
      <div className={styles.text}>
        {ABOUT.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link href={PAGES.about.href} className={styles.more}>
          {ABOUT.more}
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default About;
