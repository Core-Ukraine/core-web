import { cardNumber } from "@/features/catalog/model/catalog";

import { PROJECT_BLOCKS } from "../../model/project";

import styles from "./ProjectDetails.module.scss";

// The goal, the content, the team, the history and the contacts of the project
const ProjectDetails = () => (
  <div className={styles.details}>
    {PROJECT_BLOCKS.map((block, index) => (
      <section key={block.id} id={block.id} className={styles.block} aria-labelledby={`${block.id}-title`}>
        <div className={styles.heading}>
          <span className={styles.number}>{cardNumber(index)}</span>
          <h2 id={`${block.id}-title`} className={styles.title}>
            {block.title}
          </h2>
        </div>
        <div className={styles.text}>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    ))}
  </div>
);

export default ProjectDetails;
