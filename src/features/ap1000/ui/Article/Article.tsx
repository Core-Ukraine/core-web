import { type Block, blockKey, PARAMETERS } from "../../model/course";
import { COUNTS } from "../../model/history";
import Figure from "../Figure/Figure";
import Fleet from "../Fleet/Fleet";
import Positions from "../Positions/Positions";
import PowerCycle from "../PowerCycle/PowerCycle";
import Quiz from "../Quiz/Quiz";
import Rich from "../Rich/Rich";
import Scenarios from "../Scenarios/Scenarios";
import Sources from "../Sources/Sources";
import Timeline from "../Timeline/Timeline";
import Videos from "../Videos/Videos";

import styles from "./Article.module.scss";

// One block of a module: text, a heading, a drawing or a part to work with
const BlockView = ({ block }: { block: Block }) => {
  switch (block.kind) {
    case "text":
      return (
        <div className={styles.prose}>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      );
    case "points":
      return (
        <ul className={styles.points}>
          {block.points.map((point) => (
            <li key={point.lead}>
              <strong>{point.lead}</strong> <Rich text={point.text} />
            </li>
          ))}
        </ul>
      );
    case "heading":
      return <h3 className={styles.heading}>{block.text}</h3>;
    case "subheading":
      return <h4 className={styles.subheading}>{block.text}</h4>;
    case "part":
      return <p className={styles.part}>{block.text}</p>;
    case "note":
      return (
        <p className={styles.note}>
          <Rich text={block.text} />
        </p>
      );
    case "drawing":
      return <Figure drawing={block.drawing} note={block.note} />;
    case "glossary":
      return (
        <section className={styles.glossary} aria-label={block.label}>
          <p className={styles.glossaryTitle}>Позначення на кресленні</p>
          <dl className={styles.terms}>
            {block.terms.map(({ term, meaning }) => (
              <div key={term} className={styles.entry}>
                <dt>{term}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "chain":
      return (
        <ol className={styles.chain} aria-label={block.label}>
          {block.links.map(({ name, note }) => (
            <li key={name} className={styles.link}>
              <span className={styles.stage}>
                {name}
                {note ? <small>{note}</small> : null}
              </span>
            </li>
          ))}
        </ol>
      );
    case "parameters":
      return (
        <table className={styles.parameters}>
          <thead>
            <tr>
              <th scope="col">Параметр</th>
              <th scope="col">Значення</th>
            </tr>
          </thead>
          <tbody>
            {PARAMETERS.map(([name, value]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>
                  <Rich text={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "counts":
      return (
        <ul className={styles.counts}>
          {COUNTS.map(({ value, text }) => (
            <li key={value} className={styles.count}>
              <strong>{value}</strong>
              <span>
                <Rich text={text} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "cycle":
      return <PowerCycle />;
    case "positions":
      return <Positions />;
    case "scenarios":
      return <Scenarios />;
    case "timeline":
      return <Timeline />;
    case "fleet":
      return <Fleet />;
    case "videos":
      return <Videos />;
    case "sources":
      return <Sources />;
    case "quiz":
      return <Quiz />;
  }
};

// The blocks of a module one after another
const Article = ({ blocks }: { blocks: readonly Block[] }) => (
  <div className={styles.article}>
    {blocks.map((block) => (
      <BlockView key={blockKey(block)} block={block} />
    ))}
  </div>
);

export default Article;
