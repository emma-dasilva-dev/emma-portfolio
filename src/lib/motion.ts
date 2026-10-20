/**
 * Shared motion state for the scroll choreography.
 *
 * The DOM side (scroll, pointer) writes plain numbers here; the WebGL render
 * loop reads them every frame and damps the headphones toward the matching
 * pose. Nothing in this module triggers React renders.
 */

export type Layout = "wide" | "medium" | "compact";

/** One composition "station" for the headphones. */
export type Pose = {
  /** Horizontal centre as a fraction of the half-width of the view (-1 = left edge, 1 = right edge). */
  x: number;
  /** Vertical centre as a fraction of the half-height of the view (-1 = bottom, 1 = top). */
  y: number;
  /** Depth offset in world units (negative = further away). */
  z: number;
  /** Size of the headphones as a fraction of the visible view height. */
  size: number;
  rx: number;
  ry: number;
  rz: number;
};

const TAU = Math.PI * 2;

/**
 * One pose per section: Accueil, À propos, Compétences, Contact.
 * The object makes a single, deliberate revolution across the page and lands
 * back on its opening angle beside the contact call to action. Each pose sits
 * on the side of the viewport the section's copy leaves empty.
 */
export const POSES: Record<Layout, Pose[]> = {
  wide: [
    { x: 0.36, y: 0.0, z: 0, size: 0.62, rx: 0.16, ry: -0.58, rz: 0.05 },
    { x: -0.5, y: 0.0, z: -0.4, size: 0.5, rx: 0.08, ry: 1.2, rz: -0.08 },
    { x: 0.56, y: 0.0, z: -0.6, size: 0.42, rx: 0.62, ry: 3.3, rz: 0.12 },
    { x: 0.5, y: 0.02, z: 0, size: 0.46, rx: 0.12, ry: TAU - 0.58, rz: 0.04 },
  ],
  medium: [
    { x: 0.22, y: 0.4, z: 0, size: 0.36, rx: 0.16, ry: -0.58, rz: 0.05 },
    { x: 0.8, y: 0.06, z: -0.4, size: 0.34, rx: 0.08, ry: 1.2, rz: -0.08 },
    { x: 0.84, y: -0.04, z: -0.6, size: 0.3, rx: 0.62, ry: 3.3, rz: 0.12 },
    { x: 0.8, y: 0.1, z: 0, size: 0.34, rx: 0.12, ry: TAU - 0.58, rz: 0.04 },
  ],
  // On phones the canvas only covers the top of the hero and scrolls away
  // with it, so the poses describe a short turn rather than a journey.
  compact: [
    { x: 0, y: -0.02, z: 0, size: 0.74, rx: 0.16, ry: -0.58, rz: 0.05 },
    { x: 0, y: 0.06, z: -0.3, size: 0.62, rx: 0.32, ry: 0.5, rz: -0.06 },
    { x: 0, y: 0.06, z: -0.3, size: 0.62, rx: 0.32, ry: 0.5, rz: -0.06 },
    { x: 0, y: 0.06, z: -0.3, size: 0.62, rx: 0.32, ry: 0.5, rz: -0.06 },
  ],
};

/** Must match the media queries in page.module.css. */
export function layoutFor(width: number, height: number): Layout {
  if (width < 720) return "compact";
  if (width < 1024 || width / height <= 1.1) return "medium";
  return "wide";
}

export const motion = {
  /** Continuous section index: 0 = hero settled, 1 = about settled, … */
  progress: 0,
  /** Pointer position in [-1, 1], 0 when there is no fine pointer. */
  pointerX: 0,
  pointerY: 0,
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Writes the pose for a given continuous progress into `out`. */
export function samplePose(poses: Pose[], progress: number, out: Pose): Pose {
  const last = poses.length - 1;
  const clamped = Math.min(Math.max(progress, 0), last);
  const index = Math.min(Math.floor(clamped), last - 1);
  const t = easeInOut(clamped - index);
  const a = poses[index];
  const b = poses[index + 1];
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
  out.size = a.size + (b.size - a.size) * t;
  out.rx = a.rx + (b.rx - a.rx) * t;
  out.ry = a.ry + (b.ry - a.ry) * t;
  out.rz = a.rz + (b.rz - a.rz) * t;
  return out;
}
