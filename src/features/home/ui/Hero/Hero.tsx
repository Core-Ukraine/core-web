import { SITE } from "@/shared/lib/site";
import ButtonLink from "@/shared/ui/ButtonLink/ButtonLink";

import { HERO } from "../../model/home";
import FuelAssembly from "../FuelAssembly/FuelAssembly";

import styles from "./Hero.module.scss";

// The first screen: the title, a short description, two ways in and the drawing
const Hero = () => (
  <section className={styles.hero} aria-labelledby="hero-title">
    <div className={styles.inner}>
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          {SITE.title}
        </h1>
        <p className={styles.lead}>{HERO.lead}</p>
        <div className={styles.actions}>
          <ButtonLink href={HERO.start.href} arrow>
            {HERO.start.label}
          </ButtonLink>
          <ButtonLink href={HERO.reactors.href} variant="light">
            {HERO.reactors.label}
          </ButtonLink>
        </div>
      </div>
      <FuelAssembly className={styles.figure} />
    </div>
  </section>
);

export default Hero;
