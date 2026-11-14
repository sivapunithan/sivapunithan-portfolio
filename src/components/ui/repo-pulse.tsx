import { getRepoPulse, repoFromUrl, timeAgo } from "@/lib/github";
import { cn } from "@/lib/utils";

/**
 * Live facts about a project's repository, read from the GitHub API: when it was last
 * pushed and what it's written in. Renders nothing if the project has no public repo
 * or the API doesn't answer — it never shows made-up numbers.
 */
export async function RepoPulse({ repoUrl, className }: { repoUrl?: string; className?: string }) {
  const fullName = repoUrl ? repoFromUrl(repoUrl) : null;
  if (!fullName) return null;

  const pulse = await getRepoPulse(fullName);
  if (!pulse) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      <p className="label flex items-center gap-3 text-secondary">
        <span aria-hidden="true" className="pulse-dot" />
        Last push {timeAgo(pulse.pushedAt)}
      </p>
      {pulse.languages.length > 0 && (
        <p className="label text-muted">
          {pulse.languages.map((language) => `${language.name} ${language.percent}%`).join(" · ")}
        </p>
      )}
      <p className="label text-muted/80">via GitHub</p>
    </div>
  );
}
