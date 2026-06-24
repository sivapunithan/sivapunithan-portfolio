"use client";

import { useEffect, useRef, useState } from "react";

type HistoryLine = {
  kind: "system" | "input" | "output" | "error";
  text: string;
};

const INITIAL_HISTORY: HistoryLine[] = [
  { kind: "system", text: "Welcome to Sivapunithan.java" },
  { kind: "system", text: "Restricted JShell running in safe mode." },
  { kind: "system", text: "Type help for allowed commands." },
];

const HINT_COMMANDS = ["help", "skills", "projects", "10 + 20", '"Java" + " Developer"'] as const;

const BLOCKED_TEXT_PATTERNS = [/<\s*script/i, /javascript:/i, /onerror\s*=/i, /<\s*\/?\s*[a-z][^>]*>/i];

function containsUnsafeText(value: string) {
  return BLOCKED_TEXT_PATTERNS.some((pattern) => pattern.test(value));
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "Error: result out of range.";
  }

  return Number.isInteger(value) ? `${value}` : `${Number.parseFloat(value.toFixed(6))}`;
}

function processJavaShellCommand(rawCommand: string): string[] {
  const trimmed = rawCommand.trim();
  const normalized = trimmed.endsWith(";") ? trimmed.slice(0, -1).trim() : trimmed;
  const lower = normalized.toLowerCase();

  if (!normalized) {
    return [];
  }

  if (normalized.length > 120) {
    return ["Error: command too long. Max 120 characters."];
  }

  if (containsUnsafeText(normalized)) {
    return ["Error: unsafe content blocked in Restricted JShell."];
  }

  if (lower === "help") {
    return [
      "Allowed commands: help, clear, about, skills, projects, whoami, build",
      'System.out.println("text"), 10 + 20, "Java" + " Developer"',
      "Math.max(a,b), Math.min(a,b)",
    ];
  }

  if (lower === "about") {
    return ["Sivapunithan S - Java, Spring Boot, SQL, Next.js, TypeScript."];
  }

  if (lower === "skills") {
    return ["Java | Spring Boot | REST APIs | SQL | Hibernate | Next.js | TypeScript"];
  }

  if (lower === "projects") {
    return ["Library Management System", "Movie Ticket Booking App", "Java Backend Engineering Lab"];
  }

  if (lower === "whoami") {
    return ["Sivapunithan S - Java backend developer focused on reliable systems."];
  }

  if (lower === "build") {
    return ["Ready to build APIs, data workflows, and backend-heavy full-stack systems."];
  }

  const printMatch = normalized.match(/^System\.out\.println\(\s*"([^"]*)"\s*\)$/);
  if (printMatch) {
    const text = printMatch[1];
    if (text.length > 80) {
      return ["Error: string literal too long. Max 80 characters."];
    }
    if (containsUnsafeText(text)) {
      return ["Error: unsafe content blocked in Restricted JShell."];
    }
    return [text];
  }

  const concatMatch = normalized.match(/^"([^"]*)"\s*\+\s*"([^"]*)"$/);
  if (concatMatch) {
    const left = concatMatch[1];
    const right = concatMatch[2];
    if (left.length > 40 || right.length > 40) {
      return ["Error: string fragments must be 40 characters or fewer."];
    }
    if (containsUnsafeText(left) || containsUnsafeText(right)) {
      return ["Error: unsafe content blocked in Restricted JShell."];
    }
    return [`${left}${right}`];
  }

  const mathMatch = normalized.match(/^Math\.(max|min)\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
  if (mathMatch) {
    const [, fn, leftRaw, rightRaw] = mathMatch;
    const left = Number(leftRaw);
    const right = Number(rightRaw);

    if (Number.isNaN(left) || Number.isNaN(right)) {
      return ["Error: invalid numeric input."];
    }

    const result = fn.toLowerCase() === "max" ? Math.max(left, right) : Math.min(left, right);
    return [formatNumber(result)];
  }

  const arithmeticMatch = normalized.match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/);
  if (arithmeticMatch) {
    const [, leftRaw, operator, rightRaw] = arithmeticMatch;
    const left = Number(leftRaw);
    const right = Number(rightRaw);

    if (Number.isNaN(left) || Number.isNaN(right)) {
      return ["Error: invalid numeric input."];
    }

    switch (operator) {
      case "+":
        return [formatNumber(left + right)];
      case "-":
        return [formatNumber(left - right)];
      case "*":
        return [formatNumber(left * right)];
      case "/":
        return right === 0 ? ["Error: division by zero is not allowed."] : [formatNumber(left / right)];
      default:
        return ["Restricted JShell: command not allowed. Type help."];
    }
  }

  return ["Restricted JShell: command not allowed. Type help."];
}

function getHistoryKind(line: string): HistoryLine["kind"] {
  if (line.startsWith("Error:")) {
    return "error";
  }

  if (line.startsWith("Restricted JShell:")) {
    return "error";
  }

  return "output";
}

export function RestrictedJShell() {
  const [history, setHistory] = useState<HistoryLine[]>(INITIAL_HISTORY);
  const [command, setCommand] = useState("");
  const outputEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
  }, [history]);

  const submitCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      return;
    }

    if (trimmed.toLowerCase().replace(/;$/, "") === "clear") {
      setHistory([{ kind: "system", text: "Restricted JShell cleared." }]);
      setCommand("");
      return;
    }

    const results = processJavaShellCommand(trimmed);
    if (results.length === 0) {
      return;
    }

    setHistory((current) => [
      ...current,
      { kind: "input", text: trimmed },
      ...results.map((text) => ({
        kind: getHistoryKind(text),
        text,
      })),
    ]);
    setCommand("");
  };

  return (
    <aside aria-label="Restricted JShell simulator" className="w-full justify-self-end lg:max-w-[470px]">
      <div className="cliShell h-[24rem] md:h-[27rem] lg:h-[32rem]">
        <div className="cliShellHeader">
          <div className="cliShellHeaderSlot">
            <span className="text-accent-lavender">SP.java</span>
          </div>
          <div className="cliShellHeaderSlot cliShellHeaderMid">~/portfolio/Sivapunithan.java</div>
          <div className="cliShellHeaderSlot cliShellHeaderRight">
            <span className="cliShellDot" />
            <span>JVM SAFE MODE</span>
          </div>
        </div>

        <div className="cliShellBody">
          <div className="cliLog">
            <div className="space-y-1.5">
              {history.map((line, index) => (
                <p key={`${index}-${line.kind}-${line.text}`} className={`cliShellLine cliShellLine--${line.kind}`}>
                  {line.kind === "input" ? (
                    <>
                      <span className="cliPrompt">jshell&gt; </span>
                      <span>{line.text}</span>
                    </>
                  ) : (
                    line.text
                  )}
                </p>
              ))}
            </div>

            <div className="cliHint" aria-label="Suggested commands">
              <span>try: </span>
              {HINT_COMMANDS.map((item, index) => (
                <span key={item}>
                  {index > 0 ? " · " : ""}
                  <button
                    type="button"
                    className="cliHintAction"
                    onClick={() => {
                      setCommand(item);
                      requestAnimationFrame(() => inputRef.current?.focus());
                    }}
                  >
                    {item}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <form
          className="cliInputRow"
          onSubmit={(event) => {
            event.preventDefault();
            submitCommand(command);
          }}
        >
          <span className="cliPrompt">jshell&gt;</span>
          <input
            ref={inputRef}
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Restricted JShell command input"
            placeholder='try: System.out.println("Hello World")'
            className="cliInput"
          />
          <span aria-hidden="true" className="cliCursor" />
        </form>

        <div className="cliStatus">heap stable · threads active · api online · parser restricted</div>
      </div>
    </aside>
  );
}
