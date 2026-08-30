import type { Definition } from "@/src/types/content";

export function Definitions({ definitions }: { definitions: Definition[] }) {
  if (!definitions.length) return null;
  return (
    <section className="note-block definitions" id="definitions" aria-labelledby="definitions-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Key definitions</p>
        <h2 id="definitions-heading">Use precise exam language</h2>
      </div>
      <dl>
        {definitions.map((definition) => (
          <div key={definition.term}>
            <dt>{definition.term}</dt>
            <dd>{definition.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
