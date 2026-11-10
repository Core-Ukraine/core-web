import type { ReactNode } from "react";

import { CALLOUTS, type MarkId, PART_NUMBERS, type PartId, PIPES, type ScenarioId, SCENES } from "../../model/plant";

import styles from "./PlantDiagram.module.scss";

interface PlantDiagramProps {
  // The position picked in the list, outlined on the section
  selected?: PartId;
  // The scenario whose flows move and whose parts are outlined
  scenario?: ScenarioId;
  // Picks a position with the pointer
  onPick?: (part: PartId) => void;
}

// A valve drawn as two triangles meeting at a point
const valve = (x: number, y: number) => `M${x - 5} ${y - 6} L${x + 5} ${y - 6} L${x - 5} ${y + 6} L${x + 5} ${y + 6} Z`;

// The star of a leak, drawn from its top point
const BURST = "l4 8 9-2-6 7 7 7-9-1-3 9-4-9-9 2 6-8-7-7 9 2z";

// The larger star of a broken main pipe
const RUPTURE = "l5 10 12-3-8 9 10 9-12-1-3 12-5-12-12 3 8-10-10-9 12 2z";

// The valves on the lines of the tanks, which belong to no numbered position
const VALVES: readonly (readonly [number, number])[] = [
  [265, 360],
  [205, 372],
  [160, 462],
  [232, 356],
];

// The simplified section of AP1000 with its fourteen numbered positions
const PlantDiagram = ({ selected, scenario, onPick }: PlantDiagramProps) => {
  const scene = scenario ? SCENES[scenario] : undefined;
  const marks = new Set<MarkId>(scene?.marks);

  // One position of the section, outlined when picked or at work
  const part = (id: PartId, shapes: ReactNode) => (
    <g
      className={styles.part}
      data-part={id}
      data-active={id === selected || Boolean(scene?.parts.includes(id))}
      onClick={onPick ? () => onPick(id) : undefined}
    >
      {shapes}
    </g>
  );

  return (
    <figure className={styles.figure} aria-label="Спрощений розріз реакторної установки AP1000 з номерами позицій">
      <svg
        className={styles.plant}
        data-mode={scene ? "scenario" : "positions"}
        data-pickable={Boolean(onPick)}
        viewBox="0 0 800 600"
        aria-hidden="true"
        focusable="false"
      >
        <rect className={styles.concrete} x="70" y="540" width="660" height="30" />
        <line className={styles.ground} x1="0" y1="540" x2="800" y2="540" />
        <rect className={styles.flood} data-shown={marks.has("flood")} x="122" y="506" width="556" height="34" />
        <ellipse className={styles.cloud} data-shown={marks.has("steam")} cx="400" cy="200" rx="250" ry="48" />
        {part(
          "sb",
          <>
            <rect className={styles.concrete} x="80" y="205" width="20" height="335" />
            <rect className={styles.concrete} x="700" y="205" width="20" height="335" />
            <rect className={styles.concrete} x="80" y="175" width="20" height="9" />
            <rect className={styles.concrete} x="700" y="175" width="20" height="9" />
            <polygon
              className={styles.concrete}
              points="80,175 330,104 470,104 720,175 720,186 470,116 330,116 80,186"
            />
            <rect className={styles.concrete} x="375" y="24" width="7" height="92" />
            <rect className={styles.concrete} x="418" y="24" width="7" height="92" />
            <line className={styles.baffle} x1="112" y1="206" x2="112" y2="472" />
            <line className={styles.baffle} x1="688" y1="206" x2="688" y2="472" />
          </>,
        )}
        {part(
          "pcs",
          <>
            <rect className={styles.tank} x="330" y="64" width="45" height="40" />
            <rect className={styles.tank} x="425" y="64" width="45" height="40" />
          </>,
        )}
        {part("cv", <path className={styles.steel} d="M120 540 V225 A280 85 0 0 1 680 225 V540" />)}
        <rect className={styles.cavity} x="330" y="384" width="80" height="156" />
        {PIPES.filter((pipe) => !pipe.open).map(({ id, path, kind }) => (
          <path
            key={id}
            className={styles.pipe}
            data-on={Boolean(scene?.flows.includes(id))}
            data-kind={kind}
            d={path}
          />
        ))}
        {part(
          "irwst",
          <>
            <rect className={styles.tank} x="135" y="240" width="90" height="100" />
            <line className={styles.thin} x1="165" y1="268" x2="185" y2="268" />
          </>,
        )}
        {part("prhr", <path className={styles.tube} d="M200 252 H150 V330 H200" />)}
        {part("cmt", <rect className={styles.vessel} x="245" y="245" width="40" height="70" rx="16" />)}
        {part("acc", <circle className={styles.vessel} cx="290" cy="462" r="20" />)}
        {part(
          "rpv",
          <>
            <path
              className={styles.vessel}
              d="M345 302 Q345 290 370 290 Q395 290 395 302 V452 A25 24 0 0 1 345 452 Z"
            />
            <line className={styles.thin} x1="357" y1="290" x2="357" y2="276" />
            <line className={styles.thin} x1="365" y1="290" x2="365" y2="274" />
            <line className={styles.thin} x1="375" y1="290" x2="375" y2="274" />
            <line className={styles.thin} x1="383" y1="290" x2="383" y2="276" />
          </>,
        )}
        {part("core", <rect className={styles.core} x="353" y="396" width="34" height="56" />)}
        {part("pzr", <rect className={styles.vessel} x="440" y="228" width="32" height="92" rx="14" />)}
        {part(
          "sg",
          <>
            <path
              className={styles.vessel}
              d="M512 224 Q512 212 550 212 Q588 212 588 224 V300 L578 318 V430 A28 22 0 0 1 522 430 V318 L512 300 Z"
            />
            <path className={styles.thin} d="M532 428 V342 Q550 322 568 342 V428" />
            <path className={styles.thin} d="M540 428 V348 Q550 336 560 348 V428" />
          </>,
        )}
        {part(
          "rcp",
          <>
            <rect className={styles.vessel} x="545" y="448" width="32" height="12" rx="3" />
            <rect className={styles.vessel} x="550" y="460" width="22" height="30" rx="4" />
          </>,
        )}
        {part(
          "recirc",
          <>
            <rect className={styles.valve} x="148" y="520" width="26" height="12" />
            {[152, 158, 164, 170].map((x) => (
              <line key={x} className={styles.thin} x1={x} y1="520" x2={x} y2="532" />
            ))}
          </>,
        )}
        {part(
          "ads",
          <>
            <path className={styles.valve} d={valve(458, 216)} />
            <path className={styles.valve} d={valve(322, 334)} />
          </>,
        )}
        {VALVES.map(([x, y]) => (
          <path key={`${x},${y}`} className={styles.valve} d={valve(x, y)} />
        ))}
        {PIPES.map(({ id, path, kind }) => (
          <path
            key={id}
            className={styles.flow}
            data-on={Boolean(scene?.flows.includes(id))}
            data-kind={kind}
            d={path}
          />
        ))}
        <path className={styles.burst} data-shown={marks.has("leak")} d={`M480 470${BURST}`} />
        <path className={styles.burst} data-shown={marks.has("rupture")} d={`M455 335${RUPTURE}`} />
        <path className={styles.burst} data-shown={marks.has("tube")} d={`M550 372${BURST}`} />
        <text className={styles.caption} x="296" y="393">
          ← петля 2
        </text>
        <text className={styles.caption} x="726" y="233">
          до турбіни
        </text>
        <text className={styles.caption} x="726" y="293">
          живл. вода
        </text>
        <text className={styles.caption} x="12" y="186">
          повітря
        </text>
        <text className={styles.caption} x="12" y="592">
          Схема не в масштабі
        </text>
        {CALLOUTS.map(({ part: id, x, y, to }) => (
          <g key={id} className={styles.callout}>
            {to ? <line x1={x} y1={y} x2={to[0]} y2={to[1]} /> : null}
            <circle cx={x} cy={y} r="10" />
            <text x={x} y={y + 4} textAnchor="middle">
              {PART_NUMBERS[id]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
};

export default PlantDiagram;
