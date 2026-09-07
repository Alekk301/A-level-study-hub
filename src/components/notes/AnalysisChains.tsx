import type { AnalysisChain } from "@/src/types/content";

export function AnalysisChains({ chains }: { chains: AnalysisChain[] }) {
  if (!chains.length) return null;
  return (
    <section className="note-block analysis-chains" id="analysis" aria-labelledby="analysis-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Applied analysis</p>
        <h2 id="analysis-heading">Build a complete impact chain</h2>
      </div>
      {chains.map((chain) => (
        <article key={chain.title}>
          <h3>{chain.title}</h3>
          <ol>{chain.steps.map((step) => <li key={step}><span>{step}</span></li>)}</ol>
          <p><strong>Evaluation:</strong> {chain.evaluation}</p>
        </article>
      ))}
    </section>
  );
}
