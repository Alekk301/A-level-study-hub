import type { PaperRecord } from "@/src/types/content";
import { PdfActions } from "@/src/components/papers/PdfActions";

export function PaperCard({ record }: { record: PaperRecord }) {
  return (
    <article className="paper-card">
      <div className="paper-card__title">
        <span>Paper</span>
        <strong>{record.paper}</strong>
      </div>
      <PdfActions qp={record.qp} ms={record.ms} er={record.er} />
    </article>
  );
}
