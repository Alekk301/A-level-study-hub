import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTopic } from "@/src/data/subjects";
import { paths } from "@/src/utils/paths";

export function RelatedTopics({ subjectCode, topicIds }: { subjectCode: string; topicIds: string[] }) {
  const topics = topicIds.map((id) => getTopic(subjectCode, id)).filter((entry) => Boolean(entry));
  if (!topics.length) return null;
  return (
    <section className="note-block related-topics" id="related-topics" aria-labelledby="related-heading">
      <div className="note-block__heading">
        <p className="section-kicker">Related topics</p>
        <h2 id="related-heading">Keep the ideas connected</h2>
      </div>
      <div>
        {topics.map((entry) => entry && (
          <Link href={paths.topic(subjectCode, entry.topic.id)} key={entry.key}>
            <span>{entry.topic.id}</span><strong>{entry.topic.title}</strong><ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
