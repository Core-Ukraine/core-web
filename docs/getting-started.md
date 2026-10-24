# 🏁 Getting started

## 📋 Requirements

| Tool       | Version                                                                      |
| ---------- | ---------------------------------------------------------------------------- |
| 🟢 Node.js | **24 or newer**; `.nvmrc` pins `26`, the newest line                         |
| 📦 npm     | 11 or newer (ships with Node 24)                                             |
| 🐳 Docker  | Optional: Docker Desktop or Engine with Compose 2.22+ for `up --watch`       |
| 🌐 Browser | Chrome, Edge or Firefox 111+, Safari 16.4+ (the Next.js 16 browser baseline) |

If you use a version manager, run `nvm use` (or `fnm use`) in the project root.

## 🔑 Environment variables

The site needs no keys. Two optional variables exist:

| Variable   | Required | Meaning                                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL` | Optional | The public address for canonical links, the sitemap and share cards; on Vercel the production domain is used |
| `APP_PORT` | Optional | Docker only: the port on the host, 3000 by default and 3001 for staging; pick another one when 3000 is taken |

```bash
cp .env.example .env
```

Next.js loads `.env*` files automatically; every `.env*` file except `.env.example` is ignored by Git.

> [!NOTE]
> Without `SITE_URL` the links in the metadata point to `http://localhost:3000`, which is right on your own machine and wrong anywhere else.

## 📦 Install and run

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Every page of the menu works right away: `/osnovy`, `/reaktory/vver-1000`, `/pro-proiekt`, `/novyny`.

### 🐳 In Docker

```bash
docker compose -f compose.yaml -f docker/development.yaml up --watch
```

The same dev server runs in a container with the variables from `.env` (and `.env.local`, if present), and Compose Watch copies every change into it; a new `package-lock.json` rebuilds the image. Staging and production images are described in [Deployment](./deployment.md#-docker).

> [!TIP]
> Another app already listens on port 3000? Put `APP_PORT=3002` into `.env`: Compose reads it and publishes the container on <http://localhost:3002>.

## 📜 npm scripts

| Script                  | What it does                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `npm run dev`           | 🔥 Starts the Next.js dev server with Turbopack and hot reload                               |
| `npm run build`         | 📦 Type-checks the project and prerenders every page into `.next/`                           |
| `npm start`             | 👀 Serves the production build                                                               |
| `npm run typecheck`     | 🧠 Generates the route types and runs the TypeScript 7 compiler without emitting             |
| `npm run lint`          | 🧹 Lints with Oxlint, including type-aware, React Compiler, Next.js and a11y rules           |
| `npm run lint:fix`      | 🩹 Applies the automatic Oxlint fixes                                                        |
| `npm run lint:text`     | 🧾 Finds em and en dashes in every text file and says where they are                         |
| `npm run format`        | 🎨 Formats every supported file with Oxfmt                                                   |
| `npm run format:check`  | 🔎 Fails if a file is not formatted                                                          |
| `npm test`              | 👁️ Starts Vitest in watch mode                                                               |
| `npm run test:run`      | 🧪 Runs the whole test suite once                                                            |
| `npm run test:coverage` | 📊 Runs the tests with V8 coverage and enforces the coverage thresholds                      |
| `npm run test:e2e`      | 🎭 Builds the site and runs Playwright, axe and Lighthouse against it                        |
| `npm run check`         | ✅ Lint, the dash check, format check, type check and tests in one go, run it before pushing |

## 🛠️ make

Every common task has a short `make` command with a coloured summary of what it is doing:

| Command                                               | What it does                                                                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make` or `make help`                                 | 📖 Every command, grouped by environment, with coloured **[DEV]**, **[STAGE]** and **[PROD]** tags                                                                  |
| `make setup`                                          | 🧰 Installs the packages, creates `.env` from `.env.example`, installs Chromium and WebKit for the tests and turns on the Git hooks                                 |
| `make env`                                            | 🔐 Creates the env file of `ENV` from `.env.example` if it is missing, never overwrites one                                                                         |
| `make hooks`                                          | 🪝 Turns on the Git hooks in `.githooks/`: format, lint and dash checks of the staged files, and Conventional Commits for the message                               |
| `make doctor`                                         | 🩺 Checks Node.js, npm, Docker, the packages and the env file                                                                                                       |
| `make dev`                                            | 🚀 Starts the dev server                                                                                                                                            |
| `make check` / `make ci`                              | ✅ The checks before pushing / everything CI runs: registry signatures, the changelog, the checks with coverage, the build with its report and the end-to-end tests |
| `make e2e-chromium` · `make e2e-webkit`               | 🎭 The two end-to-end jobs of CI: Chromium with the visual tests and Lighthouse, or WebKit                                                                          |
| `make fix`                                            | 🪄 Applies the lint fixes and formats every file                                                                                                                    |
| `make dev-up` · `make stage-up` · `make prod-up`      | 🐳 Starts an environment in Docker: development with hot reload, staging and production in the background                                                           |
| `make stage-logs` · `make prod-ps` · `make dev-shell` | 📜 Every environment has the same commands: `up`, `down`, `restart`, `logs`, `ps`, `shell`, `open` and `clean`                                                      |
| `make status`                                         | 🚦 Shows which environments are running                                                                                                                             |
| `make up ENV=…`                                       | 🐳 The same commands for any `ENV`, handy in scripts; production asks before `down`, `restart` and `clean` unless `YES=1`                                           |
| `make shared`                                         | 🔗 Compares the files shared with tasks, weather, faceit-stats and finance when they are checked out next to this one                                               |
| `make live` · `make live-lighthouse`                  | 📡 The checks of the monitor against the address in `MONITOR_URL`                                                                                                   |
| `make screenshots`                                    | 📸 Takes the README pictures again from a running site, see [Contributing](./contributing.md#-readme-pictures)                                                      |
| `make clean` · `make reset`                           | 🧹 Removes build output and reports / also reinstalls the packages                                                                                                  |

> [!NOTE]
> The Makefile needs GNU Make and Bash, which macOS and Linux ship with; on Windows use WSL or the npm scripts above. Colours switch off in pipes and with `NO_COLOR=1`.

## 🗂️ Project layout

```text
core-web/
├── .github/
│   ├── ISSUE_TEMPLATE/              Bug report and feature request forms
│   ├── workflows/ci.yml             CI: verify, build with a report, end-to-end tests, Docker image, dependency review
│   ├── workflows/codeql.yml         CodeQL code scanning
│   ├── workflows/release.yml        GitHub release and Docker image for every version tag
│   ├── dependabot.yml               Weekly npm, GitHub Actions and Docker updates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md                  How to report vulnerabilities
├── docker/                          Multi-stage Dockerfile and the development, staging and production overlays
├── docs/                            This documentation and its screenshots
├── e2e/                             Playwright specs: accessibility, navigation, routing, security, SEO, Lighthouse
├── lint/comments.js                 Custom Oxlint rule that keeps comments to one short line
├── public/sw.js                     The service worker behind the offline page
├── scripts/                         README pictures, release notes, the coverage summary, the build report, live checks
├── src/
│   ├── app/                         Routes: home, sections, topics, project, news, errors, icons, sitemap, robots, offline
│   ├── widgets/                     Header, Footer, PageHeader and ErrorScreen
│   ├── features/
│   │   ├── catalog/                 Sections, topics and pages; section and topic cards, topic links, the pager, other sections
│   │   ├── navigation/              The menu model and breadcrumbs; the wide menu and the phone menu
│   │   ├── home/                    The texts of the home page and the fuel assembly; Hero, Overview and About
│   │   ├── project/                 The parts of the project page and the contacts
│   │   ├── news/                    The news, their list and the band of the home page
│   │   ├── notifications/           The offline page, the service worker and the offline notice
│   │   └── seo/                     Page metadata, JSON-LD, share cards and app icons
│   ├── shared/
│   │   ├── assets/fonts/            Unbounded, Montserrat and Martian Mono for the share cards, under the SIL Open Font License
│   │   ├── lib/                     The site, paths, time, logging and security.txt
│   │   ├── ui/                      Logo, LogoMark, Icon and ButtonLink
│   │   └── styles/                  Design tokens and mixins
│   └── test/                        Test setup
├── CHANGELOG.md                     Every release, newest first
├── Makefile                         make help, setup, dev, checks and Docker commands
├── compose.yaml                     The Docker Compose service shared by every environment
├── next.config.ts                   React Compiler, typed routes, the Content Security Policy and security headers
├── playwright.config.ts             Browsers and the production server for end-to-end tests
├── vercel.json                      Runs the server functions in Frankfurt
├── vitest.config.ts                 Test environment, aliases and coverage thresholds
├── .dockerignore                    Keeps dependencies, build output and secrets out of the image
├── .oxlintrc.json                   Lint rules and layer boundaries
└── .oxfmtrc.json                    Formatting rules
```

Every feature has a `model/` folder for data and logic and, when it renders something, a `ui/` folder with one folder per component, for example `features/catalog/ui/SectionCard/SectionCard.tsx` with `SectionCard.module.scss` and `SectionCard.test.tsx`. The layers and their rules are explained in [Architecture](./architecture.md#-layers).

## 💻 Editor setup

Editor settings are not committed. For the best experience in VS Code, install:

- 🦀 **Oxc**: inline Oxlint diagnostics and Oxfmt formatting on save
- ⚡ **Vitest**: run and debug tests from the editor
- 🎭 **Playwright Test for VS Code**: run end-to-end tests and record locators
- 📝 **EditorConfig**: consistent whitespace settings (`.editorconfig` is part of the repository)

## 👉 Next steps

- ✨ See every page in [Features](./features.md).
- 📝 Replace the placeholders as described in [Content](./content.md).
- 🏗️ Understand how a page is built in [Architecture](./architecture.md).
- 🧪 Run the whole suite as described in [Testing](./testing.md).
