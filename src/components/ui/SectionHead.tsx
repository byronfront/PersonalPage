import styles from "./SectionHead.module.css";

type Props = {
  index: string;
  label: string;
  /** Optional right-aligned note in the running head. */
  aside?: string;
};

/** Running head of every section: a drawn hairline, the index and the label. */
export function SectionHead({ index, label, aside }: Props) {
  return (
    <div className={styles.head}>
      <span className="rule rule--strong" data-reveal="rule" aria-hidden="true" />
      <div className={styles.row}>
        <p className={`t-mono ${styles.label}`}>
          <span className={styles.index}>{index}</span>
          <span aria-hidden="true" className={styles.slash}>
            /
          </span>
          <span>{label}</span>
        </p>
        {aside && <p className={`t-mono t-faint ${styles.aside}`}>{aside}</p>}
      </div>
    </div>
  );
}
