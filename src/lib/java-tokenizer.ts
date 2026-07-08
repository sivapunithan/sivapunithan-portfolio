export interface Token {
  text: string;
  cls: string;
}

const KEYWORDS = new Set([
  "public",
  "private",
  "protected",
  "class",
  "interface",
  "enum",
  "abstract",
  "void",
  "new",
  "return",
  "if",
  "else",
  "null",
  "true",
  "false",
  "static",
  "final",
  "extends",
  "implements",
  "import",
  "package",
  "long",
  "int",
  "boolean",
  "this",
  "super",
  "throws",
  "throw",
]);

/** Minimal Java/SQL/TS-friendly syntax tokeniser — no external dependencies. */
export function tokenizeJavaLine(line: string): Token[] {
  if (line.trim().startsWith("//")) {
    return [{ text: line, cls: "text-muted/50 italic" }];
  }

  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    if (ch === "@") {
      const m = line.slice(i).match(/^@[A-Za-z]+/);
      if (m) {
        tokens.push({ text: m[0], cls: "text-accent-orange" });
        i += m[0].length;
        continue;
      }
    }

    if (ch === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j++;
        j++;
      }
      tokens.push({ text: line.slice(i, j + 1), cls: "text-accent-green" });
      i = j + 1;
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      const m = line.slice(i).match(/^[A-Za-z_]\w*/);
      if (m) {
        const word = m[0];
        let cls: string;
        if (KEYWORDS.has(word)) cls = "text-accent-blue";
        else if (/^[A-Z]/.test(word)) cls = "text-accent-yellow/90";
        else cls = "text-secondary";
        tokens.push({ text: word, cls });
        i += word.length;
        continue;
      }
    }

    if (/\d/.test(ch)) {
      const m = line.slice(i).match(/^\d+/);
      if (m) {
        tokens.push({ text: m[0], cls: "text-accent-lavender/75" });
        i += m[0].length;
        continue;
      }
    }

    tokens.push({ text: ch, cls: "text-secondary/50" });
    i++;
  }

  return tokens;
}
