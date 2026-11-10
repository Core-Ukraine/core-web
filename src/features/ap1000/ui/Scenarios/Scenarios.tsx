import { FIRST_SCENARIO, type Scenario, SCENARIOS } from "../../model/scenarios";
import { videoOf, videoUrl } from "../../model/videos";
import Figure from "../Figure/Figure";
import Rich from "../Rich/Rich";
import ScenarioPicker from "../ScenarioPicker/ScenarioPicker";

import styles from "./Scenarios.module.scss";

// One scenario: the NRC drawings, what happens step by step and the videos
const ScenarioDetails = ({ scenario }: { scenario: Scenario }) => (
  <div className={styles.card}>
    <div className={styles.drawings}>
      {scenario.drawings.map(([drawing, note]) => (
        <Figure key={drawing} drawing={drawing} note={note} size="half" />
      ))}
    </div>
    <div className={styles.story}>
      <p className={styles.summary}>
        <Rich text={scenario.summary} />
      </p>
      <ol className={styles.steps} aria-label="Послідовність подій">
        {scenario.steps.map(([time, step]) => (
          <li key={time} className={styles.step}>
            <span className={styles.time}>{time}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className={styles.videos}>
        <h4 className={styles.label}>Відео до сценарію</h4>
        <ul className={styles.links}>
          {scenario.videos.map((id) => (
            <li key={id}>
              <a href={videoUrl(id)} target="_blank" rel="noopener noreferrer">
                {videoOf(id).title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// The accident scenarios of module 4 with the switch between them
const Scenarios = () => (
  <ScenarioPicker
    first={FIRST_SCENARIO}
    scenarios={SCENARIOS.map((scenario) => ({
      id: scenario.id,
      name: scenario.name,
      details: <ScenarioDetails scenario={scenario} />,
    }))}
  />
);

export default Scenarios;
