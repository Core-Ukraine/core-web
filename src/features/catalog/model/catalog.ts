import type { Path } from "@/shared/lib/path";

export interface Topic {
  slug: string;
  title: string;
  summary: string;
  body?: readonly string[];
}

export interface Section {
  slug: string;
  title: string;
  description: string;
  topics: readonly Topic[];
}

export interface Page {
  href: Path;
  title: string;
  description: string;
}

export interface TopicStep {
  href: Path;
  title: string;
  section: string;
}

export interface TopicMatch {
  section: Section;
  topic: Topic;
  sectionIndex: number;
  topicIndex: number;
}

// The four sections of the menu, each with its topics, in the order of the menu
export const SECTIONS: readonly Section[] = [
  {
    slug: "osnovy",
    title: "Основи",
    description: "Фізика ланцюгової реакції та шлях енергії від ядра до генератора.",
    topics: [
      { slug: "teoriia", title: "Теорія ядерних реакторів", summary: "Поділ ядра, ланцюгова реакція, критичність" },
      { slug: "turbiny", title: "Турбіни", summary: "Перетворення енергії пари на електричну" },
    ],
  },
  {
    slug: "reaktory",
    title: "Реактори",
    description: "Будова, принцип роботи та особливості основних типів реакторів.",
    topics: [
      { slug: "vver-1000", title: "ВВЕР-1000", summary: "Водо-водяний енергетичний реактор" },
      { slug: "rbmk-1000", title: "РБМК-1000", summary: "Реактор великої потужності канальний" },
      { slug: "ap-1000", title: "AP-1000", summary: "Реактор із пасивними системами безпеки" },
    ],
  },
  {
    slug: "istoriia",
    title: "Історія",
    description: "Як розвивалася атомна енергетика в Україні та світі.",
    topics: [
      {
        slug: "ukraina",
        title: "Історія розвитку атомної енергетики України",
        summary: "Від перших АЕС до сьогодення",
      },
      { slug: "svit", title: "Історія атомної енергетики у світі", summary: "Ключові етапи та події" },
    ],
  },
  {
    slug: "materialy",
    title: "Матеріали",
    description: "Книги, відео та технічні креслення для самостійного навчання.",
    topics: [
      { slug: "literatura", title: "Література атомної енергетики", summary: "Підручники, монографії, довідники" },
      { slug: "video", title: "Відео", summary: "Лекції, анімації, віртуальні екскурсії" },
      { slug: "kreslennia", title: "Креслення", summary: "Схеми та технічні креслення обладнання" },
    ],
  },
];

// The two pages the menu opens directly
export const PAGES = {
  about: { href: "/pro-proiekt", title: "Про проєкт", description: "Мета, команда та історія проєкту." },
  news: { href: "/novyny", title: "Новини", description: "Події галузі, оновлення проєкту та нові матеріали." },
} as const satisfies Record<string, Page>;

// What a topic page shows until its text is written
export const TOPIC_PLACEHOLDER = [
  "[Вступ: про що ця тема і що читач дізнається з цієї сторінки.]",
  "[Основний текст: ключові поняття, принцип роботи, схеми та приклади.]",
  "[Підсумок і джерела для подальшого читання.]",
] as const;

// The address of a section
export const sectionHref = (section: Section): Path => `/${section.slug}`;

// The address of a topic inside its section
export const topicHref = (section: Section, topic: Topic): Path => `/${section.slug}/${topic.slug}`;

// A section by its slug
export const findSection = (slug: string) => SECTIONS.find((section) => section.slug === slug);

// A topic by the slugs of its section and its own, with both positions
export const findTopic = (sectionSlug: string, topicSlug: string): TopicMatch | undefined => {
  const sectionIndex = SECTIONS.findIndex((section) => section.slug === sectionSlug);
  const section = SECTIONS[sectionIndex];
  const topicIndex = section?.topics.findIndex((topic) => topic.slug === topicSlug) ?? -1;
  const topic = section?.topics[topicIndex];
  return section && topic ? { section, topic, sectionIndex, topicIndex } : undefined;
};

// The number of a card from its position: 01, 02 and so on
export const cardNumber = (index: number) => String(index + 1).padStart(2, "0");

// The number of a topic inside its section: 02.1, 02.2 and so on
export const topicNumber = (sectionIndex: number, topicIndex: number) =>
  `${cardNumber(sectionIndex)}.${topicIndex + 1}`;

const PLURAL = new Intl.PluralRules("uk");
const TOPIC_WORDS: Partial<Record<Intl.LDMLPluralRule, string>> = { one: "тема", few: "теми" };

// The number of topics in words: 1 тема, 3 теми, 5 тем
export const topicCount = (count: number) => `${count} ${TOPIC_WORDS[PLURAL.select(count)] ?? "тем"}`;

// Every topic in reading order, from the first section to the last
const READING_ORDER: readonly TopicStep[] = SECTIONS.flatMap((section) =>
  section.topics.map((topic) => ({ href: topicHref(section, topic), title: topic.title, section: section.title })),
);

// The topics before and after a topic in reading order, across sections
export const neighbours = (section: Section, topic: Topic) => {
  const index = READING_ORDER.findIndex((step) => step.href === topicHref(section, topic));
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: READING_ORDER[index - 1], next: READING_ORDER[index + 1] };
};

// The text of a topic, or the placeholder while it is not written
export const topicBody = (topic: Topic) => (topic.body && topic.body.length > 0 ? topic.body : TOPIC_PLACEHOLDER);
