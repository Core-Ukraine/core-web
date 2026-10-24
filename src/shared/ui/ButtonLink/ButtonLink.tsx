import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/shared/lib/cx";
import type { Path } from "@/shared/lib/path";

import Icon from "../Icon/Icon";

import styles from "./ButtonLink.module.scss";

interface ButtonLinkProps {
  href: Path;
  children: ReactNode;
  variant?: "primary" | "light";
  compact?: boolean;
  arrow?: boolean;
  className?: string;
}

// A link that looks like the red or the white button of the design
const ButtonLink = ({
  href,
  children,
  variant = "primary",
  compact = false,
  arrow = false,
  className,
}: ButtonLinkProps) => (
  <Link href={href} className={cx(styles[variant], compact && styles.compact, className)}>
    {children}
    {arrow ? <Icon name="arrow" size={18} /> : null}
  </Link>
);

export default ButtonLink;
