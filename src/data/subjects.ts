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

const coursebookChapterTitles: Record<string, Record<string, string>> = {
  "9618": {
    "1": "Information representation",
    "2": "Communication",
    "3": "Hardware",
    "4": "Processor fundamentals",
    "5": "System software",
    "6": "Security, privacy and data integrity",
    "7": "Ethics and ownership",
    "8": "Databases",
    "9": "Algorithm design and problem-solving",
    "10": "Data types and structures",
    "11": "Programming",
    "12": "Software development",
    "13": "Data representation",
    "14": "Communication and internet technologies",
    "15": "Hardware and virtual machines",
    "16": "System software",
    "17": "Security",
    "18": "Artificial intelligence",
    "19": "Computational thinking and problem-solving",
    "20": "Further programming",
  },
  "9609": {
    "1": "Business and its environment",
    "2": "People in organisations",
    "3": "Marketing",
    "4": "Operations management",
    "5": "Finance and accounting",
    "6": "Business and its environment",
    "7": "Human resource management",
    "8": "Marketing",
    "9": "Operations management",
    "10": "Finance and accounting",
  },
};

export interface NoteChapter {
  key: string;
  number: string;
  title: string;
  unitTitle: string;
  topics: TopicLookup[];
}

/** Groups routed notes beneath the numbered chapters used by the course structure. */
export function getNoteChapters(subject: Subject, level: StudyLevel): NoteChapter[] {
  const groupedTopics = new Map<string, TopicLookup[]>();

  for (const entry of getTopicsForLevel(subject, level)) {
    const chapterNumber = entry.topic.id.split(".")[0];
    const chapterTopics = groupedTopics.get(chapterNumber) ?? [];
    chapterTopics.push(entry);
    groupedTopics.set(chapterNumber, chapterTopics);
  }

  return Array.from(groupedTopics, ([number, topics]) => {
    const firstTopic = topics[0];
    const configuredTitle = coursebookChapterTitles[subject.code]?.[number];
    const title = configuredTitle
      ?? (topics.length === 1 ? firstTopic.topic.title : firstTopic.unit.title);

    return {
      key: `${subject.code}:${level}:${number}`,
      number,
      title,
      unitTitle: firstTopic.unit.title,
      topics,
    };
  });
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
