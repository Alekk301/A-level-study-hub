"use client";

import Link from "next/link";
import { BookmarkMinus, CheckCircle2 } from "lucide-react";
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

  return (
    <PageContainer>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Bookmarks</p>
          <h1>Saved topics</h1>
          <p>Keep difficult chapters and next-up revision in one short list.</p>
        </div>
      </header>

      {!study.hydrated ? <p className="quiet-empty" role="status">Loading saved topics…</p> : null}
      {study.hydrated && !entries.length ? (
        <EmptyState
          title="No bookmarks yet"
          description="Open a revision note and choose Bookmark. Your saved topics will appear here."
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
    </PageContainer>
  );
}
