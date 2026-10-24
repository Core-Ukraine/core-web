# ♿ Accessibility

The site aims at **WCAG 2.2 AA**. Every build checks it with axe in Chrome and Safari's WebKit and with the Lighthouse accessibility audits, which must all pass.

## 🧱 Semantics

- 🗺️ **Landmarks**: one `header` (banner) with the main menu, one `main`, one `footer` (contentinfo) with two labelled `nav` regions, **Розділи** and **Проєкт**. Topic pages add **Інші теми** for the topics before and after, and section pages **Інші розділи**.
- 🔗 **A skip link**, **Перейти до змісту**, is the first stop of the keyboard and moves the focus to `main`.
- 🏷️ **Headings** go in order: one `h1` per page, `h2` for blocks and `h3` for the cards of the home page.
- 🧭 **Breadcrumbs** are an ordered list in a `nav` named **Навігаційний ланцюжок**, with `aria-current="page"` on the last step.
- 🖼️ **The drawing** is a `figure` named after what it shows; the SVG itself is hidden, and the legend and the caption are real text.
- 🔤 **Capital labels** are written in normal case and set in capitals by CSS, so screen readers read words, not letters.
- 🇺🇦 **`lang="uk"`** on the document, so screen readers pick the Ukrainian voice.

## ⌨️ Keyboard

| Where              | Keys                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 🧭 Main menu       | `Tab` to a section, `Enter` or `Space` to open its list, `Tab` through the topics, `Escape` closes and returns to the button |
| 📱 Phone menu      | A modal `dialog`: the focus stays inside, `Escape` or the cross closes it and returns to the menu button                     |
| 🔗 Everything else | Links and buttons in reading order, a visible light blue focus ring with an offset                                           |

The menu items are real `button` and `a` elements: a section button has `aria-expanded` and `aria-controls`, the current page has `aria-current="page"`, and the open state is never shown by colour alone, as the chevron turns too. A list also closes when the focus moves out of the menu.

## 🎨 Contrast

Every pair of text and background reaches at least **4.5:1**:

| Text                 | Background             | Contrast |
| -------------------- | ---------------------- | -------- |
| `#C3CFE0` body       | `#0B1424` night        | ≈ 11.7:1 |
| `#7FA6E6` light blue | `#0B1424` night        | ≈ 7.4:1  |
| `#8C9DB8` muted      | `#0B1424` night        | ≈ 6.7:1  |
| `#1D488C` blue       | `#FFFFFF` white button | ≈ 8.9:1  |
| `#FFFFFF` white      | `#E30220` red button   | ≈ 4.9:1  |

Red never carries small text.

## 👆 Targets and reflow

- 📏 Buttons and menu rows are 44 to 60 px tall, the phone menu button 48 × 48 px, and footer links at least 24 px.
- 📱 Pages reflow down to **320 px** without scrolling sideways, and no word is cut at 360 px; both are end-to-end tests.
- 🔍 Text scales with the browser: sizes are in `rem` and `clamp()`.

## 🌗 Preferences

| Preference        | What changes                                                                     |
| ----------------- | -------------------------------------------------------------------------------- |
| 🐢 Reduced motion | No panel or menu animation and no smooth scrolling                               |
| 🖍️ Forced colours | The open menu item gets an outline, buttons a border, the drawing system colours |
| 🖨️ Print          | Dark text on white without the menus                                             |

## 🧪 How it is checked

| Check                      | Where                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------ |
| 🪓 axe on every page       | `e2e/accessibility.spec.ts`, with `label-content-name-mismatch` and `target-size` on |
| 🧭 axe with an open menu   | Both menus, on a wide screen and on a phone                                          |
| ⌨️ Keyboard alone          | The skip link and focus to `main`; Escape in both menus                              |
| 📐 Reflow and clipped text | 320 and 360 px                                                                       |
| 🖍️ Forced colours          | The open item and the buttons stay visible                                           |
| 🚦 Lighthouse              | Accessibility 100 with every audit passing, in `e2e/lighthouse.spec.ts`              |
| 🧩 Components              | Unit tests query by role and accessible name                                         |
