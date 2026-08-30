import type { PaperRecord } from "@/src/types/content";
import { sessionLabels } from "@/src/data/papers";
import { PaperCard } from "@/src/components/papers/PaperCard";

export function PaperSessionGroup({ records }: { records: PaperRecord[] }) {
  const first = records[0];
  if (!first) return null;
  return (
    <section className="paper-session" aria-labelledby={`papers-${first.year}-${first.session}`}>
      <header>
        <p>{first.year}</p>
        <h2 id={`papers-${first.year}-${first.session}`}>{sessionLabels[first.session]}</h2>
        <span>{records.length} component{records.length === 1 ? "" : "s"}</span>
      </header>
      <div className="paper-session__grid">
        {records.map((record) => <PaperCard record={record} key={`${record.subject}-${record.year}-${record.session}-${record.paper}`} />)}
      </div>
    </section>
  );
}
