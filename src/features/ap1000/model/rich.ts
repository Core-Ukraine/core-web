export type RichPart =
  | { kind: "text"; text: string; at: number }
  | { kind: "refs"; numbers: readonly number[]; at: number }
  | { kind: "term"; text: string; at: number };

// Source numbers such as [4] or [4,21], and terms in backticks such as `PRHR`
const MARKS = /\[(\d+(?:,\d+)*)\]|`[^`]+`/gu;

// A space inside a number such as 3 400, or before a unit such as °C or %
const BREAKABLE = /(\d) (?=\d{3}(?!\d)|°C|%)/gu;

// Keeps a number whole on one line
const keepTogether = (text: string) => text.replaceAll(BREAKABLE, "$1 ");

// Splits a text of the course into plain runs, source numbers and terms
export const richText = (text: string): RichPart[] => {
  const parts: RichPart[] = [];
  let last = 0;
  for (const match of text.matchAll(MARKS)) {
    const [whole, numbers] = match;
    if (match.index > last) parts.push({ kind: "text", text: keepTogether(text.slice(last, match.index)), at: last });
    parts.push(
      numbers === undefined
        ? { kind: "term", text: whole.slice(1, -1), at: match.index }
        : { kind: "refs", numbers: numbers.split(",").map(Number), at: match.index },
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push({ kind: "text", text: keepTogether(text.slice(last)), at: last });
  return parts;
};

// Every source number a text cites
export const citedIn = (text: string) => richText(text).flatMap((part) => (part.kind === "refs" ? part.numbers : []));
