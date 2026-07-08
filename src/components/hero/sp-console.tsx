"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { siteConfig, socialLinks } from "@/data/portfolio";

// ── Types ────────────────────────────────────────────────────────────────────

type LineKind = "system" | "input" | "output" | "error";

interface ConsoleLine {
  id: string;
  kind: LineKind;
  text: string;
  href?: string;
  animDelay: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

let _seq = 0;
function uid(): string {
  return `sp-${++_seq}`;
}

/** Strip protocol + www for compact display */
function displayUrl(raw: string): string {
  return raw.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function outputLines(texts: string[], kind: LineKind = "output"): ConsoleLine[] {
  return texts.map((text, i) => ({
    id: uid(),
    kind,
    text,
    animDelay: i * 0.05,
  }));
}

// ── Static data ───────────────────────────────────────────────────────────────

const gh = socialLinks.find((s) => s.label === "GitHub")?.href ?? "#";
const li = socialLinks.find((s) => s.label === "LinkedIn")?.href ?? "#";
const em = socialLinks.find((s) => s.label === "Email")?.href ?? "#";

const QUICK_CMDS = ["help", "about", "stack", "projects"] as const;

// ── Command processor ────────────────────────────────────────────────────────

function respond(cmd: string): ConsoleLine[] {
  switch (cmd) {
    case "help":
      return outputLines([
        "available commands:",
        "  about       who I am",
        "  stack       tools I use",
        "  experience  enterprise work",
        "  projects    selected builds",
        "  resume      download resume",
        "  github      github profile",
        "  contact     email / linkedin / github",
        "  clear       reset console",
      ]);

    case "about":
      return outputLines([
        "Software Engineer focused on backend and full-stack development.",
        "Building reliable business applications using Java, Spring Boot,",
        "SQL, Next.js, and TypeScript.",
      ]);

    case "stack":
      return outputLines([
        "Java · Spring Boot · REST APIs · SQL · Next.js · TypeScript",
        "",
        "learning: System Design · Testing · Concurrency · DB Design",
      ]);

    case "experience":
      return outputLines([
        "RCS Tech",
        "Enterprise modules — approvals, validations, workflows,",
        "REST APIs, and database-driven business logic.",
      ]);

    case "projects":
      return outputLines([
        "QueryLens    — API Transaction Inspector",
        "Portfolio    — IDE-inspired developer site",
      ]);

    case "github":
      return [{ id: uid(), kind: "output", text: `→ ${displayUrl(gh)}`, href: gh, animDelay: 0 }];

    case "resume":
      return [{ id: uid(), kind: "output", text: `→ resume.pdf`, href: siteConfig.resumePath, animDelay: 0 }];

    case "contact":
      return [
        { id: uid(), kind: "output", text: "reach me at:", animDelay: 0 },
        { id: uid(), kind: "output", text: `  email     ${displayUrl(em)}`, href: em, animDelay: 0.05 },
        { id: uid(), kind: "output", text: `  linkedin  ${displayUrl(li)}`, href: li, animDelay: 0.1 },
        { id: uid(), kind: "output", text: `  github    ${displayUrl(gh)}`, href: gh, animDelay: 0.15 },
      ];

    default:
      return outputLines([`'${cmd}': command not found. Type help.`], "error");
  }
}

// ── Initial history ───────────────────────────────────────────────────────────

const INITIAL_LINES: ConsoleLine[] = [
  { id: "init-1", kind: "system", text: "Welcome to SP.CONSOLE", animDelay: 0 },
  { id: "init-2", kind: "system", text: 'Type "help" to explore.', animDelay: 0 },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function SpConsole() {
  const [history, setHistory] = useState<ConsoleLine[]>(INITIAL_LINES);
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [history]);

  const submit = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase().replace(/;$/, "");

    if (cmd === "clear") {
      setHistory([{ id: uid(), kind: "system", text: "Console cleared.", animDelay: 0 }]);
      setValue("");
      return;
    }

    // Open externals synchronously within the user gesture before any state update
    if (cmd === "github") window.open(gh, "_blank", "noopener,noreferrer");
    else if (cmd === "resume") window.open(siteConfig.resumePath, "_blank", "noopener,noreferrer");

    setHistory((prev) => [
      ...prev,
      { id: uid(), kind: "input", text: trimmed, animDelay: 0 },
      ...respond(cmd),
    ]);
    setValue("");
  }, []);

  return (
    <aside aria-label="SP.CONSOLE — portfolio command console" className="w-full">
      <div className="cliShell h-[20rem] md:h-[22rem] lg:h-[26rem]">

        {/* ── Header ── */}
        <div className="cliShellHeader">
          <div className="cliShellHeaderSlot">
            <span className="text-accent-lavender">SP.CONSOLE</span>
          </div>
          <div className="cliShellHeaderSlot cliShellHeaderMid">~/portfolio/console</div>
          <div className="cliShellHeaderSlot cliShellHeaderRight">
            <span className="cliShellDot" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* ── Output ── */}
        <div className="cliShellBody">
          <div className="cliLog">
            <div className="space-y-1">
              {history.map((line) => (
                <motion.p
                  key={line.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: line.animDelay, ease: "easeOut" }}
                  className={`cliShellLine cliShellLine--${line.kind}`}
                >
                  {line.kind === "input" ? (
                    <>
                      <span className="cliPrompt">sp&gt; </span>
                      {line.text}
                    </>
                  ) : line.href ? (
                    <a
                      href={line.href}
                      target={line.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="underline-offset-2 transition-colors hover:text-accent-lavender hover:underline"
                    >
                      {line.text}
                    </a>
                  ) : line.text === "" ? (
                    <>&nbsp;</>
                  ) : (
                    line.text
                  )}
                </motion.p>
              ))}
            </div>

            {/* Quick-access hint buttons */}
            <div className="cliHint mt-2" aria-label="Suggested commands">
              <span>try: </span>
              {QUICK_CMDS.map((cmd, i) => (
                <span key={cmd}>
                  {i > 0 && " · "}
                  <button
                    type="button"
                    className="cliHintAction"
                    onClick={() => {
                      setValue(cmd);
                      requestAnimationFrame(() => inputRef.current?.focus());
                    }}
                  >
                    {cmd}
                  </button>
                </span>
              ))}
            </div>

            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── Input row ── */}
        <form
          className="cliInputRow"
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
        >
          <span className="cliPrompt">sp&gt;</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 100))}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="SP.CONSOLE command input"
            placeholder="type a command"
            className="cliInput"
          />
          <span aria-hidden="true" className="cliCursor" />
        </form>

        <div className="cliStatus">sp.console · read-only · type help</div>
      </div>
    </aside>
  );
}
