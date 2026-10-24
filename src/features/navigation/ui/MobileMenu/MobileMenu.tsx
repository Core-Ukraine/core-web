"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { cx } from "@/shared/lib/cx";
import { SITE } from "@/shared/lib/site";
import Icon from "@/shared/ui/Icon/Icon";
import Logo from "@/shared/ui/Logo/Logo";

import { currentGroup, MENU } from "../../model/menu";

import styles from "./MobileMenu.module.scss";

// The width from which the bar shows the full menu, as in _mixins.scss
const WIDE = "(width >= 1024px)";

interface MobileMenuProps {
  year: number;
  className?: string;
}

// The phone menu: a full screen of rows, one section open at a time
const MobileMenu = ({ year, className }: MobileMenuProps) => {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const openedOn = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const id = useId();

  // Closes the menu when the address changes, also through the back button
  useEffect(() => {
    if (openedOn.current !== pathname) dialog.current?.close();
  }, [pathname]);

  // Closes the menu when the screen grows wide enough for the full bar
  useEffect(() => {
    const wide = window.matchMedia(WIDE);
    // Closes the dialog on a wide screen
    const onChange = () => {
      if (wide.matches) dialog.current?.close();
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  // Opens the menu with the section of the current page unfolded
  const open = () => {
    setExpanded(currentGroup(pathname));
    setIsOpen(true);
    openedOn.current = pathname;
    dialog.current?.showModal();
  };

  // Closes the menu, also after a link was followed
  const close = () => dialog.current?.close();

  return (
    <div className={cx(styles.root, className)}>
      <button
        type="button"
        className={styles.toggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Відкрити меню"
        onClick={open}
      >
        <Icon name="menu" size={24} />
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-label="Меню" onClose={() => setIsOpen(false)}>
        <div className={styles.top}>
          <Link href="/" className={styles.brand} onClick={close}>
            <Logo />
            <span className="visually-hidden">, на головну</span>
          </Link>
          <button type="button" className={styles.toggle} aria-label="Закрити меню" onClick={close}>
            <Icon name="close" size={24} />
          </button>
        </div>
        <nav aria-label="Головне меню" className={styles.nav}>
          <ul className={styles.list}>
            {MENU.map((entry) =>
              entry.kind === "group" ? (
                <li key={entry.id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.row}
                    aria-expanded={expanded === entry.id}
                    aria-controls={`${id}-${entry.id}`}
                    onClick={() => setExpanded((current) => (current === entry.id ? null : entry.id))}
                  >
                    {entry.title}
                    <Icon name="chevron" size={22} className={styles.chevron} />
                  </button>
                  <div
                    id={`${id}-${entry.id}`}
                    className={styles.panel}
                    data-open={expanded === entry.id || undefined}
                    inert={expanded !== entry.id}
                  >
                    <ul className={styles.sublist}>
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={styles.sublink}
                            aria-current={pathname === item.href ? "page" : undefined}
                            onClick={close}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={entry.href} className={styles.item}>
                  <Link
                    href={entry.href}
                    className={styles.row}
                    aria-current={pathname === entry.href ? "page" : undefined}
                    onClick={close}
                  >
                    {entry.title}
                    <Icon name="arrow" size={22} />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <p className={styles.copyright}>{`© ${year} ${SITE.name}`}</p>
      </dialog>
    </div>
  );
};

export default MobileMenu;
