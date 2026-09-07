"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, ExternalLink, FileText } from "lucide-react";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ProgressLine } from "@/src/components/common/ProgressLine";
import { SubjectIcon } from "@/src/components/common/SubjectIcon";
import { getSubject, getTopicsForLevel } from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import { paths } from "@/src/utils/paths";

export function SubjectPage({ subjectCode }: { subjectCode: string }) {
  const study = useStudy();
  const subject = getSubject(subjectCode);

  if (!subject) {
    return (
      <PageContainer>
        <div className="error-panel" role="alert">
          <h1>Subject not found</h1>
          <p>Check the four-digit syllabus code or return to the dashboard.</p>
          <Link className="button button--primary" href="/">Return home</Link>
        </div>
      </PageContainer>
    );
  }

  const a2Topics = getTopicsForLevel(subject, "A2");
  const completed = a2Topics.filter((entry) => study.isCompleted(entry.key)).length;
  const priority = a2Topics.slice(0, 8);

  return (
    <PageContainer>
      <header
        className="subject-hero"
        style={{ "--subject-accent": subject.accent, "--subject-soft": subject.accentSoft } as React.CSSProperties}
      >
        <div className="subject-hero__icon"><SubjectIcon code={subject.code} /></div>
        <div>
          <p className="eyebrow">Cambridge International · {subject.syllabusYears}</p>
          <h1>{subject.name}</h1>
          <p>{subject.description}</p>
        </div>
        <div className="subject-hero__code">{subject.code}</div>
      </header>

      <div className="subject-actions">
        <Link className="button button--primary" href={paths.subjectNotes(subject.code)}>
          <BookOpenText aria-hidden="true" /> Open revision notes
        </Link>
        <Link className="button button--secondary" href={paths.subjectPapers(subject.code)}>
          <FileText aria-hidden="true" /> Browse papers
        </Link>
      </div>

      <section className="subject-progress-panel" aria-labelledby="subject-progress">
        <div>
          <p className="eyebrow">A2 study progress</p>
          <h2 id="subject-progress">{completed === a2Topics.length && a2Topics.length ? "A2 topic list complete" : "Keep the chain moving"}</h2>
          <p>Mark a topic as studied from its note page. Progress is stored on this device.</p>
        </div>
        <ProgressLine completed={completed} total={a2Topics.length} label="A2 topics studied" />
      </section>

      <div className="subject-columns">
        <section className="dashboard-section" aria-labelledby="a2-topics-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A2 focus</p>
              <h2 id="a2-topics-heading">Priority topics</h2>
            </div>
            <Link href={paths.subjectNotes(subject.code)}>All notes</Link>
          </div>
          <ol className="topic-list-plain topic-list-plain--numbered">
            {priority.map((entry) => (
              <li key={entry.key}>
                <Link href={paths.topic(subject.code, entry.topic.id)}>
                  <span>{entry.topic.id}</span>
                  <strong>{entry.topic.title}</strong>
                  <small>{study.isCompleted(entry.key) ? "Studied" : entry.topic.contentDepth === "full" ? "Full notes" : "Quick guide"}</small>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <aside className="resource-panel" aria-labelledby="resources-heading">
          <p className="eyebrow">Additional resources</p>
          <h2 id="resources-heading">Check, practise, extend</h2>
          <p>Your notes remain the main experience. These links are for official syllabus checking and optional further reading.</p>
          <ul>
            {subject.resources
              .filter((resource) => resource.category !== "papers")
              .map((resource) => (
                <li key={`${resource.source}-${resource.url}`}>
                  <a href={resource.url} target="_blank" rel="noreferrer">
                    <span><small>{resource.source}</small><strong>{resource.title}</strong></span>
                    <ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </PageContainer>
  );
}
