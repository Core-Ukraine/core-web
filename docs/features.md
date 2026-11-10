# ✨ Features

ЯДРО is a portal for learning about nuclear energy. The design, the texts and the navigation map come from the design concept: a home page, a mobile version, the menu and the style page. Every page of the menu exists, and the texts in square brackets wait for the real ones.

## 🗺️ Pages and addresses

| Address                 | Page                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| 🏠 `/`                  | The home page                                                     |
| 📂 `/osnovy`            | Основи: the theory of reactors and turbines                       |
| 📂 `/reaktory`          | Реактори: VVER-1000, RBMK-1000 and AP-1000                        |
| 📂 `/istoriia`          | Історія: Ukraine and the world                                    |
| 📂 `/materialy`         | Матеріали: literature, videos and drawings                        |
| 📄 `/<section>/<topic>` | A topic, for example `/reaktory/vver-1000` or `/istoriia/ukraina` |
| 👥 `/pro-proiekt`       | The project: goal, content, team, history and contacts            |
| 📰 `/novyny`            | The news, newest first                                            |
| 🚫 anything else        | The missing page with a `404` status                              |

The ten topics are listed in [Content](./content.md#-sections-and-topics). Addresses are lowercase Latin transliterations; `/Reaktory` is a missing page, not a redirect.

## 🏠 Home page

From top to bottom, the order a visitor needs: what this is, what to learn, what is new and who is behind it.

1. 🧭 **Header**: the logo with **ЯДРО** and **АТОМНА ЕНЕРГЕТИКА** on the left, the main menu on the right. It stays at the top while the page scrolls.
2. 🖼️ **First screen** on a blueprint grid: the title **Атомна енергетика: від ядра до турбіни**, a short description with a red line, the red **Почати з основ** button and the white **Типи реакторів** one. On the right, a simplified VVER-1000 fuel assembly with 72 fuel rods, 18 guide channels and the central tube, a legend and the caption **РИС. 1. ТВЗ РЕАКТОРА ВВЕР-1000, СПРОЩЕНА СХЕМА**.
3. 🗂️ **Sections**: **Що можна вивчити** with a hint where to start and four numbered cards in two columns, each with its topics. The name of every card links to the section page.
4. 📰 **News band**: the brand blue with **Що нового** and **Усі новини**; once there is news, the three latest appear in it.
5. 📖 **About**: **Про що цей сайт** with three paragraphs on a deeper background and a link to the project page.
6. 🦶 **Footer**: the logo and a sentence about the portal, the **Розділи**, **Проєкт** and **Звʼязок** columns, the copyright, the version and a **Вгору** link.

## 🧭 Main menu

| Behaviour                | On a wide screen                                                           | On a phone                                               |
| ------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| 📐 Shown from            | 1024 px                                                                    | below 1024 px                                            |
| 🔘 Opens with            | A click on a section                                                       | The 48 px menu button, which becomes a cross             |
| 📋 A section shows       | A panel with its label and every topic with a short description            | Its topics, indented, under the section                  |
| 1️⃣ Open at a time        | One panel                                                                  | One section; the section of the current page opens first |
| 🔴 Open state            | A soft pill behind the words and a turned chevron                          | Light blue text and a turned chevron                     |
| 📍 Current page          | Brighter words                                                             | Unfolded when the menu opens                             |
| 🚪 Closes with           | The same button, Escape, a click or focus elsewhere, any change of address | The cross, Escape, any change of address                 |
| ➡️ Про проєкт and Новини | Plain links                                                                | Rows with an arrow                                       |

The **Матеріали** panel opens to the left, so it never leaves the page, and the current topic is highlighted inside its panel.

## 📂 Section pages

Each section page has breadcrumbs, the name, the description from the catalog with a red line, a note such as **РОЗДІЛ 02 · 3 ТЕМИ** and a card for every topic: its number (`02.1`, `02.2`, …), name, short description and **Читати**. The whole card is one link. **Інші розділи** at the end lead on without the menu.

## 📄 Topic pages

A topic page shows breadcrumbs back to its section, the name, the short description, a note such as **ТЕМА 02.1 · РЕАКТОРИ** and the text of the topic. Until a topic has its own text, it shows three placeholder paragraphs. Under the text, **Попередня тема** and **Наступна тема** follow the reading order of the whole site, across sections. Beside the text, or under it on narrow screens, **Теми розділу** lists every topic of the section with the current one highlighted and stays in view while a long text scrolls. A thin line at the top of the window fills while the page is read.

### ⚛️ The AP-1000 course

`/reaktory/ap-1000` is not a few paragraphs but a mini course of nine modules: the introduction, the design of the unit, how it works, the safety systems, the history, the units in the world, videos, sources and a test. Under the title it shows a line on what the reactor is, the lead with its sources, the note **ТЕМА 02.3 · РЕАКТОРИ · МІНІ-КУРС · 9 МОДУЛІВ · ПРИБЛИЗНО 40 ХВИЛИН** and a plate of five key figures.

| Part                      | What the reader gets                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🧭 **Модулі курсу**       | A card beside the course on a wide screen, a band of chips under the header on a phone; the module being read is marked                          |
| 🔢 Source numbers         | Small numbers after a sentence, each a link to its source in a new tab                                                                           |
| 🖼️ NRC drawings           | Twelve drawings on paper with Ukrainian captions and labels; a click opens one full size over the page, Escape or **Закрити** closes it          |
| 📐 Simplified schemes     | The unit from the reactor to the generator with moving flows, and a section of the plant with fourteen numbered positions                        |
| 🔩 **Перелік обладнання** | Pick a position in the list or on the section to read about it, see its numbers and its own NRC drawing                                          |
| 🚨 **Аварійні сценарії**  | Six scenarios, each with its NRC drawings, its events step by step, its videos and its flows on the section                                      |
| 🗓️ History and units      | A timeline with the turning points in red and a table of every unit with its status                                                              |
| 🎬 Videos and sources     | Four groups of videos and thirty-eight numbered sources                                                                                          |
| ✅ **Перевірка знань**    | Eight questions: the first answer counts, the right one turns green, a wrong one coral, an explanation follows and the score is shown at the end |

**Теми розділу** and the topics before and after close the course, since its own list of modules stands beside it.

## 👥 Project and 📰 news

- **Про проєкт** has five numbered parts: the goal, what the site holds, the team, the history of the project and the contacts. The contacts have the anchor `#zviazok`, which the **Написати нам** link of the footer opens.
- **Новини** lists the news from the newest, with dates such as **24 жовтня 2026 р.** While there is none, it says so and suggests starting with the basics. The three latest also appear in the band of the home page.

## 🚦 States

| State                     | What the visitor sees                                                             |
| ------------------------- | --------------------------------------------------------------------------------- |
| 🚫 Unknown address        | **Помилка 404**, **Сторінку не знайдено**, links home and to the sections, `404`  |
| 💥 A page fails to render | **Щось пішло не так**, **Спробувати ще раз**, a link home and the error reference |
| 📴 The connection drops   | A notice at the bottom of the page until it is back                               |
| 📴 A page cannot load     | The offline page of the site, which reloads itself once the connection is back    |
| 🖨️ Printing               | Dark text on white, without the menus, the grid or the shadows                    |
