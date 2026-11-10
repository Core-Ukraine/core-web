export type FlowKind = "hot" | "cold" | "steam" | "water" | "air";

export interface Pipe {
  id: string;
  path: string;
  kind: FlowKind;
  // A flow without a pipe: water on the dome, air in the gap, steam in the vessel
  open?: boolean;
}

export type PartId =
  | "rpv"
  | "core"
  | "sg"
  | "rcp"
  | "pzr"
  | "cmt"
  | "acc"
  | "irwst"
  | "prhr"
  | "ads"
  | "cv"
  | "sb"
  | "pcs"
  | "recirc";

export type MarkId = "flood" | "steam" | "leak" | "rupture" | "tube";

export type ScenarioId = "normal" | "sbo" | "sloca" | "lloca" | "lofw" | "sgtr";

export interface Scene {
  flows: readonly string[];
  parts: readonly PartId[];
  marks: readonly MarkId[];
}

// The pipes and flows of the simplified section, on an 800 by 600 grid
export const PIPES: readonly Pipe[] = [
  { id: "hot", path: "M395 350 H455 L532 448", kind: "hot" },
  { id: "cold", path: "M551 482 H420 V376 H395", kind: "cold" },
  { id: "hot2", path: "M345 350 H292", kind: "hot" },
  { id: "cold2", path: "M292 378 H345", kind: "cold" },
  { id: "surge", path: "M456 320 V349", kind: "hot" },
  { id: "steam", path: "M588 240 H794", kind: "steam" },
  { id: "feed", path: "M794 300 H588", kind: "water" },
  { id: "prhrin", path: "M310 350 V228 H200 V252", kind: "hot" },
  { id: "prhrtube", path: "M200 252 H150 V330 H200", kind: "hot" },
  { id: "prhrout", path: "M200 330 H232 V378 H292", kind: "cold" },
  { id: "cmtbal", path: "M420 376 V236 H265 V245", kind: "cold" },
  { id: "cmtinj", path: "M265 315 V400 H345", kind: "water" },
  { id: "acc", path: "M290 442 V400 H345", kind: "water" },
  { id: "irwstinj", path: "M205 340 V400 H345", kind: "water" },
  { id: "recirc", path: "M160 526 V400 H345", kind: "water" },
  { id: "ads13", path: "M458 228 V205 H175 V266", kind: "steam" },
  { id: "ads4", path: "M322 350 V318", kind: "steam" },
  { id: "irwststeam", path: "M215 240 V202 Q238 172 330 152", kind: "steam", open: true },
  { id: "condensate", path: "M126 196 V250 H136", kind: "water", open: true },
  { id: "pcsL", path: "M372 104 V137 A284 89 0 0 0 117 224", kind: "water", open: true },
  { id: "pcsR", path: "M428 104 V137 A284 89 0 0 1 683 224", kind: "water", open: true },
  {
    id: "airL",
    path: "M30 194 H106 V478 H116 V202 A292 97 0 0 1 360 129 Q382 122 386 104 V22",
    kind: "air",
    open: true,
  },
  {
    id: "airR",
    path: "M770 194 H694 V478 H684 V202 A292 97 0 0 0 440 129 Q418 122 414 104 V22",
    kind: "air",
    open: true,
  },
];

// The position numbers of the parts, as on the section and in the list
export const PART_NUMBERS: Readonly<Record<PartId, number>> = {
  rpv: 1,
  core: 2,
  sg: 3,
  rcp: 4,
  pzr: 5,
  cmt: 6,
  acc: 7,
  irwst: 8,
  prhr: 9,
  ads: 10,
  cv: 11,
  sb: 12,
  pcs: 13,
  recirc: 14,
};

// Where each number sits on the section, and the point its leader line ends at
export const CALLOUTS: readonly { part: PartId; x: number; y: number; to?: readonly [number, number] }[] = [
  { part: "rpv", x: 318, y: 512, to: [348, 470] },
  { part: "core", x: 370, y: 424 },
  { part: "sg", x: 616, y: 380, to: [578, 380] },
  { part: "rcp", x: 604, y: 482, to: [577, 476] },
  { part: "pzr", x: 500, y: 252, to: [472, 262] },
  { part: "cmt", x: 265, y: 280 },
  { part: "acc", x: 290, y: 462 },
  { part: "irwst", x: 213, y: 300 },
  { part: "prhr", x: 168, y: 306 },
  { part: "ads", x: 498, y: 196, to: [464, 214] },
  { part: "cv", x: 640, y: 276, to: [680, 276] },
  { part: "sb", x: 746, y: 380, to: [720, 380] },
  { part: "pcs", x: 508, y: 84, to: [470, 84] },
  { part: "recirc", x: 200, y: 512, to: [174, 522] },
];

const CONTAINMENT_COOLING = ["pcsL", "pcsR", "airL", "airR"];
const RESIDUAL_HEAT = ["hot2", "prhrin", "prhrtube", "prhrout", "cold2"];

// What each scenario sets working on the section: flows, parts and marks
export const SCENES: Readonly<Record<ScenarioId, Scene>> = {
  normal: {
    flows: ["hot", "cold", "hot2", "cold2", "steam", "feed"],
    parts: ["rpv", "core", "sg", "rcp", "pzr"],
    marks: [],
  },
  sbo: {
    flows: [...RESIDUAL_HEAT, "irwststeam", "condensate", ...CONTAINMENT_COOLING],
    parts: ["prhr", "irwst", "pcs", "cv", "sb"],
    marks: ["steam"],
  },
  sloca: {
    flows: ["cmtbal", "cmtinj", "acc", "ads13", "ads4", "irwstinj", "recirc", ...CONTAINMENT_COOLING],
    parts: ["cmt", "acc", "ads", "irwst", "recirc", "pcs", "cv"],
    marks: ["leak", "flood", "steam"],
  },
  lloca: {
    flows: ["acc", "cmtinj", "cmtbal", "ads13", "ads4", "irwstinj", "recirc", ...CONTAINMENT_COOLING],
    parts: ["acc", "cmt", "ads", "irwst", "recirc", "pcs", "cv"],
    marks: ["leak", "rupture", "flood", "steam"],
  },
  lofw: {
    flows: [...RESIDUAL_HEAT, "cmtbal", "cmtinj"],
    parts: ["prhr", "cmt", "irwst"],
    marks: [],
  },
  sgtr: {
    flows: [...RESIDUAL_HEAT, "cmtbal", "cmtinj"],
    parts: ["prhr", "cmt", "sg"],
    marks: ["tube"],
  },
};
