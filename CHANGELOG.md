# 📜 Changelog

All notable changes to Core Web are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). How versions are cut is described in [docs/releases.md](./docs/releases.md).

## [Unreleased]

## [1.0.0] - 2026-10-24

The first release.

### Added

- 🏠 The home page: the first screen on a blueprint grid with a drawing of a VVER-1000 fuel assembly that grows ring by ring and a legend that highlights its parts, the four sections to learn with their topics, a news band and what the site is about.
- 🧭 The main menu: a sticky bar of plain words where four sections open a list of their topics with a short description each and two pages open right away; the current section is brighter, the open one sits on a soft pill; Escape, a click or focus elsewhere and any change of address close it, and the last list stays inside the page.
- 📱 The phone menu: a full-screen modal accordion behind a 48 px button that turns into a cross, with the section of the current page unfolded.
- 📚 Every page of the navigation map: four section pages with the other sections, ten topic pages with the other topics of their section, the topics before and after them and a reading progress line, the project page and the news page, each with breadcrumbs.
- 🗂️ One typed catalog for the sections, topics and pages, which the menus, the cards, the footer, the sitemap and the share cards all read.
- 🎨 The ES Group palette, Unbounded for headings, Montserrat for text and Martian Mono for technical labels, all self-hosted, the hexagonal logo and favicons for light and dark browser tabs.
- 🎞️ Calm motion: page cross-fades through the View Transitions API, sliding menu panels, an unfolding phone menu, hover and focus feedback, all switched off for reduced motion.
- ♿ WCAG 2.2 AA support: contrast of at least 4.5:1, a skip link, landmarks, real buttons and links, keyboard control, reflow down to 320 px and support for reduced motion and forced colours.
- 🔎 Titles, descriptions, canonical links, a share card for every page, a sitemap, robots rules and JSON-LD with breadcrumbs.
- 📱 An installable web app with PNG and maskable icons, a notice when the connection drops and an offline page of its own.
- 🖨️ Printed pages in dark text on white, without the menus.
- 🛡️ A Content Security Policy, security headers and sandboxed icons.
- 🧪 Unit tests, end-to-end tests in Chrome and Safari's WebKit, visual tests, axe checks, a link check and a Lighthouse budget in CI.
- ▲ Vercel deployments with the server functions in Frankfurt.
- 🐳 Docker images for development, staging and production: a multi-stage Dockerfile, a Compose overlay per environment, a non-root standalone server without Linux capabilities and with resource limits, environment files passed to the build as secrets and a `/healthz` endpoint for health checks; every release also publishes the production image to GitHub Packages for amd64 and arm64 with provenance and an SBOM.
- 📡 A `security.txt` for private reports and a monitor that checks the live site every hour and its Lighthouse scores every week.
- 🪝 Git hooks and CI checks for formatting, one-line comments, em and en dashes, Conventional Commits and pull request titles.
- 🛠️ A Makefile with a coloured, grouped `make help`: setup, the dev server, checks, end-to-end tests, every Docker environment and a comparison of the files shared with the sibling apps.

[Unreleased]: https://github.com/Core-Ukraine/core-web/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Core-Ukraine/core-web/releases/tag/v1.0.0
