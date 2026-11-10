export interface Video {
  id: string;
  title: string;
  description: string;
  language: string;
}

export interface VideoGroup {
  title: string;
  intro: string;
  videos: readonly Video[];
}

// A video on YouTube with its title in the original language
const video = (id: string, title: string, description: string, language = "EN"): Video => ({
  id,
  title,
  description,
  language,
});

// The videos of the course in four groups, from the design to the first power
export const VIDEO_GROUPS: readonly VideoGroup[] = [
  {
    title: "Як влаштований AP1000",
    intro: "Почніть із цих роликів: загальна будова, пасивні системи, рішення щодо спрощення.",
    videos: [
      video("5VZ8EYuUUqU", "Westinghouse AP1000 PWR: overview", "Огляд будови блока і принципу пасивної безпеки."),
      video(
        "sVCVry_ccfQ",
        "Westinghouse AP1000 PWR video",
        "Анімований ролик про реакторну установку та станцію загалом.",
      ),
      video("HBjc-y2sowY", "AP1000 Safety Systems", "Системи безпеки: CMT, гідроємності, IRWST, ADS, PCS."),
      video(
        "fIqsSO8HVVY",
        "The AP1000 Masterclass: Return of the Big Boring Reactor",
        "Довга розмова в подкасті Decouple про конструкцію, будівництво Vogtle і уроки проєкту.",
      ),
      video(
        "wRB7pKLWP0s",
        "WNE 2025 - Workshop Westinghouse - AP1000® Pressurized Water Reactor - Proven and Ready to Deploy",
        "Доповідь Westinghouse на виставці WNE 2025 про досвід експлуатації і нові проєкти.",
      ),
      video("PpCVzEzY_gk", "Jaderný reaktor AP1000", "Пояснення будови реактора чеською.", "CZ"),
    ],
  },
  {
    title: "Повне знеструмлення станції (SBO)",
    intro:
      "Серія Westinghouse з чотирьох роликів про те, як блок охолоджується без живлення. Дивіться разом зі сценарієм SBO у модулі 4.",
    videos: [
      video(
        "FCorzfw5liQ",
        "AP1000 Station Blackout - Passive Core Cooling",
        "Охолодження активної зони: PRHR і природна циркуляція.",
      ),
      video(
        "ghy9aba3kHU",
        "AP1000 Station Blackout - Passive Containment Cooling",
        "Охолодження оболонки: вода з бака на даху і тяга повітря.",
      ),
      video(
        "jzBe_kwIs28",
        "AP1000 Station Blackout - Spent Fuel Pool Cooling",
        "Басейн витримки відпрацьованого палива без живлення.",
      ),
      video(
        "4KZSc2AdLr8",
        "AP1000 Station Blackout - Long Term Cooling Solutions",
        "Що роблять після 72 годин: допоміжні дизелі, доливання баків.",
      ),
      video(
        "vggzl9OngaM",
        "Understanding Nuclear Power Plants: Total Station Blackout",
        "Загальне пояснення знеструмлення на АЕС, не лише AP1000. Корисно для порівняння з активними системами.",
      ),
    ],
  },
  {
    title: "Будівництво і монтаж обладнання",
    intro: "AP1000 будують з великих модулів, зібраних поза котлованом. Тут видно розміри вузлів.",
    videos: [
      video(
        "PRsA4QNoIDs",
        "Westinghouse AP1000 Construction Time Lapse at Sanmen",
        "Прискорена зйомка будівництва першого у світі AP1000.",
      ),
      video("Ewds3mI8mL0", "Sanmen AP1000® PWR site progress: 2009 - 2015", "Хід будівництва Саньмень за шість років."),
      video(
        "9wFGeFOdz-w",
        "Massive steel dome lifted into place at China's Haiyang nuclear plant",
        "Підйом сталевого купола гермооболонки на Хайян.",
      ),
      video(
        "D19SNj5v-Tw",
        "Steel Module for Unit 4 of China's Haiyang Nuclear Power Plant Lifted into Place",
        "Встановлення сталевого модуля на Хайян-4 (CAP1000).",
      ),
      video(
        "NCHWUw7Q8eY",
        'Containment vessel "bottom head" placed at new Vogtle Nuclear Unit 3',
        "Встановлення днища гермооболонки Vogtle 3.",
      ),
      video("9Ljum3Ih23o", "Vogtle Unit 3 Reactor Vessel Timelapse", "Монтаж корпусу реактора Vogtle 3."),
      video(
        "SKnKnjVlgX8",
        "Timelapse of Vogtle Unit 4 Steam Generator Placement",
        "Встановлення парогенератора Vogtle 4.",
      ),
      video(
        "_dxgA58bJwo",
        "Plant Vogtle - Unit 3 steam generator A arrives",
        "Доставка парогенератора A на майданчик.",
      ),
      video(
        "PoD_6xfmB6w",
        "Time-Lapse Video: First AP1000 Reactor Coolant Pump Delivered To Plant Vogtle Expansion",
        "Доставка першого герметичного ГЦН на Vogtle.",
      ),
      video(
        "o6VUu9Wp4t4",
        "Curtiss-Wright Reactor Coolant Pump Shipment",
        "Відвантаження ГЦН із заводу Curtiss-Wright.",
      ),
      video("FglvCQQgEW4", "Vogtle 3&4 Time Lapse", "Прискорена зйомка будівництва двох блоків."),
    ],
  },
  {
    title: "Пуск блока: від палива до комерційної роботи",
    intro: "Етапи пуску по порядку на прикладі Vogtle 3 і 4.",
    videos: [
      video(
        "jKLQxWCcWzk",
        "Start of Vogtle Unit 3 nuclear fuel load marks historic moment for modern U.S. nuclear industry",
        "Завантаження 157 ТВЗ у реактор Vogtle 3 (жовтень 2022).",
      ),
      video("ARsZUgHBGzs", "Vogtle Unit 3 reaches initial criticality", "Перша критичність Vogtle 3 (березень 2023)."),
      video("mn-wFCtTIT0", "Vogtle Unit 3 reaches 100 percent energy output", "Вихід на номінальну потужність."),
      video(
        "7Eo2C4y2pII",
        "Plant Vogtle Unit 3 Reaches Commercial Operation",
        "Початок комерційної експлуатації (31.07.2023).",
      ),
      video("pnn6cJzye54", "Vogtle Unit 4 reaches criticality", "Перша критичність Vogtle 4."),
      video(
        "aOu5tSIKXBI",
        "Plant Vogtle Unit 4 successfully generates electricity, connects to grid for the first time!",
        "Перше підключення Vogtle 4 до мережі.",
      ),
      video(
        "z_Wl2RsfqwY",
        "Plant Vogtle's Unit 4 now in commercial operation: Georgia Power",
        "Комерційна експлуатація Vogtle 4 (29.04.2024).",
      ),
    ],
  },
];

// The address of a video on YouTube
export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

// A video of the course by its id; a wrong id fails the build
export const videoOf = (id: string): Video => {
  const found = VIDEO_GROUPS.flatMap((group) => group.videos).find((entry) => entry.id === id);
  if (!found) throw new Error(`The course links video ${id}, which is not in the list`);
  return found;
};
