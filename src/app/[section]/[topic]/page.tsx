import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { COURSE, COURSE_PATH } from "@/features/ap1000/model/course";
import Course from "@/features/ap1000/ui/Course/Course";
import Facts from "@/features/ap1000/ui/Facts/Facts";
import Rich from "@/features/ap1000/ui/Rich/Rich";
import {
  findTopic,
  neighbours,
  SECTIONS,
  sectionHref,
  topicBody,
  topicHref,
  topicNumber,
} from "@/features/catalog/model/catalog";
import TopicLinks from "@/features/catalog/ui/TopicLinks/TopicLinks";
import TopicPager from "@/features/catalog/ui/TopicPager/TopicPager";
import { trail } from "@/features/navigation/model/trail";
import { pageMetadata, pageSchema } from "@/features/seo/model/seo";
import JsonLd from "@/features/seo/ui/JsonLd/JsonLd";
import { SITE, siteUrl } from "@/shared/lib/site";
import PageHeader from "@/widgets/PageHeader/PageHeader";

import styles from "./page.module.scss";

export const dynamicParams = false;

// Prerenders the page of every topic
export const generateStaticParams = () =>
  SECTIONS.flatMap((section) => section.topics.map((topic) => ({ section: section.slug, topic: topic.slug })));

// The topic of the address with its page description, or the not found page
const topicPage = async (params: PageProps<"/[section]/[topic]">["params"]) => {
  const { section: sectionSlug, topic: topicSlug } = await params;
  const match = findTopic(sectionSlug, topicSlug);
  if (!match) notFound();
  const { section, topic } = match;
  return {
    ...match,
    page: {
      title: topic.title,
      description: `${topic.summary}. Розділ «${section.title}» освітнього порталу ${SITE.name}.`,
      path: topicHref(section, topic),
    },
  };
};

// The title, description and canonical link of the topic
export const generateMetadata = async ({ params }: PageProps<"/[section]/[topic]">): Promise<Metadata> =>
  pageMetadata((await topicPage(params)).page);

// A topic: its text, and the other topics of the section beside it
const TopicPage = async ({ params }: PageProps<"/[section]/[topic]">) => {
  const { section, topic, sectionIndex, topicIndex, page } = await topicPage(params);
  const crumbs = trail({ title: section.title, href: sectionHref(section) }, { title: topic.title });
  const meta = `Тема ${topicNumber(sectionIndex, topicIndex)} · ${section.title}`;
  const sectionTitle = `Теми розділу «${section.title}»`;
  const sectionTopics = (
    <TopicLinks
      links={section.topics.map((entry) => ({
        href: topicHref(section, entry),
        title: entry.title,
        current: entry.slug === topic.slug,
      }))}
    />
  );
  const pager = <TopicPager {...neighbours(section, topic)} />;
  return (
    <>
      <JsonLd data={pageSchema(page, crumbs, siteUrl())} />
      <div className={styles.progress} aria-hidden="true" />
      {page.path === COURSE_PATH ? (
        <>
          <PageHeader
            crumbs={crumbs}
            title={topic.title}
            subtitle={COURSE.subtitle}
            lead={<Rich text={COURSE.lead} />}
            meta={`${meta} · ${COURSE.length}`}
          >
            <Facts />
          </PageHeader>
          <Course>
            <section className={styles.after} aria-labelledby="section-topics">
              <h2 id="section-topics" className={styles.asideTitle}>
                {sectionTitle}
              </h2>
              {sectionTopics}
            </section>
            {pager}
          </Course>
        </>
      ) : (
        <>
          <PageHeader crumbs={crumbs} title={topic.title} lead={`${topic.summary}.`} meta={meta} />
          <div className={styles.body}>
            <div className={styles.main}>
              <article className={styles.article}>
                {topicBody(topic).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
              {pager}
            </div>
            <aside className={styles.aside} aria-labelledby="section-topics">
              <h2 id="section-topics" className={styles.asideTitle}>
                {sectionTitle}
              </h2>
              {sectionTopics}
            </aside>
          </div>
        </>
      )}
    </>
  );
};

export default TopicPage;
