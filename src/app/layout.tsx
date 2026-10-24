import "./globals.scss";
import type { Metadata, Viewport } from "next";
import { type ReactNode, ViewTransition } from "react";

import OfflineNotice from "@/features/notifications/ui/OfflineNotice/OfflineNotice";
import ServiceWorker from "@/features/notifications/ui/ServiceWorker/ServiceWorker";
import { isIndexable, SITE, siteUrl } from "@/shared/lib/site";
import Footer from "@/widgets/Footer/Footer";
import Header from "@/widgets/Header/Header";

import { fontVariables } from "./fonts";

import styles from "./layout.module.scss";

// Site-wide metadata; every page adds its own title and canonical link
export const generateMetadata = (): Metadata => ({
  metadataBase: siteUrl(),
  title: { default: `${SITE.name} · ${SITE.title}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  category: "education",
  openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale },
  robots: isIndexable()
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
    : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
});

export const viewport: Viewport = {
  colorScheme: "dark",
  viewportFit: "cover",
  themeColor: SITE.themeColor,
};

// The document shell: skip link, header, content and footer
const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="uk" className={fontVariables} data-scroll-behavior="smooth">
    <body>
      <a className="skip-link" href="#content">
        Перейти до змісту
      </a>
      <Header />
      <main className={styles.main} id="content" tabIndex={-1}>
        <ViewTransition>
          <div className={styles.page}>{children}</div>
        </ViewTransition>
      </main>
      <Footer />
      <OfflineNotice />
      <ServiceWorker />
    </body>
  </html>
);

export default RootLayout;
