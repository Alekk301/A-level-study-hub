import type { NoteSection as NoteSectionType } from "@/src/types/content";
import { ExampleBlock } from "@/src/components/notes/ExampleBlock";

export function NoteSection({ section, number }: { section: NoteSectionType; number: number }) {
  return (
    <section className="note-section" id={section.id} aria-labelledby={`${section.id}-heading`}>
      <header>
        <span>{String(number).padStart(2, "0")}</span>
        <h2 id={`${section.id}-heading`}>{section.title}</h2>
      </header>
      {section.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
      {section.examples.map((example) => <ExampleBlock example={example} key={example.id} />)}
    </section>
  );
}
