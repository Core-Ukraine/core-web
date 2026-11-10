import Image from "next/image";

import { DRAWINGS, type DrawingId } from "../../model/figures";
import Zoom from "../Zoom/Zoom";

import styles from "./Figure.module.scss";

export type FigureSize = "wide" | "half" | "small";

interface FigureProps {
  drawing: DrawingId;
  // What to look at on the drawing in this place of the course
  note?: string;
  size?: FigureSize;
}

// How wide the drawing is drawn, so the browser picks a fitting file
const SIZES: Readonly<Record<FigureSize, string>> = {
  wide: "(min-width: 1024px) 860px, 100vw",
  half: "(min-width: 1024px) 430px, 100vw",
  small: "(min-width: 1024px) 320px, 80vw",
};

// A drawing from the NRC course on paper, with its caption, labels and source
const Figure = ({ drawing, note, size = "wide" }: FigureProps) => {
  const { image, width, height, title, number, document, note: about, terms } = DRAWINGS[drawing];
  const alt = `${title} (NRC, ${number})`;
  return (
    <figure className={styles.figure} data-size={size}>
      <Zoom
        title={`${title} · NRC, ${number}`}
        full={<Image src={image} width={width} height={height} alt={alt} sizes="96vw" />}
      >
        <Image className={styles.image} src={image} width={width} height={height} alt={alt} sizes={SIZES[size]} />
      </Zoom>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{title}</span>
        {note ? <span>{note}</span> : null}
        {about ? <span>{about}</span> : null}
        {terms ? (
          <span className={styles.terms}>
            {terms.map(({ term, meaning }) => (
              <span key={term} className={styles.pair}>
                <span className={styles.term}>{term}</span> {meaning}
              </span>
            ))}
          </span>
        ) : null}
        {document ? (
          <span className={styles.source}>
            NRC, навчальний курс AP1000, {number} ·{" "}
            <a href={document} target="_blank" rel="noopener noreferrer">
              PDF
            </a>
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
};

export default Figure;
