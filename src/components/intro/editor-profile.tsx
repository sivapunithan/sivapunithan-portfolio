import { introContent } from "@/data/portfolio";

interface EditorProfileProps {
  isVisible: boolean;
}

function renderCodeLine(line: string) {
  const parts = line.split(/(public|final|class|String|new|Sivapunithan|"[^"]*")/g);

  return parts.map((part, index) => {
    let className = "text-secondary";

    if (["public", "final", "class", "new"].includes(part)) className = "text-accent-orange";
    if (part === "String") className = "text-accent-blue";
    if (part === "Sivapunithan") className = "text-primary";
    if (part.startsWith('"')) className = "text-accent-green";

    return (
      <span key={`${part}-${index}`} className={className}>
        {part}
      </span>
    );
  });
}

export function EditorProfile({ isVisible }: EditorProfileProps) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[2.25rem_minmax(0,1fr)] sm:grid-cols-[3rem_minmax(0,1fr)]">
      <div
        aria-hidden="true"
        className="border-r border-edge-subtle px-2 py-5 text-right font-mono text-[9px] leading-[1.55] text-muted sm:text-[11px] sm:leading-[1.6]"
      >
        {introContent.profileLines.map((_, index) => (
          <span key={index} className="block">
            {index + 1}
          </span>
        ))}
      </div>
      <pre className="min-w-0 overflow-hidden px-3 py-5 font-mono text-[clamp(8px,2.25vw,12px)] leading-[1.55] sm:px-5 sm:leading-[1.6]">
        <code>
          {introContent.profileLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className={isVisible ? "intro-code-line block" : "block opacity-0"}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              {renderCodeLine(line)}{"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
