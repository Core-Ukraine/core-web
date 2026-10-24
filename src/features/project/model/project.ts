export interface ProjectBlock {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

// The parts of the project page; words in square brackets wait for the real ones
export const PROJECT_BLOCKS: readonly ProjectBlock[] = [
  {
    id: "meta",
    title: "Мета",
    paragraphs: [
      "[Чому проєкт створений і кому він адресований: студентам, школярам, інженерам чи всім, хто цікавиться атомною енергетикою.]",
    ],
  },
  {
    id: "zmist",
    title: "Що є на сайті",
    paragraphs: ["[Теорія, описи реакторів, історія галузі, література, відео та креслення.]"],
  },
  {
    id: "komanda",
    title: "Команда",
    paragraphs: ["[Хто працює над проєктом: імена, ролі та кілька слів про кожного.]"],
  },
  {
    id: "istoriia-proiektu",
    title: "Історія проєкту",
    paragraphs: ["[Як і коли зʼявився проєкт, важливі етапи його розвитку.]"],
  },
  {
    id: "zviazok",
    title: "Звʼязок",
    paragraphs: ["[E-mail проєкту та інші способи написати команді або долучитися до проєкту.]"],
  },
];

// How to reach the team, shown in the footer
export const CONTACT = {
  email: "[e-mail проєкту]",
  write: "Написати нам",
  href: "/pro-proiekt#zviazok",
} as const;
