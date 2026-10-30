import type { ReactNode } from "react";
import styles from "./ArrowLink.module.css";

type Props = {
  href: string;
  children: ReactNode;
  direction?: "right" | "down" | "up" | "out";
  variant?: "primary" | "quiet";
  external?: boolean;
  newTabLabel?: string;
  className?: string;
};

const paths: Record<NonNullable<Props["direction"]>, string> = {
  right: "M1 8h13M9 3l5 5-5 5",
  down: "M8 1v13M3 9l5 5 5-5",
  up: "M8 15V2M3 7l5-5 5 5",
  out: "M3 13L13 3M5 3h8v8",
};

export function ArrowLink({
  href,
  children,
  direction = "right",
  variant = "quiet",
  external = false,
  newTabLabel,
  className,
}: Props) {
  return (
    <a
      href={href}
      className={[styles.link, styles[variant], styles[direction], className ?? ""].join(" ")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.text}>{children}</span>
      {external && newTabLabel && <span className="visually-hidden"> ({newTabLabel})</span>}
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d={paths[direction]} />
        </svg>
      </span>
    </a>
  );
}
