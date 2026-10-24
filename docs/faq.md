# ❓ FAQ

## 📝 Content

**How do I replace the texts in square brackets?**
Each one lives in a model file next to the code that shows it; [Content](./content.md#-where-each-text-lives) lists them all. Replace the whole text, brackets included, and run `npm run check`.

**Why is the text not in a CMS or in Markdown files?**
The site has a handful of pages, and typed texts in the repository give one review, one history and one set of tests for words and code alike. A topic with its own text only needs a `body` in the catalog. When the texts grow into long articles, Markdown or MDX can replace `body` without touching the pages around it.

**How do I add a topic, a section or news?**
See [Adding a topic or a section](./content.md#-adding-a-topic-or-a-section) and [Adding news](./content.md#-adding-news).

**Why are the addresses in Latin letters?**
Transliterated slugs such as `/reaktory/vver-1000` stay readable when copied into a chat or an email, where Cyrillic addresses turn into long percent codes.

**Why is there no English version?**
The portal is written for a Ukrainian audience and the design is Ukrainian. Adding a language would mean a `[locale]` segment and message catalogs like in the sibling apps.

## 🎨 Design

**Where do the colours come from?**
From the ES Group brand: blue `#1D488C` and red `#E30220`, with the dark backgrounds and light texts picked as shades of the same blue. See [Design](./design.md#-colours).

**Why is red so rare?**
Red marks actions and active states only: the main buttons, the open menu item and the centre of the logo. Small red text would read poorly on the dark background.

**Is there a light theme?**
No: the design is dark only. Printed pages switch to dark text on white.

## 🛠️ Development

**Port 3000 is already taken. What now?**
For `npm run dev`, use `make dev PORT=3002` or `npx next dev --port 3002`. For Docker, set `APP_PORT=3002` in `.env`.

**Why does `npm run lint:text` fail on my text?**
It found an em or en dash. Use a colon, a comma, parentheses or a hyphen instead; the rule applies to texts of the site as well as code and docs.

**Why is a comment rejected by Oxlint?**
`local/short-comments` allows one line of at most 80 characters above the code, and `local/require-comments` asks for one above every function. Longer explanations belong in `docs/`.

**Can I use `style` props?**
Prefer classes and `data-*` attributes in the SCSS module of the component; it keeps the look in one place and works under any Content Security Policy.

## 🚀 Deployment

**Which host should I use?**
Any that runs Node.js 24 or newer: Vercel with no settings, or the Docker image on your own server. See [Deployment](./deployment.md#️-hosting).

**Why do the share cards show `localhost`?**
`SITE_URL` was not set when the site was built. Set it and build again; on Vercel the production domain is used automatically.

**Why do CodeQL and dependency review fail on a private repository?**
Both need GitHub Code Security on private repositories. Make the repository public or turn the feature on, see [Security](./security.md#-supply-chain).
