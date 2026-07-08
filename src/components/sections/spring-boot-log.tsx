import { SectionReveal } from "@/components/motion/section-reveal";

const LOG_LINES: { text: string; cls: string }[] = [
  { text: "  .   ____          _            __ _ _", cls: "text-accent-green/50" },
  { text: " /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\", cls: "text-accent-green/50" },
  { text: "( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\", cls: "text-accent-green/50" },
  { text: " \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )", cls: "text-accent-green/50" },
  { text: "  '  |____| .__|_| |_|_| |_\\__, | / / / /", cls: "text-accent-green/50" },
  { text: " =========|_|==============|___/=/_/_/_/", cls: "text-accent-green/50" },
  { text: "", cls: "" },
  { text: " :: Spring Boot ::                (v3.2.4)", cls: "text-secondary/70" },
  { text: "", cls: "" },
  {
    text: "INFO  PortfolioApplication  : Starting PortfolioApplication",
    cls: "text-muted/60",
  },
  {
    text: "INFO  PortfolioApplication  : Java 17.0.9, Spring Boot 3.2.4",
    cls: "text-muted/60",
  },
  {
    text: "INFO  TomcatWebServer       : Tomcat initialised with port 8080 (http)",
    cls: "text-muted/60",
  },
  {
    text: "INFO  PortfolioApplication  : Started in 0.847 seconds (JVM running for 1.2s)",
    cls: "text-muted/60",
  },
  {
    text: "INFO  ContactController     : /api/contact endpoint registered — READY",
    cls: "text-accent-green/90",
  },
];

/**
 * Static Spring Boot startup log rendered above the contact panel.
 * No animation — revealed as a block on scroll entry.
 */
export function SpringBootLog() {
  return (
    <SectionReveal delay={0.05}>
      <div className="mb-10 overflow-hidden rounded-[0.9rem] border border-edge-subtle bg-background-deep/60">
        {/* Panel header */}
        <div className="flex h-9 items-center gap-3 border-b border-edge-subtle px-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_8px_var(--accent-green)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted/70 uppercase">
            run · PortfolioApplication
          </span>
          <span className="ml-auto font-mono text-[10px] text-accent-green/70">RUNNING</span>
        </div>

        {/* Log output */}
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[11px] leading-[1.8]">
          {LOG_LINES.map((line, i) =>
            line.text === "" ? (
              <div key={i} className="select-none">
                &nbsp;
              </div>
            ) : (
              <div key={i} className={line.cls}>
                {line.text}
              </div>
            ),
          )}
        </pre>
      </div>
    </SectionReveal>
  );
}
