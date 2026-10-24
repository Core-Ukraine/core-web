# 📝 Content

Every text of the site lives in the repository as TypeScript, next to the code that shows it. There is no CMS: a change of text is a pull request like any other, checked by the same tests.

> [!IMPORTANT]
> Texts in square brackets, such as `[Короткий опис проєкту: …]`, are placeholders from the design. Replace the whole thing, brackets included.

## 📍 Where each text lives

| Text                                                          | File                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| 🗂️ Sections, topics, their descriptions and topic texts       | `src/features/catalog/model/catalog.ts`                       |
| 👥 The names of **Про проєкт** and **Новини** and their lines | `PAGES` in `src/features/catalog/model/catalog.ts`            |
| 🏠 The first screen, the section hint and **Про що цей сайт** | `src/features/home/model/home.ts`                             |
| 🖼️ The label, legend and caption of the drawing               | `FIGURE` in `src/features/home/model/home.ts`                 |
| 👥 The parts of the project page and the contacts             | `src/features/project/model/project.ts`                       |
| 📰 The news                                                   | `src/features/news/model/news.ts`                             |
| 📰 The title of the news band and the empty news page         | `NewsBanner.tsx` and `NewsList.tsx` in `src/features/news/ui` |
| 🦶 The sentence about the portal in the footer                | `src/widgets/Footer/Footer.tsx`                               |
| 🔎 The name, title, description and keywords of the site      | `src/shared/lib/site.ts`                                      |
| 🖼️ The words on the home share card                           | `src/app/opengraph-image.tsx`                                 |

### 🧾 Placeholders today

| Placeholder                                         | Where                               |
| --------------------------------------------------- | ----------------------------------- |
| `[Короткий опис проєкту: …]`                        | `HERO.lead` in `home.ts`            |
| `[Абзац 1. …]`, `[Абзац 2. …]`, `[Абзац 3. …]`      | `ABOUT.paragraphs` in `home.ts`     |
| `[Вступ: …]`, `[Основний текст: …]`, `[Підсумок …]` | `TOPIC_PLACEHOLDER` in `catalog.ts` |
| Five parts of the project page                      | `PROJECT_BLOCKS` in `project.ts`    |
| `[e-mail проєкту]`                                  | `CONTACT.email` in `project.ts`     |

## 🗂️ Sections and topics

| Section        | Address      | Topics                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| 01 · Основи    | `/osnovy`    | `teoriia` Теорія ядерних реакторів · `turbiny` Турбіни                                            |
| 02 · Реактори  | `/reaktory`  | `vver-1000` ВВЕР-1000 · `rbmk-1000` РБМК-1000 · `ap-1000` AP-1000                                 |
| 03 · Історія   | `/istoriia`  | `ukraina` Історія розвитку атомної енергетики України · `svit` Історія атомної енергетики у світі |
| 04 · Матеріали | `/materialy` | `literatura` Література атомної енергетики · `video` Відео · `kreslennia` Креслення               |

A section has a `title`, a one-sentence `description` for its card and page, and `topics`. A topic has a `title`, a short `summary` without a full stop for the menu and the cards, and an optional `body`.

## ✍️ Writing a topic

Give the topic a `body`: one string per paragraph. The placeholder disappears as soon as the list has a paragraph.

```ts
{
  slug: "vver-1000",
  title: "ВВЕР-1000",
  summary: "Водо-водяний енергетичний реактор",
  body: [
    "ВВЕР-1000 належить до водо-водяних реакторів: вода в ньому сповільнює нейтрони і водночас відводить тепло.",
    "…",
  ],
},
```

> [!WARNING]
> `npm run lint:text` rejects em and en dashes in every file, texts of the site included. Where Ukrainian asks for a dash, use a colon, a comma or parentheses.

## ➕ Adding a topic or a section

1. Add the topic to its section in `SECTIONS`, with a unique lowercase Latin `slug` (`[a-z0-9-]`, transliterated from Ukrainian like the others).
2. Run `npm run check`: the catalog test checks the slugs, and the menu, cards and footer tests show what moved.
3. Update the expectations that count pages: the sitemap test, `e2e/seo.spec.ts` and the navigation map in [Features](./features.md).

A new section works the same way. The menu shows it as one more list; keep the menu at four lists and two links if possible, because the bar is designed for that width.

## 📰 Adding news

Add an item to `NEWS` in `src/features/news/model/news.ts`; the order in the file does not matter, the list shows the newest first:

```ts
export const NEWS: readonly NewsItem[] = [
  {
    date: "2026-11-01",
    title: "Відкрито розділ «Основи»",
    summary: "Перші статті про поділ ядра і ланцюгову реакцію.",
  },
];
```

## 🔤 Writing rules

- 🇺🇦 **Ukrainian on the site.** The code, the docs and the commits stay in English.
- ʼ **The apostrophe is `ʼ`** (U+02BC), as in the design: «Звʼязок», «зʼявлятимуться».
- « » **Guillemets** for quotes and names: «Реактори».
- 🧾 **No em or en dashes** anywhere in the repository.
- 🔠 **Capitals come from the styles.** Labels such as **РОЗДІЛИ** are written in normal case in the code (`"Розділи"`) and set in capitals by CSS, so screen readers read words, not letters.
- 📏 **Short lines.** A summary fits one line of the menu panel; a section description is one sentence.
