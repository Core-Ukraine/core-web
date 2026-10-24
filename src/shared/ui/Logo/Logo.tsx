import { cx } from "@/shared/lib/cx";
import { SITE } from "@/shared/lib/site";

import LogoMark from "../LogoMark/LogoMark";

import styles from "./Logo.module.scss";

interface LogoProps {
  tagline?: boolean;
  className?: string;
}

// The mark, a hexagonal fuel assembly, with the name and the tagline
const Logo = ({ tagline = false, className }: LogoProps) => (
  <span className={cx(styles.logo, className)}>
    <LogoMark className={styles.mark} />
    <span className={styles.text}>
      <span className={styles.name}>{SITE.name}</span>
      {tagline ? (
        <>
          {" "}
          <span className={styles.tagline}>{SITE.tagline}</span>
        </>
      ) : null}
    </span>
  </span>
);

export default Logo;
