"use client";

type Token = { type: "keyword" | "string" | "comment" | "number" | "plain"; value: string };

const LUA_KEYWORDS = new Set([
  "local", "function", "end", "if", "then", "else", "elseif",
  "for", "while", "do", "return", "true", "false", "nil",
  "and", "or", "not", "in", "repeat", "until", "break",
  "loadstring", "require", "pcall", "xpcall", "pairs", "ipairs",
  "type", "tostring", "tonumber", "print", "error", "assert",
  "game", "workspace", "script", "wait", "task",
]);

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Multi-line comment --[[...]]
    if (code.startsWith("--[[", i)) {
      const end = code.indexOf("]]", i + 4);
      const j = end === -1 ? code.length : end + 2;
      tokens.push({ type: "comment", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Single-line comment --
    if (code.startsWith("--", i)) {
      const j = code.indexOf("\n", i);
      const end = j === -1 ? code.length : j;
      tokens.push({ type: "comment", value: code.slice(i, end) });
      i = end;
      continue;
    }

    // Long string [[...]]
    if (code.startsWith("[[", i)) {
      const end = code.indexOf("]]", i + 2);
      const j = end === -1 ? code.length : end + 2;
      tokens.push({ type: "string", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Quoted string
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      j++;
      tokens.push({ type: "string", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.xXa-fA-F]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      tokens.push({ type: LUA_KEYWORDS.has(word) ? "keyword" : "plain", value: word });
      i = j;
      continue;
    }

    // Plain character
    tokens.push({ type: "plain", value: code[i] });
    i++;
  }

  return tokens;
}

const TOKEN_COLOR: Record<Token["type"], string> = {
  keyword: "#c084fc",   // purple — keywords + builtins
  string:  "#4ade80",   // green — strings
  comment: "#6b7280",   // gray — comments
  number:  "#fb923c",   // orange — numbers
  plain:   "#e2e8f0",   // light — everything else
};

export function LuaCode({ code }: { code: string }) {
  const tokens = tokenize(code);

  return (
    <div className="sdetail-code-block">
      <pre className="sdetail-code">
        <code>
          {tokens.map((tok, idx) => (
            <span key={idx} style={{ color: TOKEN_COLOR[tok.type] }}>
              {tok.value}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
