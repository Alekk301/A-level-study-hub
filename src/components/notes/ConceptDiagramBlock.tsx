import type { ConceptDiagram } from "@/src/types/content";

export function ConceptDiagramBlock({ diagram }: { diagram: ConceptDiagram | null }) {
  if (!diagram) return null;
  return (
    <figure className={`concept-diagram concept-diagram--${diagram.type}`} id="diagram">
      <figcaption><span>Concept map</span><strong>{diagram.title}</strong></figcaption>
      <ol>
        {diagram.nodes.map((node, index) => (
          <li key={node}>
            <span>{index + 1}</span>
            <strong>{node}</strong>
          </li>
        ))}
      </ol>
    </figure>
  );
}
