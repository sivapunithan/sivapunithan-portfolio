import type { AccentTone } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectPlaceholderProps {
  index: string;
  title: string;
  accent: AccentTone;
}

const ACCENT_BG: Record<AccentTone, string> = {
  blue: "bg-accent-blue/45",
  green: "bg-accent-green/45",
  orange: "bg-accent-orange/45",
  yellow: "bg-accent-yellow/45",
  lavender: "bg-accent-lavender/45",
  neutral: "bg-muted/45",
};

/**
 * Designed stand-in shown while a real screenshot is missing:
 * a quiet editor surface with a line-number gutter, a pseudo-file
 * breadcrumb, and abstract code-like bars. Deterministic — no random
 * values — so server output is stable.
 *
 * Each tuple is [indent level, width fraction, accented?].
 */
const CODE_LINES: ReadonlyArray<readonly [number, string, boolean]> = [
  [0, "w-2/5", false],
  [1, "w-3/5", true],
  [2, "w-1/2", false],
  [2, "w-2/3", false],
  [1, "w-1/4", false],
  [0, "w-0", false],
  [0, "w-1/3", false],
  [1, "w-3/5", false],
  [1, "w-2/5", true],
  [0, "w-1/5", false],
];

const INDENT: Record<number, string> = {
  0: "ml-0",
  1: "ml-6",
  2: "ml-12",
};

function toPseudoFileName(title: string): string {
  return `${title.replace(/[^A-Za-z0-9]/g, "")}.java`;
}

export function ProjectPlaceholder({ index, title, accent }: ProjectPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[16/10] flex-col overflow-hidden border border-edge bg-background-deep transition-colors duration-300 group-hover:border-accent-lavender/35 group-hover:bg-surface"
    >
      {/* Pseudo-file breadcrumb */}
      <div className="flex h-8 shrink-0 items-center border-b border-edge-subtle px-4">
        <p className="truncate font-mono text-[10px] tracking-wide text-muted">
          src <span className="text-muted/60">/</span> projects{" "}
          <span className="text-muted/60">/</span>{" "}
          <span className="text-secondary">{toPseudoFileName(title)}</span>
        </p>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Line-number gutter */}
        <div className="flex w-10 shrink-0 flex-col gap-2.5 border-r border-edge-subtle px-2 pt-5 font-mono text-[9px] leading-none text-muted/50">
          {CODE_LINES.map((_, lineIndex) => (
            <span key={lineIndex} className="text-right">
              {lineIndex + 1}
            </span>
          ))}
        </div>

        {/* Abstract code lines */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-5 pt-5">
          {CODE_LINES.map(([indent, width, accented], lineIndex) => (
            <span
              key={lineIndex}
              className={cn(
                "block h-[5px] rounded-[1px]",
                INDENT[indent],
                width,
                accented ? ACCENT_BG[accent] : "bg-surface-hover",
              )}
            />
          ))}
        </div>
      </div>

      {/* Project signature */}
      <div className="flex items-end justify-between px-5 pb-4">
        <span className="font-display text-4xl font-semibold text-muted/25">{index}</span>
        <span className="truncate pl-4 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          {title}
        </span>
      </div>
    </div>
  );
}
