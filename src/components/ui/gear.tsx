interface GearProps {
  teeth?: number;
  spokes?: number;
  className?: string;
}

const OUTER = 96;
const ROOT = 82;

const point = (radius: number, angle: number) =>
  `${(Math.cos(angle) * radius).toFixed(2)} ${(Math.sin(angle) * radius).toFixed(2)}`;

/** Outline of a spur gear: each tooth is a flank up, a tip arc, a flank down, then a root arc. */
function gearOutline(teeth: number): string {
  const step = (Math.PI * 2) / teeth;
  const commands: string[] = [`M${point(ROOT, 0)}`];

  for (let index = 0; index < teeth; index += 1) {
    const start = index * step;
    commands.push(
      `L${point(OUTER, start + step * 0.16)}`,
      `A${OUTER} ${OUTER} 0 0 1 ${point(OUTER, start + step * 0.4)}`,
      `L${point(ROOT, start + step * 0.56)}`,
      `A${ROOT} ${ROOT} 0 0 1 ${point(ROOT, start + step)}`,
    );
  }

  return `${commands.join("")}Z`;
}

/**
 * Line-drawn brass gear used as scroll-driven decoration. Rendered on the server
 * (pass it as children to ScrollRotate) so its geometry is never recomputed in the browser.
 */
export function Gear({ teeth = 16, spokes = 6, className }: GearProps) {
  const spokeAngles = Array.from({ length: spokes }, (_, index) => (index * Math.PI * 2) / spokes);

  return (
    <svg
      viewBox="-100 -100 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      className={className}
    >
      <path d={gearOutline(teeth)} vectorEffect="non-scaling-stroke" />
      <circle r={66} vectorEffect="non-scaling-stroke" />
      <circle r={20} vectorEffect="non-scaling-stroke" />
      <circle r={7} vectorEffect="non-scaling-stroke" />
      {spokeAngles.map((angle) => (
        <path
          key={angle}
          d={`M${point(20, angle)}L${point(66, angle)}`}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
