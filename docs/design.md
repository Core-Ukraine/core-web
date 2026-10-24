# 🎨 Design system

The site follows the design concept of ЯДРО: a dark theme built on the brand colours of ES Group, blue `#1D488C` and red `#E30220`, with the look of an engineering drawing. The mood is calm, technical and precise. Red appears only where an action or attention is needed.

## 🎨 Colours

Every colour is a custom property from `colors` in `src/shared/styles/_tokens.scss`.

| Token                    | Hex       | Used for                                                           |
| ------------------------ | --------- | ------------------------------------------------------------------ |
| 🟦 `--color-blue`        | `#1D488C` | Fills: the news card, fuel rods, text of the white button          |
| 🟥 `--color-red`         | `#E30220` | Main buttons, the line under the open menu, the centre of the logo |
| 🟥 `--color-red-hover`   | `#C4021C` | The red button under the pointer                                   |
| 🔷 `--color-accent`      | `#7FA6E6` | Links, technical labels, lines of the drawing and the logo         |
| ⬛ `--color-bg`          | `#0B1424` | The page: header, first screen and sections                        |
| ⬛ `--color-bg-deep`     | `#0E1A2E` | The **Про що цей сайт** block                                      |
| ⬛ `--color-bg-footer`   | `#070F1C` | The footer                                                         |
| ⬛ `--color-surface`     | `#111E33` | Cards and the body of the drawing                                  |
| ⬛ `--color-panel`       | `#13223C` | Menu panels                                                        |
| ➖ `--color-line`        | `#22355A` | Card borders and separators                                        |
| ➖ `--color-line-header` | `#1C2C48` | Borders between the header, the sections and the footer            |
| ➖ `--color-line-panel`  | `#2A3F66` | The border of a menu panel                                         |
| ⬜ `--color-heading`     | `#FFFFFF` | Headings                                                           |
| ⬜ `--color-text`        | `#F2F5FA` | Names in menus and cards                                           |
| ⬜ `--color-text-body`   | `#C3CFE0` | Paragraphs and menu items                                          |
| ⬜ `--color-text-soft`   | `#A9B8CF` | Descriptions in cards and menus                                    |
| ⬜ `--color-text-muted`  | `#8C9DB8` | Labels and secondary captions                                      |
| 🔲 `--color-hover`       | `#172846` | A menu item under the pointer or open                              |
| 🔲 `--color-hover-panel` | `#1D2F52` | An item of a menu panel under the pointer                          |
| ⬜ `--color-light-hover` | `#E2EAF7` | The white button under the pointer                                 |

> [!IMPORTANT]
> Red is only for actions and active states, never for small text: on the dark background it reads poorly. The brand blue is for fills; as a text colour on dark it is replaced by the light blue `--color-accent`.

## 🔤 Typography

| Family       | Role                                                  | Weights    | Sizes                                                  |
| ------------ | ----------------------------------------------------- | ---------- | ------------------------------------------------------ |
| Unbounded    | Headings and the name in the logo                     | 600, 700   | 52 px H1, 36 px H2, 24 px card names, 22 px the logo   |
| Montserrat   | Text, menus and buttons                               | 400 to 600 | 19 px lead, 18 px paragraphs, 15 to 16 px menus, 13 px |
| Martian Mono | Technical labels, card numbers, breadcrumbs, captions | 400        | 11 to 12 px, capitals, letter spacing 0.06 to 0.1 em   |

Unbounded and Martian Mono come from the same studio and share their wide, engineered shapes, so headings and labels read as one set; Montserrat keeps long text calm and open. All three are served by the site. Unbounded uses static 600 and 700 files from `src/shared/assets/fonts`, split by `unicode-range` into a Cyrillic and a Latin part, both preloaded, so the first title never waits for a late file; they weigh half of the variable font. Montserrat is one variable file per alphabet, and Martian Mono a single static weight that loads without a preload.

Line height is 1.6 to 1.75 for text and 1.12 to 1.2 for headings. Paragraphs are limited to about 560 px for the lead and 720 px for an article, and the first paragraph of a text is set a size larger. On phones the H1 shrinks to 30 px through `clamp()`.

## 🔷 The logo

The mark is a stylised hexagonal fuel assembly: the hexagon, six fuel rods around the centre and the red central tube, next to **ЯДРО** in Unbounded 700 and **АТОМНА ЕНЕРГЕТИКА** in Martian Mono. `LogoMark` draws the mark alone, `Logo` adds the words.

| Where                 | How                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 🌑 On dark            | Hexagon and rods in `#7FA6E6`, the centre in `#E30220`, the name in white (`Logo.tsx`)                                 |
| 🌕 On light           | Hexagon and rods in `#1D488C`, the centre red                                                                          |
| 🔹 Small, 16 to 20 px | Only the hexagon and the centre: `icon.svg` switches blue for light and dark tabs; `favicon.ico` sits on a dark square |
| 📱 App icons          | The full mark on the night background, smaller for maskable icons (`features/seo/og`)                                  |

## 📐 The drawing

`FuelAssembly` draws a simplified VVER-1000 fuel assembly on a hexagonal lattice of five rings: 91 positions with 72 fuel rods (blue with a light blue outline), 18 guide channels on the even rows and columns (red rings) and the central tube (red). `home/model/assembly.ts` computes the positions and the ring of each one, so the drawing, its test and the share cards share one source. Dashed centre lines, a dashed outline and a dimension line with **S**, the width across flats, complete the look of a drawing.

- 🌀 When the page opens, the rods grow into place ring by ring from the centre.
- 🔦 Pointing at an entry of the legend brings its rods forward and dims the rest.

## 🧩 Components

| Element            | Look                                                                      | Under the pointer                                                               |
| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 🔴 Main button     | Red fill, white text, 52 px high, 10 px radius, an arrow                  | `#C4021C`                                                                       |
| ⚪ Second button   | White fill, blue `#1D488C` text, 52 px high                               | `#E2EAF7`                                                                       |
| 🧭 Menu item       | Plain `#A9B8CF` words, a chevron for a list; the current page in white    | A soft white pill and white text; open: the pill stays and the chevron turns up |
| 📋 Menu panel item | A 15 px name and a 13 px description under it                             | `#1D2F52` fill                                                                  |
| 🗂️ Section card    | `#111E33` fill, `#22355A` border, 16 px radius, number, name, description | Links turn light blue                                                           |
| 🔗 Link in text    | Light blue `#7FA6E6`                                                      | White                                                                           |
| ▍ Lead             | A 3 px red line on the left, a touch taken from the ES Group site         |                                                                                 |

Every element has rounded corners of 8 to 16 px, and every hover stays inside the palette.

## 🧱 Tokens and mixins

| Mixin (`_mixins.scss`)  | What it gives                                                         |
| ----------------------- | --------------------------------------------------------------------- |
| `container`             | The 1200 px column with gutters of 20 to 40 px and room for the notch |
| `blueprint`             | The 40 px grid of the first screen and of page headers                |
| `eyebrow`               | The mono label in light blue capitals                                 |
| `display($size)`        | A heading in Unbounded 600                                            |
| `button($variant)`      | The red or the white button                                           |
| `from($name)` · `below` | Media queries for `md` (720 px) and `lg` (1024 px, the full menu)     |
| `hover`                 | Hover styles only for a mouse or trackpad                             |
| `visually-hidden`       | Text for screen readers only                                          |
| `hide-in-print`         | Left out of a printed page                                            |

Sections breathe with `--section-space` (72 to 112 px) and headings scale with `clamp()`. The four sections of the home page sit in two columns, so long topic names keep their lines; topic cards use `repeat(auto-fill, minmax(min(100%, 340px), 1fr))`. The header stays at the top while the page scrolls, on a solid background that is cheap to repaint, with a soft shadow that grows with the first steps of scrolling; `--header-offset` keeps anchors and sticky columns clear of it.

## 🎞️ Motion

Motion is short and purposeful: it shows where something comes from, never decorates for its own sake, and every animation stops for `prefers-reduced-motion`.

| Where            | What moves                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| 🏠 First screen  | The label, title, lead and buttons rise in one after another; the rods grow ring by ring       |
| 🔀 Between pages | The content cross-fades in 200 ms through the View Transitions API; the header and footer stay |
| 🧭 Menu panels   | Slide in and out under their button, with `@starting-style` and `display` transitions          |
| 📱 Phone menu    | Fades in and out; sections unfold to their own height; the rows arrive in a quick cascade      |
| 👆 Hover         | Arrows lean forward, topic cards lift, borders warm up, never anything larger                  |
| 📖 Topic pages   | A thin line at the top of the window fills while the page is read (scroll-driven, no script)   |

Only `opacity`, `transform`-like properties and colours animate. Content never fades in on scroll, so a page always has its full contrast, whatever a crawler, a screenshot or an accessibility checker sees.

## 🌗 Themes and print

- 🌑 **One dark theme.** The design has no light theme; `color-scheme: dark` keeps form controls and scrollbars dark.
- 🖍️ **Forced colours** keep the open menu item outlined, the buttons bordered and the drawing readable in system colours.
- 🖨️ **Print** switches to dark text on white without the grid, the menus or the shadows.
