export function Overview({ text }: { text: string }) {
  return (
    <section className="note-overview" id="overview" aria-labelledby="overview-heading">
      <p className="section-kicker">Overview</p>
      <h2 id="overview-heading">What this topic connects</h2>
      <p>{text}</p>
    </section>
  );
}
