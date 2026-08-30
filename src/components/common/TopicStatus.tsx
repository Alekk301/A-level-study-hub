import { Check, Circle, Star } from "lucide-react";

export function TopicStatus({
  completed,
  bookmarked,
}: {
  completed: boolean;
  bookmarked: boolean;
}) {
  return (
    <span className="topic-status" aria-label={`${completed ? "Studied" : "Not studied"}${bookmarked ? ", bookmarked" : ""}`}>
      {completed ? <Check aria-hidden="true" /> : <Circle aria-hidden="true" />}
      {bookmarked ? <Star className="topic-status__star" aria-hidden="true" /> : null}
    </span>
  );
}
