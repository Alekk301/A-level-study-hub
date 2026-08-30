import { ArrowRight, Braces, Calculator, Lightbulb } from "lucide-react";
import type { NoteExample } from "@/src/types/content";

const icons = {
  example: Lightbulb,
  worked: Calculator,
  pseudocode: Braces,
  formula: Calculator,
  analysis: ArrowRight,
};

export function ExampleBlock({ example }: { example: NoteExample }) {
  const Icon = icons[example.kind];
  const isCode = example.kind === "pseudocode" || example.kind === "formula" || example.content.includes("\n");
  return (
    <aside className={`example-block example-block--${example.kind}`} aria-label={example.label}>
      <div className="example-block__label"><Icon aria-hidden="true" /> {example.label}</div>
      {isCode ? <pre><code>{example.content}</code></pre> : <p>{example.content}</p>}
    </aside>
  );
}
