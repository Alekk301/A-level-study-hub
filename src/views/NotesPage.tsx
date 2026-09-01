"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenText, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ProgressLine } from "@/src/components/common/ProgressLine";
import { TopicStatus } from "@/src/components/common/TopicStatus";
import {
  getNoteChapters,
  getSubject,
  getTopicsForLevel,
  resolveTopicKey,
  subjects,
} from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import type { StudyLevel } from "@/src/types/content";
import { paths } from "@/src/utils/paths";

export function NotesPage({ subjectCode }: { subjectCode?: string }) {
  const study = useStudy();
  const lastSubject = resolveTopicKey(study.lastOpened)?.subject.code;
  const initialCode = subjectCode ?? lastSubject ?? "9618";
  const [selectedCode, setSelectedCode] = useState(initialCode);
  const [level, setLevel] = useState<StudyLevel>("A2");

  const effectiveCode = subjectCode ?? selectedCode;
  const subject = getSubject(effectiveCode);
  const topics = useMemo(
    () => (subject ? getTopicsForLevel(subject, level) : []),
    [subject, level],
  );
  const chapters = useMemo(
    () => (subject ? getNoteChapters(subject, level) : []),
    [subject, level],
  );
  const completedCount = topics.filter((entry) => study.isCompleted(entry.key)).length;

  if (!subject) {
    return (
      <PageContainer>
        <div className="error-panel" role="alert">
          <h1>Subject not found</h1>
          <p>The requested subject code is not part of this study hub.</p>
          <Link className="button button--primary" href={paths.notes}>View all notes</Link>
        </div>
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
          <p className="eyebrow">Revision notes</p>
          <h1>{subject.name} <span>{subject.code}</span></h1>
          <p>{subject.description}</p>
        </div>
        {!subjectCode ? (
          <label className="field-label">
            Subject
            <select value={selectedCode} onChange={(event) => setSelectedCode(event.target.value)}>
              {subjects.map((option) => (
                <option value={option.code} key={option.code}>{option.code} · {option.name}</option>
              ))}
            </select>
          </label>
        ) : null}
      </header>

      <div className="notes-toolbar">
        <Tabs value={level} onValueChange={(value) => setLevel(value as StudyLevel)}>
          <TabsList aria-label="Study level">
            <TabsTrigger value="AS">AS Level</TabsTrigger>
            <TabsTrigger value="A2">A2 Level</TabsTrigger>
          </TabsList>
        </Tabs>
        <ProgressLine completed={completedCount} total={topics.length} label={`${level} progress`} compact />
      </div>

      <div className="catalog-introduction">
        <div>
          <p className="eyebrow">Course structure</p>
          <h2>{chapters.length} main chapter{chapters.length === 1 ? "" : "s"}</h2>
        </div>
        <p>Open a chapter to see its smaller syllabus topics and revision notes.</p>
      </div>

      <div className="notes-catalog">
        {chapters.map((chapter) => {
          const completedInChapter = chapter.topics.filter((entry) => study.isCompleted(entry.key)).length;
          const singleChapterNote = chapter.topics.length === 1 && !chapter.topics[0].topic.id.includes(".");
          const chapterPanelId = `chapter-${subject.code}-${level}-${chapter.number}`;

          return (
            <details className="note-chapter" key={chapter.key}>
              <summary aria-controls={chapterPanelId}>
                <span className="note-chapter__number">Chapter {chapter.number}</span>
                <span className="note-chapter__heading">
                  <strong>{chapter.title}</strong>
                  <small>
                    {chapter.partTitle ? <span>{chapter.partTitle} · </span> : null}
                    {singleChapterNote
                      ? `${chapter.topics[0].topic.focusPoints.length} key syllabus areas`
                      : `${chapter.topics.length} subtopic${chapter.topics.length === 1 ? "" : "s"}`}
                  </small>
                </span>
                <span className="note-chapter__progress">
                  {completedInChapter} / {chapter.topics.length} studied
                </span>
                <ChevronDown aria-hidden="true" />
              </summary>

              <div className="note-chapter__body" id={chapterPanelId}>
                {singleChapterNote ? (
                  <div className="note-chapter__focus">
                    <p>Inside this chapter</p>
                    <ul>
                      {chapter.topics[0].topic.focusPoints.map((focusPoint) => (
                        <li key={focusPoint}>{focusPoint}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <ol className="note-chapter__topics">
                  {chapter.topics.map((entry) => (
                    <li key={entry.key}>
                      <Link href={`${paths.topic(subject.code, entry.topic.id)}${chapter.linkAnchor ? `#${chapter.linkAnchor}` : ""}`}>
                        <TopicStatus completed={study.isCompleted(entry.key)} bookmarked={study.isBookmarked(entry.key)} />
                        <span className="topic-number">{entry.topic.id}</span>
                        <span className="topic-row__body">
                          <strong>{chapter.linkTitle ?? (singleChapterNote ? "Open complete chapter notes" : entry.topic.title)}</strong>
                          <small>{entry.topic.summary}</small>
                        </span>
                        <span className={`depth-label depth-label--${entry.topic.contentDepth}`}>
                          {entry.topic.contentDepth === "full" ? "Full notes" : entry.topic.contentDepth === "in-depth" ? "In depth" : "Quick guide"}
                        </span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          );
        })}
      </div>

      {!topics.length ? (
        <div className="quiet-empty"><BookOpenText aria-hidden="true" /> No topics are tagged for this level.</div>
      ) : null}
    </PageContainer>
  );
}
