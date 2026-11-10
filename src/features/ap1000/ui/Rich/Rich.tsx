import { Fragment } from "react";

import { richText } from "../../model/rich";
import { sourceOf } from "../../model/sources";

import styles from "./Rich.module.scss";

// The numbers of the sources behind a sentence, each a link to its source
const Refs = ({ numbers }: { numbers: readonly number[] }) => (
  <sup className={styles.refs}>
    {numbers.map((number, index) => {
      const source = sourceOf(number);
      return (
        <Fragment key={number}>
          {index > 0 ? "," : null}
          <a
            className={styles.ref}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={source.title}
            aria-label={`Джерело ${number}`}
          >
            {number}
          </a>
        </Fragment>
      );
    })}
  </sup>
);

// A text of the course with its source numbers and technical terms
const Rich = ({ text }: { text: string }) =>
  richText(text).map((part) => {
    switch (part.kind) {
      case "text":
        return <Fragment key={part.at}>{part.text}</Fragment>;
      case "refs":
        return <Refs key={part.at} numbers={part.numbers} />;
      case "term":
        return (
          <span key={part.at} className={styles.term}>
            {part.text}
          </span>
        );
    }
  });

export default Rich;
