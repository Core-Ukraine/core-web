export interface Source {
  title: string;
  url: string;
  note?: string;
}

export interface SourceGroup {
  title: string;
  first: number;
  last: number;
}

// The sources of the course; a number in the text is a position in this list
export const SOURCES: readonly Source[] = [
  {
    title: "NRC. AP1000 Design Control Document, ред. 19, Tier 2, розділ 1 (2011)",
    url: "https://www.nrc.gov/docs/ML1117/ML11171A331.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 1: огляд станції (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A073.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 3: перший контур (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A092.pdf",
  },
  {
    title: "NRC. AP1000 Technology, розділ 4: Passive Core Cooling System (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A100.pdf",
    note: "Навчальний посібник NRC: схеми PXS, обʼєми баків, уставки CMT і ADS, послідовності для LOCA, SGTR, втрати живильної води.",
  },
  {
    title: "NRC. AP1000 Technology, розділи 5.1-5.2: оболонка і PCS (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A105.pdf",
    note: "Розміри гермооболонки і захисної будівлі, бак PCS, повітряний тракт.",
  },
  {
    title: "NRC HRTD 5.1. Containment Structure (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A109.pdf",
    note: "Товщини стінок оболонки, матеріал, будова даху захисної будівлі.",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, пакет навчальних матеріалів і рисунків (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A057.html",
    note: "45 файлів за розділами, від огляду станції до електропостачання: тексти, слайди і збірки рисунків. Рисунки в модулях 2-4 взято звідси.",
  },
  {
    title: "NRC. Прес-реліз 26-080: оновлення і продовження сертифікації AP1000, 14.10.2026",
    url: "https://www.nrc.gov/about-nrc/news-releases/2026/26-080",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 2: активна зона і корпус, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A083.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 4: PXS, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A102.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 5.2: PCS, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A115.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 6.3: CVS, текст (2009)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A138.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 6.1: RNS, текст (2009)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A129.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 7.1: головна парова система, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A146.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 7.2: конденсатно-живильний тракт, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A149.pdf",
  },
  {
    title: "NRC. AP1000 Introduction to Differences, розділ 9: електропостачання, текст (2011)",
    url: "https://www.nrc.gov/docs/ML1122/ML11221A186.pdf",
  },
  {
    title:
      "NRC. Staff Requirements Memorandum щодо SECY-90-016: цільові показники безпеки для нових реакторів, 26.06.1990",
    url: "https://www.nrc.gov/docs/ML0037/ML003707885.pdf",
  },
  {
    title: "Westinghouse. AP1000 Station Blackout",
    url: "https://westinghousenuclear.com/media/3pipeoof/ap1000-station-blackout.pdf",
    note: "Хронологія знеструмлення від 0 хвилин до 72 годин, яку використано в модулі 4.",
  },
  {
    title: "M. Kirst (Westinghouse). The Future Begins… Now!, доповідь на конференції МАГАТЕ, 2009",
    url: "https://www-pub.iaea.org/MTCD/Meetings/PDFplus/2009/cn164/Sessions/12KS_Mike%20Kirst.pdf",
  },
  {
    title: "Westinghouse. AP600: a simplified, passive APWR plant design (OSTI)",
    url: "https://www.osti.gov/biblio/6719655",
  },
  { title: "Wikipedia. AP1000", url: "https://en.wikipedia.org/wiki/AP1000" },
  { title: "Wikipedia. AP600", url: "https://en.wikipedia.org/wiki/AP600" },
  {
    title: "Wikipedia. Sanmen Nuclear Power Station",
    url: "https://en.wikipedia.org/wiki/Sanmen_Nuclear_Power_Station",
  },
  {
    title: "Power Engineering. NRC grants final design approval to Westinghouse AP1000, 14.09.2004",
    url: "https://www.power-eng.com/nuclear/nrc-grants-final-design-approval-to-westinghouse-ap1000/",
  },
  {
    title: "Power Engineering. Westinghouse to build four nuclear power plants in China, 25.07.2007",
    url: "https://www.power-eng.com/nuclear/westinghouse-to-build-four-nuclear-power-plants-in-china/",
  },
  {
    title: "Curtiss-Wright. Контракти на ГЦН для AP1000 у Китаї, 2016",
    url: "https://electro-mechanicalsystems.curtisswright.com/news/news-details/2016/Curtiss-wright-Awarded-Contracts-In-Excess-Of-450-Million-To-Provide-Reactor-Coolant-Pumps-For-Ap1000-Nuclear-Power-Plants-In-China",
  },
  {
    title: "POWER. Vogtle 3 reaches initial criticality, 06.03.2023",
    url: "https://www.powermag.com/vogtle-3-reaches-initial-criticality-marking-pivotal-nuclear-startup-milestone/",
  },
  {
    title: "Southern Company. Vogtle Unit 4 enters commercial operation, 29.04.2024",
    url: "https://southerncompany.mediaroom.com/2024-04-29-Vogtle-Unit-4-enters-commercial-operation",
  },
  {
    title: "NucNet. Cameco and Brookfield complete $8.2 billion acquisition, 08.11.2023",
    url: "https://www.nucnet.org/news/cameco-and-brookfield-complete-usd8-2-billion-acquisition-11-3-2023",
  },
  {
    title: "Forbes.ua. ХАЕС-5 і -6 призупинено, 21.10.2025",
    url: "https://forbes.ua/news/na-khmelnitskiy-aes-prizupinili-budivnitstvo-energoblokiv-za-tekhnologieyu-westinghouse-cherez-viynu-21102025-33516",
  },
  {
    title: "NucNet. Sanmen-3 cold testing, 13.02.2026",
    url: "https://www.nucnet.org/news/cold-testing-completed-for-china-s-sanmen-3-cap1000-nuclear-plant-2-5-2026",
  },
  {
    title: "ANS. Poland construction license application, 02.04.2026",
    url: "https://www.ans.org/news/2026-04-02/article-7903/construction-license-application-submitted-for-polands-first-nuclear-plant/",
  },
  {
    title: "NucNet. Vogtle-4 as AP1000 benchmark, 09.04.2026",
    url: "https://www.nucnet.org/news/westinghouse-sets-vogtle-4-as-ap1000-reactor-benchmark-as-it-prepares-for-major-fleet-expansion-4-3-2026",
  },
  {
    title: "ANS. V.C. Summer joint venture, 05.05.2026",
    url: "https://www.ans.org/news/2026-05-05/article-8003/joint-venture-formed-with-a-focus-on-finishing-summer2-and-3/",
  },
  {
    title: "NucNet. Kozloduy EPC in 2027, 11.06.2026",
    url: "https://www.nucnet.org/news/bulgaria-planning-to-move-kozloduy-nuclear-project-to-epc-stage-in-2027-6-4-2026",
  },
  {
    title: "ANS. DOE announces $17.5B in conditional loans for AP1000 builds, 23.06.2026",
    url: "https://www.ans.org/news/2026-06-23/article-8142/doe-announces-175b-in-conditional-loans-for-ap1000-builds/",
  },
  {
    title: "World Nuclear News. Hot tests completed at third Haiyang unit, 17.08.2026",
    url: "https://wnn.world-nuclear.org/articles/hot-tests-completed-at-third-haiyang-unit",
  },
  {
    title: "Cameco. Звіт за III квартал 2026 (Westinghouse)",
    url: "https://www.sec.gov/Archives/edgar/data/0001009001/000119312526439858/d106072dex992.htm",
  },
];

// The sources in groups by who published them, as ranges of numbers
export const SOURCE_GROUPS: readonly SourceGroup[] = [
  { title: "NRC", first: 1, last: 17 },
  { title: "Westinghouse", first: 18, last: 20 },
  { title: "Довідкові статті", first: 21, last: 23 },
  { title: "Новини і звіти компаній", first: 24, last: 38 },
];

// The source behind a number in the text; a wrong number fails the build
export const sourceOf = (number: number): Source => {
  const source = SOURCES[number - 1];
  if (!source) throw new Error(`The course cites source ${number}, which is not in the list`);
  return source;
};

// The anchor of a source in the list at the end of the course
export const sourceAnchor = (number: number) => `dzherelo-${number}`;
