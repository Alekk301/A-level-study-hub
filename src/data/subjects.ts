import subjectsJson from "./subjects.json";
import type {
  Subject,
  StudyLevel,
  TopicLookup,
  TopicMeta,
} from "@/src/types/content";

export const subjects = subjectsJson as unknown as Subject[];

export const subjectByCode = new Map(
  subjects.map((subject) => [subject.code, subject]),
);

export const getSubject = (code: string | undefined | null) =>
  code ? subjectByCode.get(code) ?? null : null;

export const getTopicKey = (subjectCode: string, topicId: string) =>
  `${subjectCode}:${topicId}`;

export const allTopics: TopicLookup[] = subjects.flatMap((subject) =>
  subject.units.flatMap((unit) =>
    unit.topics.map((topic) => ({
      subject,
      unit,
      topic,
      key: getTopicKey(subject.code, topic.id),
    })),
  ),
);

export const topicByKey = new Map(allTopics.map((entry) => [entry.key, entry]));

export function getTopic(
  subjectCode: string | undefined | null,
  topicId: string | undefined | null,
) {
  if (!subjectCode || !topicId) return null;
  return topicByKey.get(getTopicKey(subjectCode, topicId)) ?? null;
}

export function getTopicsForLevel(subject: Subject, level: StudyLevel) {
  return subject.units.flatMap((unit) =>
    unit.topics
      .filter((topic) => topic.levels.includes(level))
      .map((topic) => ({
        subject,
        unit,
        topic,
        key: getTopicKey(subject.code, topic.id),
      })),
  );
}

export function getTopicNeighbours(subject: Subject, topic: TopicMeta) {
  const level = topic.levels.includes("A2") ? "A2" : "AS";
  const topics = getTopicsForLevel(subject, level);
  const index = topics.findIndex((entry) => entry.topic.id === topic.id);
  return {
    previous: index > 0 ? topics[index - 1] : null,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : null,
  };
}

export function resolveTopicKey(key: string | null | undefined) {
  return key ? topicByKey.get(key) ?? null : null;
}
