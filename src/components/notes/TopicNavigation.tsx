import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TopicLookup } from "@/src/types/content";
import { paths } from "@/src/utils/paths";

export function TopicNavigation({ previous, next }: { previous: TopicLookup | null; next: TopicLookup | null }) {
  return (
    <nav className="topic-navigation" aria-label="Adjacent topics">
      {previous ? (
        <Link href={paths.topic(previous.subject.code, previous.topic.id)} rel="prev">
          <ArrowLeft aria-hidden="true" /><span><small>Previous topic</small><strong>{previous.topic.id} {previous.topic.title}</strong></span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={paths.topic(next.subject.code, next.topic.id)} rel="next">
          <span><small>Next topic</small><strong>{next.topic.id} {next.topic.title}</strong></span><ArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
