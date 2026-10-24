import packageJson from "../../../package.json" with { type: "json" };

export const SITE = {
  name: "ЯДРО",
  tagline: "Атомна енергетика",
  title: "Атомна енергетика: від ядра до турбіни",
  description:
    "Освітній портал про атомну енергетику: фізика ланцюгової реакції, будова реакторів ВВЕР-1000, РБМК-1000 і AP-1000, історія галузі в Україні та світі, література, відео та креслення.",
  keywords: [
    "атомна енергетика",
    "ядерний реактор",
    "АЕС",
    "ВВЕР-1000",
    "РБМК-1000",
    "AP-1000",
    "ланцюгова реакція",
    "турбіна",
    "тепловидільна збірка",
    "історія атомної енергетики",
  ],
  locale: "uk_UA",
  author: { name: "Illia Movchko", url: "https://github.com/sacrificed666" },
  repository: "https://github.com/Core-Ukraine/core-web",
  version: packageJson.version,
  themeColor: "#0b1424",
} as const;

type Environment = Readonly<Partial<Record<string, string>>>;

// The public address: SITE_URL, the Vercel domain or localhost
export const siteUrl = (env: Environment = process.env): URL => {
  const explicit = env.SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(`http://localhost:${env.PORT ?? "3000"}`);
};

// Only production may be indexed: APP_ENV for Docker, VERCEL_ENV on Vercel
export const isIndexable = (env: Environment = process.env) => {
  const environment = env.APP_ENV ?? env.VERCEL_ENV;
  return environment === undefined || environment === "production";
};
