import styles from "./StructureOverlay.module.css";

/** Static grid overlay. Visible only when <html data-structure="on">. */
export function StructureOverlay({ label }: { label: string }) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={`container grid ${styles.grid}`}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={styles.col} style={{ ["--c" as string]: i }}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
          </span>
        ))}
      </div>
      <p className={styles.caption}>{label}</p>
    </div>
  );
}
