import { Download, ExternalLink } from "lucide-react";
import { isUsablePdfUrl } from "@/src/data/papers";

function PdfLink({ url, label }: { url: string | null | undefined; label: string }) {
  const usable = isUsablePdfUrl(url);
  if (!usable) {
    return (
      <span className="pdf-action pdf-action--disabled" title={`${label} URL has not been connected`} aria-disabled="true">
        <Download aria-hidden="true" /> {label}<small>Not connected</small>
      </span>
    );
  }
  return (
    <a className="pdf-action" href={url ?? undefined} target="_blank" rel="noreferrer">
      <ExternalLink aria-hidden="true" /> {label}
    </a>
  );
}

export function PdfActions({ qp, ms, er }: { qp: string | null; ms: string | null; er?: string | null }) {
  return (
    <div className="pdf-actions">
      <PdfLink url={qp} label="Question Paper" />
      <PdfLink url={ms} label="Mark Scheme" />
      {er !== undefined ? <PdfLink url={er} label="Examiner Report" /> : null}
    </div>
  );
}
