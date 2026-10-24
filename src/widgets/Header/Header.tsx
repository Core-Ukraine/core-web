import Link from "next/link";

import MainNav from "@/features/navigation/ui/MainNav/MainNav";
import MobileMenu from "@/features/navigation/ui/MobileMenu/MobileMenu";
import { currentYear } from "@/shared/lib/time";
import Logo from "@/shared/ui/Logo/Logo";

import styles from "./Header.module.scss";

// The logo and the main menu: the full bar on wide screens, a button on phones
const Header = () => (
  <header id="top" className={styles.header}>
    <div className={styles.bar}>
      <Link href="/" className={styles.brand}>
        <Logo tagline />
        <span className="visually-hidden">, на головну</span>
      </Link>
      <MainNav className={styles.nav} />
      <MobileMenu year={currentYear()} />
    </div>
  </header>
);

export default Header;
