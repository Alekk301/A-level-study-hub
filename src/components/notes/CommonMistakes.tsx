import { TriangleAlert } from "lucide-react";

export function CommonMistakes({ mistakes }: { mistakes: string[] }) {
  if (!mistakes.length) return null;
  return (
    <section className="callout-block callout-block--mistakes" id="common-mistakes" aria-labelledby="mistakes-heading">
      <header><TriangleAlert aria-hidden="true" /><div><p>Common mistakes</p><h2 id="mistakes-heading">Avoid easy mark losses</h2></div></header>
      <ul>{mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul>
    </section>
  );
}
