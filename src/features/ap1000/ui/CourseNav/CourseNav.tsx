"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CourseNav.module.scss";

interface CourseNavProps {
  modules: readonly { id: string; label: string }[];
}

// A thin band a third of the way down the window; the module crossing it is read
const READING_LINE = "-30% 0px -69% 0px";

// The modules of the course, with the one being read marked as the reader scrolls
const CourseNav = ({ modules }: CourseNavProps) => {
  const [current, setCurrent] = useState(modules[0]?.id);
  const list = useRef<HTMLOListElement>(null);

  // Watches which module crosses the reading line
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: READING_LINE },
    );
    for (const { id } of modules) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [modules]);

  // Keeps the marked module in view when the list scrolls sideways on a phone
  useEffect(() => {
    const strip = list.current;
    const link = strip?.querySelector<HTMLElement>(`a[href="#${current}"]`);
    if (strip && link) strip.scrollLeft = link.offsetLeft - (strip.clientWidth - link.offsetWidth) / 2;
  }, [current]);

  return (
    <nav className={styles.nav} aria-labelledby="course-modules">
      <h2 id="course-modules" className={styles.title}>
        Модулі курсу
      </h2>
      <ol ref={list} className={styles.list}>
        {modules.map(({ id, label }, index) => (
          <li key={id}>
            <a href={`#${id}`} className={styles.link} aria-current={id === current ? "location" : undefined}>
              <span className={styles.number}>{index + 1}</span> {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CourseNav;
