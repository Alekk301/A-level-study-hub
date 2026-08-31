"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AdditionalResources } from "@/src/components/notes/AdditionalResources";
import { AnalysisChains } from "@/src/components/notes/AnalysisChains";
import { CommonMistakes } from "@/src/components/notes/CommonMistakes";
import { ComparisonTableBlock } from "@/src/components/notes/ComparisonTableBlock";
import { ConceptDiagramBlock } from "@/src/components/notes/ConceptDiagramBlock";
import { Definitions } from "@/src/components/notes/Definitions";
import { ExamTips } from "@/src/components/notes/ExamTips";
import { ExamFocusBlock } from "@/src/components/notes/ExamFocusBlock";
import { FormulaList } from "@/src/components/notes/FormulaList";
import { NoteSection } from "@/src/components/notes/NoteSection";
import { Overview } from "@/src/components/notes/Overview";
import { QuickRecall } from "@/src/components/notes/QuickRecall";
import { RelatedTopics } from "@/src/components/notes/RelatedTopics";
import { SyllabusChecklist } from "@/src/components/notes/SyllabusChecklist";
import { TableOfContents, type TocItem } from "@/src/components/notes/TableOfContents";
import { TopicHeader } from "@/src/components/notes/TopicHeader";
import { TopicNavigation } from "@/src/components/notes/TopicNavigation";
import { getTopicVisual, TopicVisual } from "@/src/components/notes/TopicVisual";
import { loadTopicNote } from "@/src/data/notes";
import { getExamFocus } from "@/src/data/exam-focus";
import { getTopic, getTopicNeighbours } from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import type { TopicNote } from "@/src/types/content";
import { paths } from "@/src/utils/paths";

function TopicLoading() {
  return (
    <div className="topic-loading" role="status" aria-label="Loading topic notes">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function TopicPage({ subjectCode, topicId }: { subjectCode: string; topicId: string }) {
  const study = useStudy();
  const lookup = getTopic(subjectCode, topicId);
  const lookupKey = lookup?.key ?? null;
  const [loadState, setLoadState] = useState<{
    key: string;
    note: TopicNote | null;
    error: boolean;
  }>({ key: "", note: null, error: false });
  const note = loadState.key === lookupKey ? loadState.note : null;
  const error = loadState.key === lookupKey && loadState.error;
  const recordOpened = study.recordOpened;
  const topicVisual = getTopicVisual(subjectCode, topicId);
  const examFocus = getExamFocus(subjectCode, topicId);

  useEffect(() => {
    let active = true;
    if (!lookupKey) return;
    loadTopicNote(subjectCode, topicId)
      .then((loaded) => {
        if (!active || !loaded) return;
        setLoadState({ key: lookupKey, note: loaded, error: false });
        recordOpened(lookupKey);
      })
      .catch(() => {
        if (active) setLoadState({ key: lookupKey, note: null, error: true });
      });
    return () => { active = false; };
  }, [subjectCode, topicId, lookupKey, recordOpened]);

  const tocItems = useMemo<TocItem[]>(() => {
    if (!note) return [];
    return [
      { id: "overview", label: "Overview" },
      ...(note.syllabusPoints.length ? [{ id: "syllabus", label: "Syllabus checklist" }] : []),
      ...(note.definitions.length ? [{ id: "definitions", label: "Key definitions" }] : []),
      ...(topicVisual ? [{ id: "visual-explainer", label: topicVisual.title }] : []),
      ...(note.diagram ? [{ id: "diagram", label: note.diagram.title }] : []),
      { id: "complete-notes", label: "Complete exam notes" },
      ...note.sections.map((section) => ({ id: section.id, label: section.title })),
      ...(note.formulas.length ? [{ id: "formulas", label: "Formula sheet" }] : []),
      ...(note.comparisonTable ? [{ id: "comparison", label: "Comparison" }] : []),
      ...(note.analysisChains.length ? [{ id: "analysis", label: "Applied analysis" }] : []),
      ...(note.examTips.length ? [{ id: "exam-tips", label: "Exam tips" }] : []),
      ...(note.commonMistakes.length ? [{ id: "common-mistakes", label: "Common mistakes" }] : []),
      ...(note.quickRecall.length ? [{ id: "quick-recall", label: "Quick recall" }] : []),
      ...(note.relatedTopics.length ? [{ id: "related-topics", label: "Related topics" }] : []),
    ];
  }, [examFocus, note, topicVisual]);

  if (!lookup) {
    return (
      <div className="page-container page-container--reading">
        <div className="error-panel" role="alert">
          <AlertCircle aria-hidden="true" />
          <h1>Topic not found</h1>
          <p>This URL does not match a topic in {subjectCode || "the study hub"}.</p>
          <Link className="button button--primary" href={paths.subjectNotes(subjectCode)}>Return to subject notes</Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container page-container--reading">
        <div className="error-panel" role="alert">
          <AlertCircle aria-hidden="true" />
          <h1>These notes could not load</h1>
          <p>The topic exists, but its data failed to load. Refresh once or return to the topic list.</p>
          <Link className="button button--primary" href={paths.subjectNotes(subjectCode)}>Back to notes</Link>
        </div>
      </div>
    );
  }

  if (!note) return <div className="page-container page-container--reading"><TopicLoading /></div>;

  const neighbours = getTopicNeighbours(lookup.subject, lookup.topic);

  return (
    <div
      className="topic-page"
      style={{ "--subject-accent": lookup.subject.accent, "--subject-soft": lookup.subject.accentSoft, "--subject-dark-accent": lookup.subject.darkAccent } as React.CSSProperties}
    >
      <div className="topic-page__grid">
        <article className="note-article">
          <TopicHeader
            subject={lookup.subject}
            note={note}
            bookmarked={study.isBookmarked(lookup.key)}
            completed={study.isCompleted(lookup.key)}
            onBookmark={() => study.toggleBookmark(lookup.key)}
            onCompleted={() => study.toggleCompleted(lookup.key)}
          />
          <TableOfContents items={tocItems} variant="mobile" />
          {note.contentDepth === "quick" ? (
            <div className="quick-note-notice" role="note">
              <strong>Quick guide</strong>
              <p>This topic preserves the legacy syllabus orientation but does not yet have full textbook-style coverage. Use it as a checklist, not as your only source.</p>
            </div>
          ) : null}
          <Overview text={note.overview} />
          <SyllabusChecklist points={note.syllabusPoints} topicKey={lookup.key} />
          <Definitions definitions={note.definitions} />
          <TopicVisual visual={topicVisual} />
          <ConceptDiagramBlock diagram={note.diagram} />
          <div className="core-content complete-notes" id="complete-notes">
            <div className="complete-notes__heading">
              <span>COMPLETE EXAM NOTES</span>
              <h2>Learn the content and the mark scheme together</h2>
              <p>Each explanation is followed by the answer method, recurring question patterns and the exact details that distinguish a full-credit response.</p>
            </div>
            {note.sections.map((section, index) => <NoteSection section={section} number={index + 1} key={section.id} />)}
            <ExamFocusBlock focus={examFocus} />
          </div>
          <FormulaList formulas={note.formulas} />
          <ComparisonTableBlock table={note.comparisonTable} />
          <AnalysisChains chains={note.analysisChains} />
          <ExamTips tips={note.examTips} />
          <CommonMistakes mistakes={note.commonMistakes} />
          <QuickRecall items={note.quickRecall} />
          <RelatedTopics subjectCode={subjectCode} topicIds={note.relatedTopics} />
          <AdditionalResources subject={lookup.subject} />
          <TopicNavigation previous={neighbours.previous} next={neighbours.next} />
        </article>
        <TableOfContents items={tocItems} variant="desktop" />
      </div>
    </div>
  );
}
