import { PART_NUMBERS } from "../../model/plant";
import { type Position, POSITIONS } from "../../model/positions";
import Figure from "../Figure/Figure";
import PositionPicker from "../PositionPicker/PositionPicker";
import Rich from "../Rich/Rich";

import styles from "./Positions.module.scss";

// What the course says about one position, with its numbers and drawing
const PositionDetails = ({ position }: { position: Position }) => (
  <>
    <h4 className={styles.name}>{`Поз. ${PART_NUMBERS[position.id]}. ${position.name}`}</h4>
    <p className={styles.text}>
      <Rich text={position.text} />
    </p>
    <dl className={styles.facts}>
      {position.facts.map(([label, value]) => (
        <div key={label} className={styles.fact}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
    {position.drawing ? <Figure drawing={position.drawing} size="small" /> : null}
  </>
);

// The equipment of the unit: the NRC section and a description of every position
const Positions = () => (
  <PositionPicker
    first="rpv"
    drawing={<Figure drawing="f1_2" />}
    positions={POSITIONS.map((position) => ({
      id: position.id,
      number: PART_NUMBERS[position.id],
      name: position.name,
      details: <PositionDetails position={position} />,
    }))}
  />
);

export default Positions;
