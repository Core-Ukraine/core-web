# 🛡️ Security policy

## ✅ Supported versions

Only the latest release receives security fixes, currently **1.x**. A fix ships as a patch version, for example `1.0.1`, as described in [docs/releases.md](../docs/releases.md).

## 📮 Reporting a vulnerability

Please **do not open a public issue** for security problems.

1. Open the repository's **Security** tab and choose **Report a vulnerability** to send a private advisory.
2. Describe the problem, the affected version or commit and the steps to reproduce it.
3. If you have a proof of concept, attach it to the advisory rather than publishing it.

You can expect an acknowledgement within **3 working days** and a status update at least once a week until the report is resolved. Once a fix is released, the advisory is published and you are credited, unless you prefer to stay anonymous.

## 🎯 Scope

Core Web is the Next.js site of ЯДРО, an educational portal about nuclear energy. Every page is prerendered from the texts in the repository: there are no accounts, no forms, no database and no third-party scripts. Reports are especially welcome about:

- 💉 script injection through an address, a text of the site or the structured data;
- 🧱 ways to bypass the Content Security Policy or the other security headers;
- 📴 tampering with the service worker or the offline page;
- 🐳 weaknesses of the Docker image or its Compose setup;
- ⚙️ weaknesses in the CI pipeline or the GitHub Actions workflows.

The measures already in place are described in [docs/security.md](../docs/security.md).
