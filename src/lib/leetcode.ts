/** Public LeetCode stats via its GraphQL endpoint (no key needed). Cached for an hour; null on any failure. */

export interface LeetCodeStats {
  username: string;
  solved: { all: number; easy: number; medium: number; hard: number };
  streak: number;
  activeDays: number;
}

const QUERY = `query q($u: String!) {
  matchedUser(username: $u) {
    submitStats { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays }
  }
}`;

interface Response {
  data?: {
    matchedUser: {
      submitStats: { acSubmissionNum: { difficulty: string; count: number }[] };
      userCalendar: { streak: number; totalActiveDays: number };
    } | null;
  };
}

export async function getLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { u: username } }),
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;

    const user = ((await response.json()) as Response).data?.matchedUser;
    if (!user) return null;

    const count = (difficulty: string) =>
      user.submitStats.acSubmissionNum.find((entry) => entry.difficulty === difficulty)?.count ?? 0;

    return {
      username,
      solved: { all: count("All"), easy: count("Easy"), medium: count("Medium"), hard: count("Hard") },
      streak: user.userCalendar.streak,
      activeDays: user.userCalendar.totalActiveDays,
    };
  } catch {
    return null;
  }
}
