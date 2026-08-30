export function QuickRecall({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="note-block quick-recall" id="quick-recall" aria-labelledby="recall-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Quick recall</p>
        <h2 id="recall-heading">Can you explain each one?</h2>
      </div>
      <ul>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
    </section>
  );
}
