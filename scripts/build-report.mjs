import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("../", import.meta.url).pathname;
const build = join(root, ".next");

// Every file below a directory
const walk = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const failures = [];
// Collects a failed check instead of stopping at the first one
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

// Reads a JSON manifest from the build output
const readJson = (file) => JSON.parse(readFileSync(join(build, file), "utf8"));

const prerender = readJson("prerender-manifest.json");
const routes = Object.keys(prerender.routes);
for (const route of [
  "/offline",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/icon.svg",
  "/apple-icon",
  "/pwa/icon-192.png",
  "/pwa/icon-512.png",
  "/pwa/maskable-512.png",
]) {
  expect(routes.includes(route), `${route} was not prerendered`);
}

// Every page of the sitemap must be static
const sitemapFile = join(build, "server/app/sitemap.xml.body");
const pages = existsSync(sitemapFile)
  ? [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => new URL(match[1]).pathname)
  : [];
expect(pages.length > 0, "the sitemap lists no pages");
for (const page of pages) expect(routes.includes(page), `${page} from the sitemap was not prerendered`);

// Share cards: prerendered for fixed pages, drawn on demand for the rest
for (const card of ["/opengraph-image", "/pro-proiekt/opengraph-image", "/novyny/opengraph-image"]) {
  expect(routes.includes(card), `${card} was not prerendered`);
}
for (const card of [
  "/[section]/opengraph-image/[__metadata_id__]",
  "/[section]/[topic]/opengraph-image/[__metadata_id__]",
]) {
  expect(Object.hasOwn(prerender.dynamicRoutes, card), `the share cards ${card} are missing`);
}

const headerRules = readJson("routes-manifest.json").headers;
// Header names next.config.ts sets for a source pattern
const headersFor = (source) =>
  new Set(
    headerRules
      .filter((entry) => entry.source === source)
      .flatMap((entry) => entry.headers.map((header) => header.key)),
  );
const pageHeaders = headersFor("/:path*");
for (const header of [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
]) {
  expect(pageHeaders.has(header), `the ${header} header is missing`);
}
expect(
  headerRules.some((entry) => entry.headers.some((header) => header.key === "Content-Security-Policy")),
  "the pages are served without a Content Security Policy",
);
expect(
  headersFor("/pwa/:path*").has("Content-Security-Policy"),
  "the app icons are served without a sandboxing policy",
);

const appRoutes = Object.keys(readJson("server/app-paths-manifest.json"));
for (const route of ["/healthz/route", "/.well-known/security.txt/route"]) {
  expect(appRoutes.includes(route), `${route.replace(/\/route$/u, "")} is missing from the build`);
}

// Bytes as kilobytes for the report
const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

const assets = walk(join(build, "static"))
  .filter((file) => /\.(js|css)$/u.test(file))
  .map((file) => {
    const content = readFileSync(file);
    return { name: relative(build, file), size: content.length, gzip: gzipSync(content).length };
  })
  .toSorted((a, b) => b.gzip - a.gzip);

// Gzipped size of all assets of one kind
const sum = (kind) =>
  assets.filter((asset) => asset.name.endsWith(kind)).reduce((total, asset) => total + asset.gzip, 0);
// Number of assets of one kind
const count = (kind) => assets.filter((asset) => asset.name.endsWith(kind)).length;

const lines = [
  "### 📦 Build output",
  "",
  `${routes.length} prerendered routes, ${pages.length} pages in the sitemap.`,
  "",
  "| File | Size | Gzip |",
  "| --- | ---: | ---: |",
  ...assets
    .slice(0, 10)
    .map((asset) => `| \`${asset.name}\` | ${formatSize(asset.size)} | ${formatSize(asset.gzip)} |`),
  `| **JavaScript, ${count(".js")} files** | | **${formatSize(sum(".js"))}** |`,
  `| **CSS, ${count(".css")} files** | | **${formatSize(sum(".css"))}** |`,
  "",
  failures.length === 0
    ? "✅ Every page of the sitemap is static; share cards, robots rules, manifest, icons and the security headers are in place."
    : failures.map((failure) => `❌ ${failure}`).join("\n"),
];

process.stdout.write(`${lines.join("\n")}\n`);
if (failures.length > 0) process.exitCode = 1;
