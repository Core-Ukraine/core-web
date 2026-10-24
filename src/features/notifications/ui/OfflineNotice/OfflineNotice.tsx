"use client";

import { useOffline } from "next/offline";

import Icon from "@/shared/ui/Icon/Icon";

import styles from "./OfflineNotice.module.scss";

// Shown while offline: open pages stay, new ones wait for the connection
const OfflineNotice = () => {
  const offline = useOffline();
  return (
    <output className={styles.region}>
      {offline ? (
        <span className={styles.notice}>
          <Icon name="offline" size={18} />
          Немає звʼязку. Нові сторінки відкриються, щойно він повернеться.
        </span>
      ) : null}
    </output>
  );
};

export default OfflineNotice;
