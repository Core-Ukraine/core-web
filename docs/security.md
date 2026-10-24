# 🛡️ Security

The site has no accounts, no forms, no database and no third-party scripts: every page is prerendered from the repository. What is left to protect is the visitor's browser and the server that hosts the pages.

## 🧱 Content Security Policy

`next.config.ts` sends one policy with every page:

```text
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self';
worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

- 🌐 **Nothing from other sites.** Scripts, styles, fonts and images come from the site itself; fonts are downloaded at build time.
- 📄 **Inline scripts are allowed** because the pages are static: Next.js puts the data of a page into inline scripts, and a nonce would need a server render for every request. No text of the site reaches a script: the texts come from the repository, and JSON-LD escapes `<`.
- 🛠️ **Development** adds `'unsafe-eval'` and WebSocket connections for hot reload.

> [!NOTE]
> The sibling Weather app renders every request and uses a nonce instead; FACEIT Stats prerenders like this site and uses the same policy.

## 📋 Headers

| Header                       | Value                                                      |
| ---------------------------- | ---------------------------------------------------------- |
| `Strict-Transport-Security`  | `max-age=63072000; includeSubDomains`, outside development |
| `X-Content-Type-Options`     | `nosniff`                                                  |
| `X-Frame-Options`            | `DENY`                                                     |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`                          |
| `Cross-Origin-Opener-Policy` | `same-origin`                                              |
| `Permissions-Policy`         | No camera, microphone, location, payments, USB or topics   |
| `X-Powered-By`               | Not sent                                                   |

The app icons under `/pwa` are served with `default-src 'none'; sandbox`, so an image opened on its own can never run anything.

## 📴 The offline page

`/offline` is one self-contained HTML page with its own policy, `default-src 'none'`, that allows exactly its inline style and its one-line script by their SHA-256 hashes, and nothing else. It carries `X-Robots-Tag: noindex`. The global policy skips this path, so the stricter one wins.

The service worker in `public/sw.js` only handles page navigations: it lets them through and falls back to the kept offline page when the network fails. It never caches pages, so a visitor never sees an old version of the site.

## 🐳 Docker

The runtime image runs the standalone server as the unprivileged `node` user, without the `.env` files Next.js copies into its output. Staging and production drop every Linux capability, forbid privilege escalation and limit memory, CPU and processes. Environment files reach the build as BuildKit secrets, never as layers. See [Deployment](./deployment.md#-docker).

## 🔁 Supply chain

- 🔏 `npm audit signatures` in CI verifies the registry signatures of every package.
- 📌 GitHub Actions are pinned to commit SHAs, and the Docker base image to a digest.
- 🤖 Dependabot opens weekly updates, after a cooldown that lets broken or hijacked releases be caught first.
- 🛡️ Dependency review fails pull requests that add packages with high-severity advisories, and CodeQL scans the code and the workflows.

> [!IMPORTANT]
> On a private repository, CodeQL and dependency review need GitHub Code Security. Without it, those two jobs fail; make the repository public or turn the feature on under **Settings → Code security**.

## 📮 Reporting

`/.well-known/security.txt` points to the private advisories of the repository and stays valid for a year from every request. The policy is in [SECURITY.md](../.github/SECURITY.md).

## 🧪 How it is checked

`e2e/security.spec.ts` browses the site with an open menu and fails on any console error or policy violation, checks the policy and the headers of three pages, and checks the stricter policies of the offline page and the icons. `scripts/build-report.mjs` checks that the headers are configured in every build.
