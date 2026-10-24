import { cardNumber, SECTIONS, sectionHref, topicHref } from "@/features/catalog/model/catalog";
import SectionCard from "@/features/catalog/ui/SectionCard/SectionCard";
import TopicLinks from "@/features/catalog/ui/TopicLinks/TopicLinks";

import { OVERVIEW } from "../../model/home";

import styles from "./Overview.module.scss";

// The four sections to learn, each with its topics, right under the first screen
const Overview = () => (
  <section id="rozdily" className={styles.overview} aria-labelledby="overview-title">
    <div className={styles.inner}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{OVERVIEW.eyebrow}</p>
          <h2 id="overview-title" className={styles.title}>
            {OVERVIEW.title}
          </h2>
        </div>
        <p className={styles.hint}>{OVERVIEW.hint}</p>
      </div>
      <div className={styles.grid}>
        {SECTIONS.map((section, index) => (
          <SectionCard
            key={section.slug}
            number={cardNumber(index)}
            title={section.title}
            description={section.description}
            href={sectionHref(section)}
          >
            <TopicLinks
              links={section.topics.map((topic) => ({ href: topicHref(section, topic), title: topic.title }))}
            />
          </SectionCard>
        ))}
      </div>
    </div>
  </section>
);

export default Overview;
