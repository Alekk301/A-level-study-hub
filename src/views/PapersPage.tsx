"use client";

import { useMemo, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { EmptyState } from "@/src/components/common/EmptyState";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { PaperFilters } from "@/src/components/papers/PaperFilters";
import { PaperSessionGroup } from "@/src/components/papers/PaperSessionGroup";
import { papers } from "@/src/data/papers";
import { getSubject, subjects } from "@/src/data/subjects";
import type { PaperSession } from "@/src/types/content";
import { paths } from "@/src/utils/paths";

export function PapersPage({ subjectCode }: { subjectCode?: string }) {
  const [selectedCode, setSelectedCode] = useState(subjectCode ?? "9618");
  const [year, setYear] = useState<number | "all">("all");
  const [session, setSession] = useState<PaperSession | "all">("all");
  const [paper, setPaper] = useState<string | "all">("all");

  const effectiveCode = subjectCode ?? selectedCode;
  const subject = getSubject(effectiveCode);
  const subjectPapers = useMemo(() => papers.filter((record) => record.subject === effectiveCode), [effectiveCode]);
  const years = [...new Set(subjectPapers.map((record) => record.year))].sort((a, b) => b - a);
  const yearRange = years.length ? `${years.at(-1)}–${years[0]}` : "No years available";
  const filtered = subjectPapers.filter((record) =>
    (year === "all" || record.year === year) &&
    (session === "all" || record.session === session) &&
    (paper === "all" || record.paper.startsWith(paper)),
  );
  const groups = Object.values(
    filtered.reduce<Record<string, typeof filtered>>((result, record) => {
      const key = `${record.year}:${record.session}`;
      (result[key] ??= []).push(record);
      return result;
    }, {}),
  ).sort((a, b) => b[0].year - a[0].year || a[0].session.localeCompare(b[0].session));

  if (!subject) {
    return (
      <PageContainer>
        <EmptyState title="Subject not found" description="The requested paper library does not exist." action={{ label: "View all papers", href: paths.papers }} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <header
        className="page-heading subject-heading"
        style={{ "--subject-accent": subject.accent, "--subject-soft": subject.accentSoft } as React.CSSProperties}
      >
        <div>
          <p className="eyebrow">Past paper library</p>
          <h1>{subject.name} <span>{subject.code}</span></h1>
          <p>Filter by session and component. Question papers and mark schemes are paired by metadata.</p>
        </div>
        {!subjectCode ? (
          <label className="field-label">
            Subject
            <select value={selectedCode} onChange={(event) => { setSelectedCode(event.target.value); setYear("all"); setSession("all"); setPaper("all"); }}>
              {subjects.map((option) => <option value={option.code} key={option.code}>{option.code} · {option.name}</option>)}
            </select>
          </label>
        ) : null}
      </header>

      <div className="integration-notice integration-notice--ready" role="status">
        <CircleCheckBig aria-hidden="true" />
        <div>
          <strong>{subjectPapers.length} complete question-paper and mark-scheme pairs are ready.</strong>
          <p>{yearRange} · Generated from the local CAIE library. PDFs open from XtraPapers in a new tab.</p>
        </div>
      </div>

      <PaperFilters
        years={years}
        year={year}
        session={session}
        paper={paper}
        onYearChange={setYear}
        onSessionChange={setSession}
        onPaperChange={setPaper}
      />

      <div className="paper-results" aria-live="polite">
        <p>{filtered.length} paired component record{filtered.length === 1 ? "" : "s"}</p>
        {groups.map((records) => <PaperSessionGroup records={records.sort((a, b) => a.paper.localeCompare(b.paper, undefined, { numeric: true }))} key={`${records[0].year}-${records[0].session}`} />)}
        {!groups.length ? (
          <EmptyState title="No papers match" description="Clear one or more filters, or add matching records to papers.json." />
        ) : null}
      </div>
    </PageContainer>
  );
}
