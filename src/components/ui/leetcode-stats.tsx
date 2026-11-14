import { ArrowLink } from "@/components/ui/button-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getLeetCodeStats } from "@/lib/leetcode";

/** Real problem-solving numbers from the public LeetCode profile; renders nothing if it can't be read. */
export async function LeetCodeStats({ username }: { username: string }) {
  const stats = await getLeetCodeStats(username);
  if (!stats) return null;

  const levels = [
    { label: "Easy", value: stats.solved.easy },
    { label: "Medium", value: stats.solved.medium },
    { label: "Hard", value: stats.solved.hard },
  ];

  return (
    <SpotlightCard>
      <div className="p-7 md:p-9">
        <div className="flex items-center justify-between">
          <p className="label text-muted">On LeetCode</p>
          <p className="label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="pulse-dot" />
            Live
          </p>
        </div>

        <p className="mt-8 font-display text-[clamp(4rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] text-primary">
          {stats.solved.all}
        </p>
        <p className="label mt-3 text-muted">Problems solved</p>

        <dl className="mt-8 grid grid-cols-3 border-y border-line">
          {levels.map((level, index) => (
            <div key={level.label} className={index > 0 ? "border-l border-line py-5 pl-5" : "py-5 pr-5"}>
              <dd className="font-display text-3xl font-light tracking-[-0.02em] text-primary">
                {level.value}
              </dd>
              <dt className="label mt-2 text-muted">{level.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-[0.9375rem] leading-relaxed text-secondary">
          A {stats.streak}-day streak, {stats.activeDays} active days in the last year.
        </p>

        <ArrowLink href={`https://leetcode.com/u/${username}/`} external className="mt-7">
          Open the profile
        </ArrowLink>
      </div>
    </SpotlightCard>
  );
}
