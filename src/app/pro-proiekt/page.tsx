import type { Metadata } from "next";

import { PAGES } from "@/features/catalog/model/catalog";
import { trail } from "@/features/navigation/model/trail";
import ProjectDetails from "@/features/project/ui/ProjectDetails/ProjectDetails";
import { pageMetadata, pageSchema } from "@/features/seo/model/seo";
import JsonLd from "@/features/seo/ui/JsonLd/JsonLd";
import { siteUrl } from "@/shared/lib/site";
import PageHeader from "@/widgets/PageHeader/PageHeader";

import styles from "../page.module.scss";

const PAGE = { title: PAGES.about.title, description: PAGES.about.description, path: PAGES.about.href };

export const metadata: Metadata = pageMetadata(PAGE);

// The project: its goal, content, team, history and contacts
const ProjectPage = () => {
  const crumbs = trail({ title: PAGE.title });
  return (
    <>
      <JsonLd data={pageSchema(PAGE, crumbs, siteUrl())} />
      <PageHeader crumbs={crumbs} title={PAGE.title} lead={PAGE.description} />
      <div className={styles.body}>
        <ProjectDetails />
      </div>
    </>
  );
};

export default ProjectPage;
