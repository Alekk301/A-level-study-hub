"use client";

import Link from "next/link";
import { BookmarkMinus, CheckCircle2, Highlighter, Trash2 } from "lucide-react";
import { EmptyState } from "@/src/components/common/EmptyState";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { resolveTopicKey, subjects } from "@/src/data/subjects";
import { useStudy } from "@/src/hooks/use-study";
import { paths } from "@/src/utils/paths";

export function BookmarksPage() {
  const study = useStudy();
  const entries = study.bookmarks
    .map((key) => resolveTopicKey(key))
    .filter((entry) => Boolean(entry));
  const highlightedTopics = Object.entries(study.highlights)
    .map(([key, highlights]) => ({ entry: resolveTopicKey(key), highlights }))
    .filter((group) => Boolean(group.entry) && group.highlights.length > 0);
  const highlightCount = highlightedTopics.reduce(
    (total, group) => total + group.highlights.length,
    0,
  );

  return (
    <PageContainer>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Saved</p>
          <h1>Bookmarks &amp; highlights</h1>
          <p>Return to important topics and the exact lines you wanted to remember.</p>
        </div>
      </header>

      {!study.hydrated ? <p className="quiet-empty" role="status">Loading saved topics…</p> : null}
      {study.hydrated && !entries.length && !highlightCount ? (
        <EmptyState
          title="Nothing saved yet"
          description="Bookmark a topic or select a useful line in any revision note and highlight it."
          action={{ label: "Browse revision notes", href: paths.notes }}
        />
      ) : null}

      <div className="bookmark-groups">
        {subjects.map((subject) => {
          const subjectEntries = entries.filter((entry) => entry?.subject.code === subject.code);
          if (!subjectEntries.length) return null;
          return (
            <section key={subject.code} aria-labelledby={`bookmarks-${subject.code}`}>
              <header style={{ "--subject-accent": subject.accent } as React.CSSProperties}>
                <span>{subject.code}</span>
                <h2 id={`bookmarks-${subject.code}`}>{subject.name}</h2>
                <small>{subjectEntries.length} saved</small>
              </header>
              <ul>
                {subjectEntries.map((entry) => entry && (
                  <li key={entry.key}>
                    <Link href={paths.topic(subject.code, entry.topic.id)}>
                      <span className="topic-number">{entry.topic.id}</span>
                      <span><strong>{entry.topic.title}</strong><small>{entry.unit.title} · {entry.topic.level}</small></span>
                    </Link>
                    {study.isCompleted(entry.key) ? <span className="studied-badge"><CheckCircle2 aria-hidden="true" /> Studied</span> : null}
                    <button type="button" onClick={() => study.toggleBookmark(entry.key)} aria-label={`Remove bookmark for ${entry.topic.title}`}>
                      <BookmarkMinus aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {highlightCount ? (
        <section className="saved-highlights" aria-labelledby="saved-highlights-heading">
          <header>
            <span aria-hidden="true"><Highlighter /></span>
            <div>
              <p className="eyebrow">Highlights</p>
              <h2 id="saved-highlights-heading">Important lines</h2>
            </div>
            <small>{highlightCount} saved</small>
          </header>
          <div className="saved-highlights__topics">
            {highlightedTopics.map(({ entry, highlights }) => entry && (
              <article
                key={entry.key}
                style={{ "--subject-accent": entry.subject.accent } as React.CSSProperties}
              >
                <div className="saved-highlights__topic-heading">
                  <span>{entry.subject.code} · {entry.topic.id}</span>
                  <h3>{entry.topic.title}</h3>
                </div>
                <ul>
                  {highlights.map((highlight) => (
                    <li key={highlight.id}>
                      <Link
                        href={`${paths.topic(entry.subject.code, entry.topic.id)}?highlight=${encodeURIComponent(highlight.id)}`}
                      >
                        <q>{highlight.text}</q>
                        <small>Open in notes</small>
                      </Link>
                      <button
                        type="button"
                        onClick={() => study.removeHighlight(entry.key, highlight.id)}
                        aria-label={`Remove highlight: ${highlight.text.slice(0, 70)}`}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </PageContainer>
  );
}
