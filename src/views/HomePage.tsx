"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, BookOpenText, Clock3, FileText } from "lucide-react";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ProgressLine } from "@/src/components/common/ProgressLine";
import { SubjectIcon } from "@/src/components/common/SubjectIcon";
import { subjects, resolveTopicKey } from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import { paths } from "@/src/utils/paths";

export function HomePage() {
  const study = useStudy();
  const fallback = resolveTopicKey("9618:13.2");
  const continueTopic = resolveTopicKey(study.lastOpened) ?? fallback;
  const recentTopics = study.recent
    .map((entry) => resolveTopicKey(entry.key))
    .filter((entry) => Boolean(entry))
    .slice(0, 4);
  const bookmarkedTopics = study.bookmarks
    .map((key) => resolveTopicKey(key))
    .filter((entry) => Boolean(entry))
    .slice(0, 4);

  return (
    <PageContainer>
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">CAIE A-Level revision</p>
          <h1>Study with less friction.</h1>
          <p>Four subjects, focused notes, paper metadata and your progress—kept quiet and close at hand.</p>
        </div>
        <div className="dashboard-heading__actions">
          <Link className="button button--primary" href={paths.notes}>
            <BookOpenText aria-hidden="true" /> Browse notes
          </Link>
          <Link className="button button--secondary" href={paths.papers}>
            <FileText aria-hidden="true" /> Past papers
          </Link>
        </div>
      </header>

      {continueTopic ? (
        <section className="continue-strip" style={{ "--subject-accent": continueTopic.subject.accent } as React.CSSProperties}>
          <div className="continue-strip__label">
            <span>{study.lastOpened ? "Continue studying" : "Start here"}</span>
            <small>{continueTopic.subject.name} · {continueTopic.topic.level}</small>
          </div>
          <div className="continue-strip__topic">
            <span className="topic-number">{continueTopic.topic.id}</span>
            <strong>{continueTopic.topic.title}</strong>
          </div>
          <Link href={paths.topic(continueTopic.subject.code, continueTopic.topic.id)}>
            Continue <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      ) : null}

      <section className="dashboard-section" aria-labelledby="subjects-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your subjects</p>
            <h2 id="subjects-heading">Choose what to revise</h2>
          </div>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => {
            const topics = subject.units.flatMap((unit) => unit.topics);
            const complete = topics.filter((topic) => study.isCompleted(`${subject.code}:${topic.id}`)).length;
            return (
              <article
                className="subject-card"
                key={subject.code}
                style={{ "--subject-accent": subject.accent, "--subject-soft": subject.accentSoft } as React.CSSProperties}
              >
                <Link href={paths.subject(subject.code)} className="subject-card__main">
                  <span className="subject-card__icon"><SubjectIcon code={subject.code} /></span>
                  <span>
                    <small>{subject.code}</small>
                    <strong>{subject.name}</strong>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
                <ProgressLine completed={complete} total={topics.length} label="Topics studied" compact />
                <div className="subject-card__links">
                  <Link href={paths.subjectNotes(subject.code)}>Notes</Link>
                  <Link href={paths.subjectPapers(subject.code)}>Papers</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="dashboard-columns">
        <section className="dashboard-section" aria-labelledby="recent-heading">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow"><Clock3 aria-hidden="true" /> Recent topics</p>
              <h2 id="recent-heading">Pick up your thread</h2>
            </div>
          </div>
          {recentTopics.length ? (
            <ol className="topic-list-plain">
              {recentTopics.map((entry) => entry && (
                <li key={entry.key}>
                  <Link href={paths.topic(entry.subject.code, entry.topic.id)}>
                    <span>{entry.subject.code} · {entry.topic.id}</span>
                    <strong>{entry.topic.title}</strong>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="quiet-empty">Open a topic and it will appear here.</p>
          )}
        </section>

        <section className="dashboard-section" aria-labelledby="bookmarks-heading">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow"><Bookmark aria-hidden="true" /> Bookmarks</p>
              <h2 id="bookmarks-heading">Saved for later</h2>
            </div>
            <Link href={paths.bookmarks}>View all</Link>
          </div>
          {bookmarkedTopics.length ? (
            <ol className="topic-list-plain">
              {bookmarkedTopics.map((entry) => entry && (
                <li key={entry.key}>
                  <Link href={paths.topic(entry.subject.code, entry.topic.id)}>
                    <span>{entry.subject.code} · {entry.topic.id}</span>
                    <strong>{entry.topic.title}</strong>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="quiet-empty">Bookmark important topics from any note page.</p>
          )}
        </section>
      </div>

      <footer className="maker-credit" aria-label="Site credit">
        <span>Made by</span>
        <strong>Alex Le</strong>
      </footer>
    </PageContainer>
  );
}
