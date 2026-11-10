"use client";

import { type ReactNode, useRef, useState } from "react";

import Icon from "@/shared/ui/Icon/Icon";

import styles from "./Zoom.module.scss";

interface ZoomProps {
  title: string;
  // The drawing on the page
  children: ReactNode;
  // The same drawing at full size, loaded only when it opens
  full: ReactNode;
}

// A drawing that opens over the page at full size
const Zoom = ({ title, children, full }: ZoomProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Shows the drawing over the page
  const open = () => {
    setIsOpen(true);
    dialog.current?.showModal();
  };

  // Hides the drawing again
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" className={styles.sheet} aria-label={`Відкрити на весь екран: ${title}`} onClick={open}>
        {children}
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-label={title} onClose={() => setIsOpen(false)}>
        <div className={styles.bar}>
          <span className={styles.title}>{title}</span>
          <button type="button" className={styles.close} onClick={close}>
            <Icon name="close" size={18} />
            Закрити
          </button>
        </div>
        <div className={styles.paper}>{isOpen ? full : null}</div>
      </dialog>
    </>
  );
};

export default Zoom;
