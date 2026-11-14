/** Server-side readers for public GitHub data. Everything is cached for an hour; failures return null. */

const HEADERS = { Accept: "application/vnd.github+json" };
const CACHE = { next: { revalidate: 3600 } } as const;

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: HEADERS, ...CACHE });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

export function timeAgo(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

/** "https://github.com/owner/name" → "owner/name"; null for anything else. */
export function repoFromUrl(url: string): string | null {
  const match = url.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/);
  return match ? match[1] : null;
}

export interface RepoPulseData {
  fullName: string;
  pushedAt: string;
  languages: { name: string; percent: number }[];
}

export async function getRepoPulse(fullName: string): Promise<RepoPulseData | null> {
  const [repo, languages] = await Promise.all([
    getJson<{ pushed_at: string }>(`https://api.github.com/repos/${fullName}`),
    getJson<Record<string, number>>(`https://api.github.com/repos/${fullName}/languages`),
  ]);
  if (!repo) return null;

  const entries = Object.entries(languages ?? {});
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

  return {
    fullName,
    pushedAt: repo.pushed_at,
    languages: entries
      .map(([name, bytes]) => ({ name, percent: total ? Math.round((bytes / total) * 100) : 0 }))
      .filter((entry) => entry.percent > 0)
      .slice(0, 3),
  };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

/** Contribution calendar for the last 12 months (public mirror of the profile graph). */
export async function getContributions(username: string): Promise<ContributionData | null> {
  const data = await getJson<{
    total: Record<string, number>;
    contributions: ContributionDay[];
  }>(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

  if (!data || !data.contributions?.length) return null;
  return { total: Object.values(data.total)[0] ?? 0, days: data.contributions };
}
