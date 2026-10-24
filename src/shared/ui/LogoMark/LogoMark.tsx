import styles from "./LogoMark.module.scss";

interface LogoMarkProps {
  className?: string;
}

// Six fuel rods around the centre of the mark
const RODS = [
  [28.5, 20],
  [24.25, 27.36],
  [15.75, 27.36],
  [11.5, 20],
  [15.75, 12.64],
  [24.25, 12.64],
] as const;

// The mark alone: a hexagonal fuel assembly with six rods and the red central tube
const LogoMark = ({ className }: LogoMarkProps) => (
  <svg className={className} viewBox="0 0 40 40" width={40} height={40} aria-hidden="true" focusable="false">
    <polygon
      points="38,20 29,35.6 11,35.6 2,20 11,4.4 29,4.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <g fill="none" stroke="currentColor" strokeWidth="1.6">
      {RODS.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={x} cy={y} r="2.6" />
      ))}
    </g>
    <circle className={styles.core} cx="20" cy="20" r="3.4" />
  </svg>
);

export default LogoMark;
