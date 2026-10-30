import { MONOGRAM_PATHS } from "./geometry";
import styles from "./Monogram.module.css";

type Props = {
  className?: string;
  /** Accessible name. Omit when the mark is decorative. */
  title?: string;
  /** Draw the strokes on first paint. */
  draw?: boolean;
  /** Hide the copper joint (e.g. on very small sizes). */
  plain?: boolean;
};

export function Monogram({ className, title, draw = false, plain = false }: Props) {
  const { c, b, joint } = MONOGRAM_PATHS;
  return (
    <svg
      viewBox="0 0 64 64"
      className={[styles.mark, draw ? styles.draw : "", className ?? ""].join(" ")}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path className={styles.c} d={c} pathLength={1} />
      <path className={styles.b} d={b} pathLength={1} />
      {!plain && (
        <rect
          className={styles.joint}
          x={joint.x}
          y={joint.y}
          width={joint.size}
          height={joint.size}
        />
      )}
    </svg>
  );
}
