"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { cx } from "@/shared/lib/cx";
import Icon from "@/shared/ui/Icon/Icon";

import { isWithin, MENU } from "../../model/menu";

import styles from "./MainNav.module.scss";

// The desktop menu: four lists that open under their buttons and two links
const MainNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  // A list stays open only on the page where it was opened
  const [opened, setOpened] = useState<{ id: string; path: string } | null>(null);
  const open = opened?.path === pathname ? opened.id : null;
  const nav = useRef<HTMLElement>(null);
  const id = useId();

  // While a list is open, Escape, a click elsewhere or the focus leaving closes it
  useEffect(() => {
    const menu = nav.current;
    if (open === null || !menu) return;
    // Closes on Escape and gives the focus back to the button
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const button = menu.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
      setOpened(null);
      button?.focus();
    };
    // Closes when the pointer goes down outside the menu
    const onPointerDown = (event: PointerEvent) => {
      if (!event.composedPath().includes(menu)) setOpened(null);
    };
    // Closes once the focus moves to something outside the menu
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && !menu.contains(event.relatedTarget)) setOpened(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    menu.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      menu.removeEventListener("focusout", onFocusOut);
    };
  }, [open]);

  // Closes the list, also after a link was followed
  const close = () => setOpened(null);

  // Opens a list, or closes it when it is already open
  const toggle = (group: string) => setOpened(open === group ? null : { id: group, path: pathname });

  return (
    <nav ref={nav} aria-label="Головне меню" className={cx(styles.nav, className)}>
      <ul className={styles.list}>
        {MENU.map((entry) =>
          entry.kind === "group" ? (
            <li key={entry.id} className={styles.item}>
              <button
                type="button"
                className={styles.button}
                aria-expanded={open === entry.id}
                aria-controls={`${id}-${entry.id}`}
                data-current={isWithin(pathname, entry.href) || undefined}
                onClick={() => toggle(entry.id)}
              >
                {entry.title}
                <Icon name="chevron" size={14} className={styles.chevron} />
              </button>
              <div
                id={`${id}-${entry.id}`}
                className={styles.panel}
                data-align={entry.align}
                hidden={open !== entry.id}
              >
                <p className={styles.label}>{entry.title}</p>
                <ul className={styles.items}>
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={styles.option}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={close}
                      >
                        <span className={styles.optionTitle}>{item.title}</span>
                        <span className={styles.optionSummary}>{item.summary}</span>
                        <Icon name="arrow" size={16} className={styles.optionArrow} />
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
                className={styles.link}
                aria-current={pathname === entry.href ? "page" : undefined}
                onClick={close}
              >
                {entry.title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
