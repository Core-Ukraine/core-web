# 🧪 Testing

| Level            | Tool                               | Command                  |
| ---------------- | ---------------------------------- | ------------------------ |
| 🧩 Unit          | Vitest 5, Testing Library, jsdom   | `npm run test:run`       |
| 📊 Coverage      | V8 with thresholds                 | `npm run test:coverage`  |
| 🎭 End to end    | Playwright in Chrome and WebKit    | `npm run test:e2e`       |
| ♿ Accessibility | axe through `@axe-core/playwright` | part of `test:e2e`       |
| 🚦 Performance   | Lighthouse with a budget           | part of `test:e2e`       |
| 🖼️ Visual        | Playwright screenshots on Linux    | part of `test:e2e` in CI |

## 🧩 Unit tests

Tests sit next to the code they cover as `*.test.ts(x)`, and every component has its own: `SectionCard/SectionCard.test.tsx`. They query by role and accessible name, the way visitors and screen readers find things, and type every mock.

- 🔗 `next/link` is replaced by a plain anchor in `src/test/setup.ts`.
- 🧭 `next/navigation` is mocked per file where a component reads the address.
- 🪟 jsdom has neither media queries nor modal dialogs: the setup adds a `matchMedia` that never matches and a `showModal()` and `close()` that toggle the `open` attribute and fire `close`. A test that needs a media query to change stubs `matchMedia` itself, like `MobileMenu.test.tsx`.

Vitest runs with `pool: "vmThreads"`: one jsdom per worker, and every test file in a fresh context of its own, which is about twice as fast as a new process per file. Unit tests run without React Compiler, the same in all the sibling apps, so coverage counts the branches of the source.

## 🎭 End-to-end tests

`playwright.config.ts` builds the site and serves it on port 3100 with `SITE_URL` set to that address. No mock server is needed: every page comes from the repository.

| Project         | Device         | Runs                                       |
| --------------- | -------------- | ------------------------------------------ |
| 🖥️ `desktop`    | Desktop Chrome | every spec but Lighthouse and visual       |
| 📱 `mobile`     | Pixel 7        | every spec but Lighthouse and visual       |
| 🧭 `webkit`     | Desktop Safari | every spec but Lighthouse and visual       |
| 🖼️ `visual`     | Desktop Chrome | `visual.spec.ts`, in CI or with `VISUAL=1` |
| 🚦 `lighthouse` | Chrome         | `lighthouse.spec.ts`, after the others     |

| Spec               | What it checks                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ♿ `accessibility` | axe on every page and the missing page, both menus open, the skip link, reflow at 320 px, whole words at 360 px, forced colours            |
| 🧭 `navigation`    | A list opens and follows a topic, Escape and the edge of the page, breadcrumbs, the phone menu, and every link of every page answers `200` |
| 🗺️ `routing`       | The home page in Ukrainian, four kinds of missing addresses with `404`, the health check                                                   |
| 🛡️ `security`      | No console errors or policy violations, the policy and headers, the offline page and icon policies                                         |
| 🔎 `seo`           | Titles, canonical links, Open Graph, JSON-LD, the sitemap, robots, share cards, the manifest, security.txt                                 |
| ⚛️ `course`        | A scenario switches its events and flows, a drawing opens and closes, a position and an answer, the module being read is marked            |
| 📴 `offline`       | The notice when the connection drops and the offline page after a failed reload                                                            |
| 🖼️ `visual`        | The home, a topic and the missing page in full, and the open phone menu                                                                    |
| 🚦 `lighthouse`    | The budgets below                                                                                                                          |

## 🚦 Lighthouse budget

| Page                     | Device     | Performance | Accessibility | Best practices | SEO | Page weight |
| ------------------------ | ---------- | ----------: | ------------: | -------------: | --: | ----------: |
| 🏠 `/`                   | 🖥️ Desktop |      ≥ 0.90 |             1 |              1 |   1 |    ≤ 360 KB |
| 🏠 `/`                   | 📱 Mobile  |      ≥ 0.80 |             1 |              1 |   1 |    ≤ 360 KB |
| 📄 `/reaktory/vver-1000` | 🖥️ Desktop |      ≥ 0.90 |             1 |              1 |   1 |    ≤ 360 KB |
| 📄 `/istoriia/ukraina`   | 📱 Mobile  |      ≥ 0.80 |             1 |              1 |   1 |    ≤ 360 KB |

The pages weigh about 325 KB locally, most of it the Next.js runtime and about 80 KB of fonts, and score 100 on desktop and 94 to 96 on a phone. Each page weight limit sits about 35 to 40 KB above what the page weighs today, the same rule as in the sibling apps, so a heavier dependency fails the build early; lower the limits again when a page gets lighter. Every accessibility audit must pass, including the unweighted ones, and every weighted best practices audit. Each run attaches its HTML report to the Playwright report.

## 🖼️ Visual tests

Fonts render differently on every system, so screenshots are compared on the Linux runners of CI only. Until `e2e/__screenshots__` exists, the visual tests only load their pages. After a design change, run the **Screenshots** workflow by hand, download its artifact and commit it as `e2e/__screenshots__/`. Locally, `VISUAL=1 npx playwright test --project=visual` runs the same tests.

## 📊 Coverage

| Metric        | Threshold |
| ------------- | --------: |
| 📝 Statements |      99 % |
| 🔀 Branches   |      99 % |
| 🧩 Functions  |      99 % |
| 📏 Lines      |      99 % |

The suite currently covers every statement, branch, function and line. Each threshold sits about a point below the current coverage, so a change can only keep or raise it. Next.js special files that only compose other components (`layout`, `page`, `error`, `global-error`, `not-found`, `manifest`, `fonts` and the image routes) and the share card drawings in `src/features/seo/og` are excluded, because the end-to-end tests and the production build cover them. CI publishes a coverage summary and uploads the HTML coverage and Playwright reports.
