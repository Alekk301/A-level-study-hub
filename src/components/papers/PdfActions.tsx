"use client";

import { Download, ExternalLink, Eye, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isUsablePdfUrl } from "@/src/data/papers";

export function getPdfPreviewUrl(value: string) {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/download$/i, "/raw");
  return url.toString();
}

function PdfResource({ url, label }: { url: string | null | undefined; label: string }) {
  const usable = isUsablePdfUrl(url);
  if (!usable) {
    return (
      <span className="pdf-action pdf-action--disabled" title={`${label} URL has not been connected`} aria-disabled="true">
        <Download aria-hidden="true" /> {label}<small>Not connected</small>
      </span>
    );
  }

  const downloadUrl = url as string;
  const previewUrl = getPdfPreviewUrl(downloadUrl);

  return (
    <Dialog>
      <div className="pdf-resource">
        <DialogTrigger asChild>
          <button className="pdf-action pdf-action--view" type="button">
            <Eye aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <small>View full PDF</small>
            </span>
          </button>
        </DialogTrigger>
        <a
          className="pdf-download"
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Download ${label}`}
          title={`Download ${label}`}
        >
          <Download aria-hidden="true" />
          <span>Download</span>
        </a>
      </div>

      <DialogContent className="pdf-viewer-dialog" showCloseButton={false}>
        <DialogHeader className="pdf-viewer-header">
          <div>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>Read the complete paper here, or download a copy for offline use.</DialogDescription>
          </div>
          <div className="pdf-viewer-toolbar">
            <a href={previewUrl} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" /> Open separately
            </a>
            <a href={downloadUrl} target="_blank" rel="noreferrer">
              <Download aria-hidden="true" /> Download
            </a>
            <DialogClose asChild>
              <button type="button" aria-label="Close PDF viewer">
                <X aria-hidden="true" /> Close
              </button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="pdf-viewer-frame">
          <iframe src={previewUrl} title={`${label} PDF preview`} loading="lazy" />
          <p>
            If the preview does not load, <a href={previewUrl} target="_blank" rel="noreferrer">open the PDF separately</a>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PdfActions({ qp, ms, er }: { qp: string | null; ms: string | null; er?: string | null }) {
  return (
    <div className="pdf-actions">
      <PdfResource url={qp} label="Question Paper" />
      <PdfResource url={ms} label="Mark Scheme" />
      {isUsablePdfUrl(er) ? <PdfResource url={er} label="Examiner Report" /> : null}
    </div>
  );
}
