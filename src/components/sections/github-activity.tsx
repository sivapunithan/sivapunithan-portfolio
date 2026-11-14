import { ArrowLink } from "@/components/ui/button-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { timeAgo } from "@/lib/github";

interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { ref?: string | null; ref_type?: string; action?: string };
}

interface GithubUser {
  public_repos: number;
  followers: number;
}

interface ActivityRow {
  verb: string;
  target: string;
  count: number;
  timeAgo: string;
}

const HEADERS = { Accept: "application/vnd.github+json" };
const REVALIDATE = { next: { revalidate: 3600 } };

/** Plain-language verb for the public event types worth showing; null hides the rest. */
function describe(event: GithubEvent): string | null {
  switch (event.type) {
    case "PushEvent":
      return "Pushed to";
    case "CreateEvent":
      return event.payload.ref_type === "repository" ? "Created" : "Branched";
    case "PublicEvent":
      return "Open-sourced";
    case "PullRequestEvent":
      return event.payload.action === "opened" ? "Opened a pull request in" : null;
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    default:
      return null;
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: HEADERS, ...REVALIDATE });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Consecutive events of the same kind on the same repository collapse into one row. */
function toRows(events: GithubEvent[], username: string): ActivityRow[] {
  const rows: ActivityRow[] = [];

  for (const event of events) {
    const verb = describe(event);
    if (!verb) continue;

    const target = event.repo.name.replace(`${username}/`, "");
    const last = rows[rows.length - 1];

    if (last && last.verb === verb && last.target === target) {
      last.count += 1;
      continue;
    }

    if (rows.length === 5) break;
    rows.push({ verb, target, count: 1, timeAgo: timeAgo(event.created_at) });
  }

  return rows;
}

/**
 * Live GitHub activity from the public API, refreshed hourly. Everything shown is
 * real; if the API is unreachable the panel says so instead of inventing rows.
 */
export async function GithubActivity({ username }: { username: string }) {
  const [events, user] = await Promise.all([
    fetchJson<GithubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=40`),
    fetchJson<GithubUser>(`https://api.github.com/users/${username}`),
  ]);

  const rows = events ? toRows(events, username) : [];

  return (
    <SpotlightCard>
      <div className="p-7 md:p-9">
        <div className="flex items-center justify-between">
          <p className="label text-muted">Recently on GitHub</p>
          <p className="label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="pulse-dot" />
            Live
          </p>
        </div>

        {user && (
          <dl className="mt-8 grid grid-cols-2 border-y border-line">
            <div className="py-6 pr-6">
              <dd className="font-display text-5xl font-light leading-none tracking-[-0.03em] text-primary">
                {user.public_repos}
              </dd>
              <dt className="label mt-3 text-muted">Public repositories</dt>
            </div>
            <div className="border-l border-line py-6 pl-6">
              <dd className="font-display text-5xl font-light leading-none tracking-[-0.03em] text-primary">
                {user.followers}
              </dd>
              <dt className="label mt-3 text-muted">Followers</dt>
            </div>
          </dl>
        )}

        {rows.length > 0 ? (
          <ul>
            {rows.map((row, index) => (
              <li
                key={`${row.verb}-${row.target}-${index}`}
                className="flex items-baseline justify-between gap-5 border-b border-line py-4"
              >
                <p className="min-w-0 text-[0.9375rem] leading-snug text-secondary">
                  {row.verb} <span className="font-medium text-primary">{row.target}</span>
                  {row.count > 1 && <span className="text-muted"> ×{row.count}</span>}
                </p>
                <p className="label shrink-0 text-muted">{row.timeAgo}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-7 text-[0.9375rem] leading-relaxed text-secondary">
            GitHub isn&rsquo;t answering right now — the full history is always on the profile.
          </p>
        )}

        <ArrowLink href={`https://github.com/${username}`} external className="mt-8">
          Open the profile
        </ArrowLink>
      </div>
    </SpotlightCard>
  );
}
