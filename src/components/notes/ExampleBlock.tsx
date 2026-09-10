import { ArrowRight, Braces, Calculator, Lightbulb } from "lucide-react";
import type { NoteExample } from "@/src/types/content";

const icons = {
  example: Lightbulb,
  worked: Calculator,
  code: Braces,
  pseudocode: Braces,
  formula: Calculator,
  analysis: ArrowRight,
};

const tokenPatterns: Record<NonNullable<NoteExample["language"]>, RegExp> = {
  python: /(#.*?$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:and|as|break|class|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|None|not|or|pass|raise|return|super|True|try|while|with|yield)\b|\b\d+(?:\.\d+)?\b)/gim,
  "cambridge-pseudocode": /(\/\/.*?$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:FUNCTION|ENDFUNCTION|PROCEDURE|ENDPROCEDURE|IF|THEN|ELSE|ENDIF|RETURN|DECLARE|CLASS|ENDCLASS|PRIVATE|PUBLIC|CALL|FOR|TO|NEXT|WHILE|DO|ENDWHILE|REPEAT|UNTIL|CASE|OF|ENDCASE)\b|\b\d+(?:\.\d+)?\b)/gim,
  assembly: /(\/\/.*?$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:LDM|LDD|LDI|LDX|LOAD|STORE|ADD|SUB|JMP|CMP|AND|OR|XOR)\b|\b\d+(?:\.\d+)?\b)/gim,
  prolog: /(%.*?$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:is|not|true|false)\b|\b\d+(?:\.\d+)?\b)/gim,
};

function tokenClass(token: string, language: NonNullable<NoteExample["language"]>) {
  const isComment = language === "python"
    ? token.startsWith("#")
    : language === "prolog"
      ? token.startsWith("%")
      : token.startsWith("//");
  if (isComment) return "comment";
  if (/^["']/.test(token)) return "string";
  if (/^\d/.test(token)) return "number";
  return "keyword";
}

function highlightedCode(content: string, language: NonNullable<NoteExample["language"]>) {
  const pattern = tokenPatterns[language];
  return content.split(pattern).filter(Boolean).map((token, index) => {
    const exactTokenPattern = new RegExp(`^(?:${pattern.source})$`, pattern.flags.replace("g", ""));
    if (!exactTokenPattern.test(token)) {
      return token;
    }
    const kind = tokenClass(token, language);
    return <span className={`code-token code-token--${kind}`} key={`${index}-${token}`}>{token}</span>;
  });
}

function languageLabel(language: NonNullable<NoteExample["language"]>) {
  if (language === "cambridge-pseudocode") return "Cambridge pseudocode";
  if (language === "prolog") return "Prolog";
  if (language === "assembly") return "Assembly";
  return "Python";
}

export function ExampleBlock({ example }: { example: NoteExample }) {
  const Icon = icons[example.kind];
  const isCode = example.kind === "code" || example.kind === "pseudocode" || example.kind === "formula" || example.content.includes("\n");
  return (
    <aside className={`example-block example-block--${example.kind}`} aria-label={example.label}>
      <div className="example-block__label">
        <span><Icon aria-hidden="true" /> {example.label}</span>
        {example.language ? <span className="example-block__language">{languageLabel(example.language)}</span> : null}
      </div>
      {isCode ? (
        <pre data-language={example.language} tabIndex={0}>
          <code>{example.language ? highlightedCode(example.content, example.language) : example.content}</code>
        </pre>
      ) : <p>{example.content}</p>}
    </aside>
  );
}
