# 🔎 SEO

## 🏷️ Metadata

The root layout sets what every page shares, and each page adds its own with `pageMetadata()` from `features/seo/model/seo.ts`:

| Field                  | Value                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------- |
| 🏷️ Title               | `ВВЕР-1000 · ЯДРО`; the home page: `ЯДРО · Атомна енергетика: від ядра до турбіни`     |
| 📝 Description         | The description of the section or page; for a topic, its summary and its section       |
| 🔗 Canonical           | The address of the page on `SITE_URL`                                                  |
| 🌍 Open Graph          | `website`, the site name **ЯДРО**, `uk_UA`, the title, the description and the address |
| 🐦 Twitter             | `summary_large_image`                                                                  |
| 🤖 Robots              | Indexed on production only, see below                                                  |
| 🔑 Keywords · category | From `SITE` in `shared/lib/site.ts`; `education`                                       |

## 🖼️ Share cards

Every page has a 1200 × 630 PNG share card drawn with `next/og`: the logo, a label, the title with a red line under its description and the fuel assembly on the right.

| Page                 | File                                        | Label           |
| -------------------- | ------------------------------------------- | --------------- |
| 🏠 Home              | `app/opengraph-image.tsx`                   | Освітній портал |
| 📂 Section           | `app/[section]/opengraph-image.tsx`         | Розділ          |
| 📄 Topic             | `app/[section]/[topic]/opengraph-image.tsx` | The section     |
| 👥 Project · 📰 News | `app/pro-proiekt/…` · `app/novyny/…`        | ЯДРО            |

The cards use the fonts of the site from `src/shared/assets/fonts`: Unbounded for the name and the title, Montserrat for the description and Martian Mono for the label. Satori keeps one font file per name and weight, so the Latin and Cyrillic parts of a family are registered under two names (`Unbounded` and `Unbounded Cyrillic`) and listed together in `OG_FAMILIES`.

## 🧩 Structured data

| Page      | JSON-LD                                                                   |
| --------- | ------------------------------------------------------------------------- |
| 🏠 Home   | `WebSite` with the name, address, description and `inLanguage: "uk"`      |
| Any other | The `WebSite` and a `WebPage` that is part of it, with a `BreadcrumbList` |

`serializeJsonLd()` escapes `<`, so a text can never close the script tag it sits in.

## 🗺️ Sitemap and robots

- 🗺️ `/sitemap.xml` lists all 17 pages: the home page, four sections, ten topics, the project and the news.
- 🤖 `/robots.txt` allows everything and names the sitemap on production, and disallows everything elsewhere.

## 🚦 Indexing per environment

`isIndexable()` in `shared/lib/site.ts` allows indexing only when `APP_ENV` (Docker) or `VERCEL_ENV` (Vercel) is `production`, or neither is set. Staging, development and previews answer `noindex` and a `Disallow: /` robots file. The missing page is always `noindex, follow`.

> [!WARNING]
> Set `SITE_URL` before `npm run build` on any host but Vercel. The pages, the sitemap and the robots rules are prerendered and keep the address known at build time.

## 🧪 How it is checked

`e2e/seo.spec.ts` checks the titles, canonical links, the description of a topic, Open Graph and Twitter tags, the JSON-LD with breadcrumbs, the sitemap and robots, a PNG share card for four pages, the manifest and `security.txt`. Lighthouse must score 100 for SEO.
