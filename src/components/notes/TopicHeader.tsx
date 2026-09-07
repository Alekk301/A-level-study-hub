import { Bookmark, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Subject, TopicNote } from "@/src/types/content";

export function TopicHeader({
  subject,
  note,
  bookmarked,
  completed,
  onBookmark,
  onCompleted,
}: {
  subject: Subject;
  note: TopicNote;
  bookmarked: boolean;
  completed: boolean;
  onBookmark: () => void;
  onCompleted: () => void;
}) {
  return (
    <header className="topic-header">
      <div className="topic-header__meta">
        <span>{subject.code}</span>
        <span>{note.level}</span>
        <span>{note.unitTitle}</span>
        <span className={`depth-label depth-label--${note.contentDepth}`}>
          {note.contentDepth === "full" ? "Full notes" : note.contentDepth === "in-depth" ? "In depth" : "Quick guide"}
        </span>
      </div>
      <p className="topic-header__number">{note.id}</p>
      <h1>{note.title}</h1>
      <div className="topic-header__actions" aria-label="Topic actions">
        <Button
          type="button"
          variant="outline"
          aria-pressed={bookmarked}
          onClick={onBookmark}
          className={bookmarked ? "is-active" : ""}
        >
          <Bookmark aria-hidden="true" fill={bookmarked ? "currentColor" : "none"} />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-pressed={completed}
          onClick={onCompleted}
          className={completed ? "is-complete" : ""}
        >
          <CheckCircle2 aria-hidden="true" />
          {completed ? "Studied" : "Mark as studied"}
        </Button>
      </div>
    </header>
  );
}
