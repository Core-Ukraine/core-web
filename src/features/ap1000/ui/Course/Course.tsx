import type { ReactNode } from "react";

import { MODULES } from "../../model/course";
import Article from "../Article/Article";
import CourseNav from "../CourseNav/CourseNav";

import styles from "./Course.module.scss";

// The modules as the list beside the course shows them
const NAV = MODULES.map(({ id, nav }) => ({ id, label: nav }));

// The whole course: the list of modules beside them, then what the page adds after
const Course = ({ children }: { children?: ReactNode }) => (
  <div className={styles.course}>
    <div className={styles.aside}>
      <CourseNav modules={NAV} />
    </div>
    <div className={styles.main}>
      {MODULES.map((module, index) => (
        <section key={module.id} id={module.id} className={styles.module} aria-labelledby={`${module.id}-title`}>
          <div className={styles.head}>
            <span className={styles.number}>{`Модуль ${index + 1} з ${MODULES.length}`}</span>
            <h2 id={`${module.id}-title`} className={styles.title}>
              {module.title}
            </h2>
          </div>
          <Article blocks={module.blocks} />
        </section>
      ))}
      {children}
    </div>
  </div>
);

export default Course;
