import { getContributions } from "@/lib/github";

const LEVEL_FILL = [
  "var(--line)",
  "color-mix(in srgb, var(--accent) 32%, transparent)",
  "color-mix(in srgb, var(--accent) 55%, transparent)",
  "color-mix(in srgb, var(--accent) 78%, transparent)",
  "var(--accent)",
] as const;

const CELL = 11;
const GAP = 3;

/** The last 12 months of public contributions, drawn as the familiar week-by-day calendar. */
export async function ContributionGraph({ username }: { username: string }) {
  const data = await getContributions(username);
  if (!data) return null;

  const firstWeekday = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array<null>(firstWeekday).fill(null), ...data.days];
  const weeks = Math.ceil(cells.length / 7);
  const width = weeks * (CELL + GAP) - GAP;
  const height = 7 * (CELL + GAP) - GAP;
  const activeDays = data.days.filter((day) => day.count > 0).length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-4xl font-light tracking-[-0.02em] text-primary">
          {data.total}
          <span className="label ml-3 text-muted">contributions, last 12 months</span>
        </p>
        <p className="label hidden text-muted sm:block">{activeDays} active days</p>
      </div>
      <div className="mt-5 overflow-x-auto" data-lenis-prevent-wheel>
        <svg
          role="img"
          aria-label={`${data.total} contributions over the last 12 months, on ${activeDays} days`}
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[44rem]"
        >
          {cells.map((day, index) =>
            day ? (
              <rect
                key={day.date}
                x={Math.floor(index / 7) * (CELL + GAP)}
                y={(index % 7) * (CELL + GAP)}
                width={CELL}
                height={CELL}
                rx={2.5}
                fill={LEVEL_FILL[day.level]}
              >
                <title>{`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}</title>
              </rect>
            ) : null,
          )}
        </svg>
      </div>
    </div>
  );
}
