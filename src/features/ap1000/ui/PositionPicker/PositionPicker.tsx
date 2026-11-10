"use client";

import { type ReactNode, useId, useState } from "react";

import type { PartId } from "../../model/plant";
import Fold from "../Fold/Fold";
import PlantDiagram from "../PlantDiagram/PlantDiagram";

import styles from "./PositionPicker.module.scss";

export interface PositionEntry {
  id: PartId;
  number: number;
  name: string;
  // The description, the numbers and the drawing of the position
  details: ReactNode;
}

interface PositionPickerProps {
  positions: readonly PositionEntry[];
  first: PartId;
  // The NRC section beside the list
  drawing: ReactNode;
}

// The equipment: pick a position to read about it and see it on the section
const PositionPicker = ({ positions, first, drawing }: PositionPickerProps) => {
  const [selected, setSelected] = useState(first);
  const id = useId();
  return (
    <>
      <Fold
        title="Спрощена схема з номерами позицій"
        legend={[
          { kind: "hot", label: "гаряча нитка" },
          { kind: "cold", label: "холодна нитка" },
          { kind: "water", label: "вода пасивних систем, живильна вода" },
          { kind: "steam", label: "пара, скидання тиску" },
        ]}
        note="Схема спрощена і не в масштабі: показано одну петлю з двох, один ПГ і один ГЦН замість двох; трубопроводи другої петлі обірвано."
      >
        <PlantDiagram selected={selected} onPick={setSelected} />
      </Fold>
      <div className={styles.box}>
        <div className={styles.drawing}>{drawing}</div>
        <div className={styles.side}>
          <ul className={styles.list} aria-label="Перелік обладнання">
            {positions.map((position) => (
              <li key={position.id}>
                <button
                  type="button"
                  className={styles.pick}
                  aria-pressed={position.id === selected}
                  aria-controls={`${id}-${position.id}`}
                  onClick={() => setSelected(position.id)}
                >
                  <span className={styles.number}>{position.number}</span> {position.name}
                </button>
              </li>
            ))}
          </ul>
          {positions.map((position) => (
            <div
              key={position.id}
              id={`${id}-${position.id}`}
              className={styles.details}
              hidden={position.id !== selected}
            >
              {position.details}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PositionPicker;
