"use client";

import { type ReactNode, useId, useState } from "react";

import type { ScenarioId } from "../../model/plant";
import Fold from "../Fold/Fold";
import PlantDiagram from "../PlantDiagram/PlantDiagram";

import styles from "./ScenarioPicker.module.scss";

export interface ScenarioEntry {
  id: ScenarioId;
  name: string;
  // The drawings, the sequence of events and the videos of the scenario
  details: ReactNode;
}

interface ScenarioPickerProps {
  scenarios: readonly ScenarioEntry[];
  first: ScenarioId;
}

// The accident scenarios: pick one to see its drawings, its events and its flows
const ScenarioPicker = ({ scenarios, first }: ScenarioPickerProps) => {
  const [current, setCurrent] = useState(first);
  const id = useId();
  return (
    <>
      <fieldset className={styles.tabs}>
        <legend className="visually-hidden">Сценарій</legend>
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            className={styles.tab}
            aria-pressed={scenario.id === current}
            aria-controls={`${id}-${scenario.id}`}
            onClick={() => setCurrent(scenario.id)}
          >
            {scenario.name}
          </button>
        ))}
      </fieldset>
      {scenarios.map((scenario) => (
        <div key={scenario.id} id={`${id}-${scenario.id}`} className={styles.details} hidden={scenario.id !== current}>
          {scenario.details}
        </div>
      ))}
      <Fold
        title="Спрощена схема з анімацією потоків"
        legend={[
          { kind: "hot", label: "гаряча вода" },
          { kind: "cold", label: "охолоджена вода" },
          { kind: "water", label: "вода з баків" },
          { kind: "steam", label: "пара" },
          { kind: "air", label: "повітря" },
          { kind: "leak", label: "місце течі" },
        ]}
      >
        <PlantDiagram scenario={current} />
      </Fold>
    </>
  );
};

export default ScenarioPicker;
