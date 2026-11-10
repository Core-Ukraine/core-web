import type { StaticImageData } from "next/image";

import f1_2 from "../assets/f1-2.webp";
import f3_1 from "../assets/f3-1.webp";
import f3_2 from "../assets/f3-2.webp";
import f3_5 from "../assets/f3-5.webp";
import f3_7 from "../assets/f3-7.webp";
import f3_8 from "../assets/f3-8.webp";
import f4_1 from "../assets/f4-1.webp";
import f4_4 from "../assets/f4-4.webp";
import f4_5 from "../assets/f4-5.webp";
import f4_6 from "../assets/f4-6.webp";
import f5_1_1 from "../assets/f5-1-1.webp";
import f5_1_2 from "../assets/f5-1-2.webp";

export interface Term {
  term: string;
  meaning: string;
}

export interface Drawing {
  image: StaticImageData;
  width: number;
  height: number;
  title: string;
  number: string;
  // The NRC file the drawing comes from, when the course names it
  document?: string;
  note?: string;
  terms?: readonly Term[];
}

// The terms of a drawing, written as pairs of the English label and its meaning
const terms = (...pairs: readonly (readonly [string, string])[]): readonly Term[] =>
  pairs.map(([term, meaning]) => ({ term, meaning }));

// An NRC training file by the last digits of its number
const nrc = (digits: string) => `https://www.nrc.gov/docs/ML1122/ML11221A${digits}.pdf`;

const INJECTION = terms(
  ["Core makeup tank", "CMT"],
  ["accum.", "гідроємність"],
  ["spargers", "барботери"],
  ["DVI conn.", "патрубок прямого впорскування"],
  ["loop compart.", "бокс петлі"],
);

const RESIDUAL_HEAT = terms(
  ["FO", "клапани, що відкриваються при втраті живлення"],
  ["HL, CL", "гаряча і холодна нитки"],
);

const CONTAINMENT_COOLING = terms(
  ["PCS gravity drain water tank", "бак PCS на даху"],
  ["water film evaporation", "випаровування плівки"],
  ["outside cooling air intake", "забір повітря"],
  ["air baffle", "перегородка повітряного тракту"],
  ["natural convection air discharge", "вихід повітря"],
  ["internal condensation", "конденсація пари всередині"],
);

export type DrawingId =
  | "f1_2"
  | "f3_1"
  | "f3_2"
  | "f3_5"
  | "f3_7"
  | "f3_8"
  | "f4_1"
  | "f4_4"
  | "f4_5"
  | "f4_6"
  | "f5_1_1"
  | "f5_1_2";

// The drawings from the NRC training course on AP1000, captions in Ukrainian
export const DRAWINGS: Readonly<Record<DrawingId, Drawing>> = {
  f1_2: {
    image: f1_2,
    width: 1200,
    height: 1722,
    title: "Розріз гермооболонки і захисної будівлі",
    number: "рис. 1-2, аркуш 1",
    document: nrc("064"),
  },
  f3_1: { image: f3_1, width: 1300, height: 1447, title: "Петлі першого контуру, ізометрія", number: "рис. 3-1" },
  f3_2: {
    image: f3_2,
    width: 1400,
    height: 1307,
    title: "Схема першого контуру",
    number: "рис. 3-2",
    document: nrc("089"),
  },
  f3_5: {
    image: f3_5,
    width: 1100,
    height: 1225,
    title: "Парогенератор Delta-125",
    number: "рис. 3-5",
    document: nrc("089"),
    terms: terms(
      ["Tube bundle", "пучок U-подібних трубок"],
      ["primary і secondary separators", "сепаратори пари"],
      ["channel head", "нижня камера першого контуру"],
      ["divider plate", "її перегородка"],
      ["RCP casing", "корпус ГЦН"],
    ),
  },
  f3_7: {
    image: f3_7,
    width: 1000,
    height: 1534,
    title: "Герметичний головний циркуляційний насос",
    number: "рис. 3-7",
    document: nrc("089"),
    terms: terms(
      ["Impeller", "робоче колесо"],
      ["thermal barrier", "тепловий барʼєр"],
      ["upper і lower flywheel", "маховики"],
      ["stator", "статор"],
      ["thrust bearings", "упорні підшипники"],
    ),
  },
  f3_8: {
    image: f3_8,
    width: 1100,
    height: 1175,
    title: "Компенсатор тиску",
    number: "рис. 3-8",
    document: nrc("089"),
    terms: terms(
      ["Spray nozzle", "патрубок впорскування"],
      ["safety nozzle", "патрубок запобіжних клапанів"],
      ["immersion heater", "занурювальні електронагрівачі"],
    ),
  },
  f4_1: {
    image: f4_1,
    width: 1400,
    height: 915,
    title: "Пасивне відведення залишкового тепла (PRHR)",
    number: "рис. 4-1",
    document: nrc("099"),
    terms: RESIDUAL_HEAT,
  },
  f4_4: {
    image: f4_4,
    width: 1400,
    height: 974,
    title: "Пасивне аварійне впорскування",
    number: "рис. 4-4",
    document: nrc("099"),
    terms: INJECTION,
  },
  f4_5: {
    image: f4_5,
    width: 1300,
    height: 1404,
    title: "Пасивна система охолодження зони (PXS)",
    number: "рис. 4-5",
    document: nrc("099"),
  },
  f4_6: {
    image: f4_6,
    width: 1400,
    height: 1062,
    title: "Довгострокове охолодження і рециркуляція",
    number: "рис. 4-6",
    document: nrc("099"),
    terms: terms(
      ["Gutter", "жолоб збору конденсату"],
      ["recirc screen", "решітка рециркуляції"],
      ["PXS valve room", "приміщення арматури PXS"],
    ),
  },
  f5_1_1: {
    image: f5_1_1,
    width: 1100,
    height: 1685,
    title: "Сталева гермооболонка: вигляд збоку і план проходок",
    number: "рис. 5.1-1",
    document: nrc("107"),
    note: "Відмітки EL у футах і дюймах.",
    terms: terms(
      ["Equipment hatch", "транспортний люк"],
      ["personnel lock", "шлюз для персоналу"],
      ["crane girder", "підкранова балка"],
    ),
  },
  f5_1_2: {
    image: f5_1_2,
    width: 1200,
    height: 1455,
    title: "Пасивне охолодження оболонки",
    number: "рис. 5.1-2",
    document: nrc("107"),
    terms: CONTAINMENT_COOLING,
  },
};
