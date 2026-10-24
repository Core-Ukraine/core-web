import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  cardNumber,
  findSection,
  SECTIONS,
  sectionHref,
  topicCount,
  topicHref,
  topicNumber,
} from "@/features/catalog/model/catalog";
import OtherSections from "@/features/catalog/ui/OtherSections/OtherSections";
import TopicCard from "@/features/catalog/ui/TopicCard/TopicCard";
import { trail } from "@/features/navigation/model/trail";
import { pageMetadata, pageSchema } from "@/features/seo/model/seo";
import JsonLd from "@/features/seo/ui/JsonLd/JsonLd";
import { siteUrl } from "@/shared/lib/site";
import PageHeader from "@/widgets/PageHeader/PageHeader";

import styles from "./page.module.scss";

export const dynamicParams = false;

// Prerenders the page of every section
export const generateStaticParams = () => SECTIONS.map((section) => ({ section: section.slug }));

// The section of the address with its page description, or the not found page
const sectionPage = async (params: PageProps<"/[section]">["params"]) => {
  const section = findSection((await params).section);
  if (!section) notFound();
  return {
    section,
    number: SECTIONS.indexOf(section),
    page: { title: section.title, description: section.description, path: sectionHref(section) },
  };
};

// The title, description and canonical link of the section
export const generateMetadata = async ({ params }: PageProps<"/[section]">): Promise<Metadata> =>
  pageMetadata((await sectionPage(params)).page);

// A section: its description and a card for every topic
const SectionPage = async ({ params }: PageProps<"/[section]">) => {
  const { section, number, page } = await sectionPage(params);
  const crumbs = trail({ title: section.title });
  return (
    <>
      <JsonLd data={pageSchema(page, crumbs, siteUrl())} />
      <PageHeader
        crumbs={crumbs}
        title={section.title}
        lead={section.description}
        meta={`Розділ ${cardNumber(number)} · ${topicCount(section.topics.length)}`}
      />
      <div className={styles.body}>
        <ul className={styles.grid}>
          {section.topics.map((topic, index) => (
            <li key={topic.slug}>
              <TopicCard
                href={topicHref(section, topic)}
                number={topicNumber(number, index)}
                title={topic.title}
                summary={topic.summary}
              />
            </li>
          ))}
        </ul>
        <OtherSections current={section} />
      </div>
    </>
  );
};

export default SectionPage;
