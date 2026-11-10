import { describe, expect, it } from "vitest";

import { citedIn, richText } from "./rich";

describe("richText", () => {
  it("splits a text into plain runs, source numbers and terms", () => {
    expect(richText("Тепло забирає `PRHR`.[4,21] Далі PCS.[11]")).toEqual([
      { kind: "text", text: "Тепло забирає ", at: 0 },
      { kind: "term", text: "PRHR", at: 14 },
      { kind: "text", text: ".", at: 20 },
      { kind: "refs", numbers: [4, 21], at: 21 },
      { kind: "text", text: " Далі PCS.", at: 27 },
      { kind: "refs", numbers: [11], at: 37 },
    ]);
  });

  it("keeps numbers whole on one line", () => {
    const [part] = richText("1 117 МВт, 2 070 м³, 321 °C, 93 %, 2 ПГ");
    expect(part).toEqual({ kind: "text", text: "1 117 МВт, 2 070 м³, 321 °C, 93 %, 2 ПГ", at: 0 });
  });

  it("reads a term at the very start of a text", () => {
    expect(richText("`CMT` першими.")).toEqual([
      { kind: "term", text: "CMT", at: 0 },
      { kind: "text", text: " першими.", at: 5 },
    ]);
  });

  it("returns a text without marks as it is", () => {
    expect(richText("Пасивні системи.")).toEqual([{ kind: "text", text: "Пасивні системи.", at: 0 }]);
  });

  it("lists the numbers a text cites", () => {
    expect(citedIn("Перше.[1] Друге.[2,3]")).toEqual([1, 2, 3]);
    expect(citedIn("Без джерел.")).toEqual([]);
  });
});
