import type { Metadata } from "next";

import { PAGES } from "@/features/catalog/model/catalog";
import { trail } from "@/features/navigation/model/trail";
import { NEWS } from "@/features/news/model/news";
import NewsList from "@/features/news/ui/NewsList/NewsList";
import { pageMetadata, pageSchema } from "@/features/seo/model/seo";
import JsonLd from "@/features/seo/ui/JsonLd/JsonLd";
import { siteUrl } from "@/shared/lib/site";
import PageHeader from "@/widgets/PageHeader/PageHeader";

import styles from "../page.module.scss";

const PAGE = { title: PAGES.news.title, description: PAGES.news.description, path: PAGES.news.href };

export const metadata: Metadata = pageMetadata(PAGE);

// The news of the field and the project, newest first
const NewsPage = () => {
  const crumbs = trail({ title: PAGE.title });
  return (
    <>
      <JsonLd data={pageSchema(PAGE, crumbs, siteUrl())} />
      <PageHeader crumbs={crumbs} title={PAGE.title} lead={PAGE.description} />
      <div className={styles.body}>
        <NewsList items={NEWS} />
      </div>
    </>
  );
};

export default NewsPage;
