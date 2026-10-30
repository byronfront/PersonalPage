/**
 * BC monogram geometry on a 64-unit square:
 *  - B: one closed stroke. Stem x=10, bowls of radius 11 meeting at y=32.
 *  - C: circle centred at (32,32), radius 22, open 42° each side of the
 *    horizontal axis. Its leftmost point is tangent to the B stem exactly
 *    where the bowls meet: the joint, marked in copper.
 */
export const MONOGRAM_PATHS = {
  c: "M48.35 17.28A22 22 0 1 0 48.35 46.72",
  b: "M10 32V10H17A11 11 0 0 1 17 32H19.5A11 11 0 0 1 19.5 54H10Z",
  joint: { x: 7.6, y: 29.6, size: 4.8 },
} as const;
