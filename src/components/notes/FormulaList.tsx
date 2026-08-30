import type { Formula } from "@/src/types/content";

export function FormulaList({ formulas }: { formulas: Formula[] }) {
  if (!formulas.length) return null;
  return (
    <section className="note-block formulas" id="formulas" aria-labelledby="formulas-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Formula sheet</p>
        <h2 id="formulas-heading">Calculate, then interpret</h2>
      </div>
      <div className="formula-list">
        {formulas.map((formula) => (
          <article key={formula.label}>
            <h3>{formula.label}</h3>
            <code>{formula.expression}</code>
            {formula.note ? <p>{formula.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
