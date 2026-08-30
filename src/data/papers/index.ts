import rawPapers from "./papers.json";
import type { PaperRecord, PaperSession } from "@/src/types/content";

const validSessions = new Set<PaperSession>([
  "February-March",
  "May-June",
  "October-November",
]);

function normalizeUrl(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function normalizePaperRecord(value: unknown): PaperRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const subject = String(record.subject ?? "");
  const year = Number(record.year);
  const session = String(record.session ?? "") as PaperSession;
  const paper = String(record.paper ?? record.component ?? "");

  if (!/^\d{4}$/.test(subject)) return null;
  if (!Number.isInteger(year) || year < 2000 || year > 2100) return null;
  if (!validSessions.has(session)) return null;
  if (!/^\d{1,2}$/.test(paper)) return null;

  return {
    subject,
    year,
    session,
    paper,
    qp: normalizeUrl(record.qp),
    ms: normalizeUrl(record.ms),
    er: normalizeUrl(record.er),
    source:
      record.source === "downloader" || record.source === "manual"
        ? record.source
        : "demo",
  };
}

export const papers = (rawPapers as unknown[])
  .map(normalizePaperRecord)
  .filter((record): record is PaperRecord => Boolean(record));

export function isUsablePdfUrl(value: string | null | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value, "https://local.invalid");
    const permittedProtocol =
      url.protocol === "https:" ||
      (url.protocol === "http:" && url.hostname === "localhost");
    return permittedProtocol && url.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

export const sessionLabels: Record<PaperSession, string> = {
  "February-March": "February / March",
  "May-June": "May / June",
  "October-November": "October / November",
};

export const sessionOrder: PaperSession[] = [
  "February-March",
  "May-June",
  "October-November",
];
