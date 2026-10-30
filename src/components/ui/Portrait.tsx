import type { Portrait as PortraitData } from "@/content/profile";
import styles from "./Portrait.module.css";

type Props = {
  portrait: PortraitData;
  alt: string;
  figure: string;
  pending: string;
  className?: string;
};

/**
 * Portrait slot with a fixed 4:5 frame. Without a photo it shows the
 * construction drawing of the monogram — a placeholder that never stands
 * in for a person.
 */
export function Portrait({ portrait, alt, figure, pending, className }: Props) {
  const hasPhoto = Boolean(portrait.src);

  return (
    <figure className={[styles.figure, className ?? ""].join(" ")} data-spec="4:5 · object-fit: cover">
      <div className={styles.frame}>
        {hasPhoto ? (
          <picture>
            <source type="image/avif" srcSet={`${portrait.src}-800.avif 800w`} sizes="(min-width: 1024px) 30vw, 70vw" />
            <source
              type="image/webp"
              srcSet={`${portrait.src}-800.webp 800w, ${portrait.src}-1400.webp 1400w`}
              sizes="(min-width: 1024px) 30vw, 70vw"
            />
            <img
              src={`${portrait.src}-1400.webp`}
              alt={alt}
              width={portrait.width}
              height={portrait.height}
              className={styles.photo}
              style={{ objectPosition: portrait.focus }}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        ) : (
          <Construction />
        )}
        <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
      </div>
      <figcaption className={styles.caption}>
        <span className={`t-mono ${styles.fig}`}>{figure}</span>
        <span className={styles.pending}>{hasPhoto ? alt : pending}</span>
      </figcaption>
    </figure>
  );
}

/** Technical drawing of the BC monogram on its construction grid. */
function Construction() {
  return (
    <svg className={styles.construction} viewBox="0 0 400 500" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g className={styles.gridLines}>
        {[80, 160, 240, 320].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
        ))}
        {[100, 200, 300, 400].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>

      {/* Construction geometry, scale 5.6 units → 1 monogram unit */}
      <g transform="translate(20 70) scale(5.6)">
        <g className={styles.guides}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="17" cy="21" r="11" />
          <circle cx="19.5" cy="43" r="11" />
          <line x1="-4" y1="32" x2="62" y2="32" />
          <line x1="10" y1="2" x2="10" y2="62" />
          <line x1="32" y1="32" x2="48.35" y2="17.28" />
          <line x1="32" y1="32" x2="48.35" y2="46.72" />
        </g>
        <g className={styles.ink}>
          <path d="M48.35 17.28A22 22 0 1 0 48.35 46.72" />
          <path d="M10 32V10H17A11 11 0 0 1 17 32H19.5A11 11 0 0 1 19.5 54H10Z" />
        </g>
        <rect className={styles.joint} x="7.6" y="29.6" width="4.8" height="4.8" />
      </g>

      <g className={styles.labels}>
        <text x="24" y="40">BC / 64u</text>
        <text x="24" y="476">r 22u · 42°</text>
        <text x="376" y="476" textAnchor="end">x 10 · y 32</text>
      </g>
    </svg>
  );
}
