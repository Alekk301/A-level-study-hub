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

interface CoursebookChapterDefinition {
  number: string;
  title: string;
  partTitle?: string;
  linkAnchor?: string;
  linkTitle?: string;
}

const computerScienceCoursebookChapters: Record<string, CoursebookChapterDefinition | CoursebookChapterDefinition[]> = {
  "1.1": { number: "1", title: "Information representation", partTitle: "Part 1 · Theory fundamentals" },
  "1.2": { number: "1", title: "Information representation", partTitle: "Part 1 · Theory fundamentals" },
  "1.3": { number: "1", title: "Information representation", partTitle: "Part 1 · Theory fundamentals" },
  "2.1": { number: "2", title: "Communication and networking technologies", partTitle: "Part 1 · Theory fundamentals" },
  "3.1": { number: "3", title: "Hardware", partTitle: "Part 1 · Theory fundamentals" },
  "3.2": { number: "4", title: "Logic gates and logic circuits", partTitle: "Part 1 · Theory fundamentals" },
  "4.1": { number: "5", title: "Processor fundamentals", partTitle: "Part 1 · Theory fundamentals" },
  "4.2": { number: "6", title: "Assembly language programming", partTitle: "Part 1 · Theory fundamentals" },
  "4.3": { number: "7", title: "Monitoring and control systems", partTitle: "Part 1 · Theory fundamentals" },
  "5.1": { number: "8", title: "System software", partTitle: "Part 1 · Theory fundamentals" },
  "5.2": { number: "8", title: "System software", partTitle: "Part 1 · Theory fundamentals" },
  "6.1": { number: "9", title: "Security, privacy and data integrity", partTitle: "Part 1 · Theory fundamentals" },
  "6.2": { number: "9", title: "Security, privacy and data integrity", partTitle: "Part 1 · Theory fundamentals" },
  "7.1": { number: "10", title: "Ethics and ownership", partTitle: "Part 1 · Theory fundamentals" },
  "8.1": { number: "11", title: "Databases", partTitle: "Part 1 · Theory fundamentals" },
  "8.2": { number: "11", title: "Databases", partTitle: "Part 1 · Theory fundamentals" },
  "8.3": { number: "11", title: "Databases", partTitle: "Part 1 · Theory fundamentals" },
  "9.1": { number: "12", title: "Algorithm design and problem-solving", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "9.2": { number: "12", title: "Algorithm design and problem-solving", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "10.1": { number: "13", title: "Data types and structures", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "10.2": { number: "13", title: "Data types and structures", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "10.3": { number: "13", title: "Data types and structures", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "10.4": { number: "13", title: "Data types and structures", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "11.1": { number: "14", title: "Programming and data representation", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "11.2": { number: "14", title: "Programming and data representation", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "11.3": { number: "14", title: "Programming and data representation", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "12.1": { number: "15", title: "Software development", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "12.2": { number: "15", title: "Software development", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "12.3": { number: "15", title: "Software development", partTitle: "Part 2 · Fundamental problem-solving and programming skills" },
  "13.1": { number: "16", title: "Data representation", partTitle: "Part 3 · Advanced theory" },
  "13.2": { number: "16", title: "Data representation", partTitle: "Part 3 · Advanced theory" },
  "13.3": { number: "16", title: "Data representation", partTitle: "Part 3 · Advanced theory" },
  "14.1": { number: "17", title: "Communication and Internet technologies", partTitle: "Part 3 · Advanced theory" },
  "14.2": { number: "17", title: "Communication and Internet technologies", partTitle: "Part 3 · Advanced theory" },
  "15.1": { number: "18", title: "Hardware and virtual machines", partTitle: "Part 3 · Advanced theory" },
  "15.2": { number: "19", title: "Logic circuits and Boolean algebra", partTitle: "Part 3 · Advanced theory" },
  "16.1": { number: "20", title: "System software", partTitle: "Part 3 · Advanced theory" },
  "16.2": { number: "20", title: "System software", partTitle: "Part 3 · Advanced theory" },
  "17.1": { number: "21", title: "Security", partTitle: "Part 3 · Advanced theory" },
  "18.1": { number: "22", title: "Artificial Intelligence (AI)", partTitle: "Part 3 · Advanced theory" },
  "19.1": { number: "23", title: "Algorithms", partTitle: "Part 4 · Further problem-solving and programming skills" },
  "19.2": { number: "24", title: "Recursion", partTitle: "Part 4 · Further problem-solving and programming skills" },
  "20.1": [
    {
      number: "25",
      title: "Programming paradigms",
      partTitle: "Part 4 · Further problem-solving and programming skills",
      linkAnchor: "02-imperative-procedural-programming",
      linkTitle: "Open programming paradigms overview",
    },
    {
      number: "27",
      title: "Object-oriented programming (OOP)",
      partTitle: "Part 4 · Further problem-solving and programming skills",
      linkAnchor: "03-classes-and-objects",
      linkTitle: "Open object-oriented programming notes",
    },
    {
      number: "28",
      title: "Low-level programming",
      partTitle: "Part 4 · Further problem-solving and programming skills",
      linkAnchor: "01-low-level-programming-and-addressing",
      linkTitle: "Open low-level programming notes",
    },
    {
      number: "29",
      title: "Declarative programming",
      partTitle: "Part 4 · Further problem-solving and programming skills",
      linkAnchor: "05-declarative-programming",
      linkTitle: "Open declarative programming notes",
    },
  ],
  "20.2": { number: "26", title: "File processing and exception handling", partTitle: "Part 4 · Further problem-solving and programming skills" },
};

export interface NoteChapter {
  key: string;
  number: string;
  title: string;
  unitTitle: string;
  partTitle?: string;
  linkAnchor?: string;
  linkTitle?: string;
  topics: TopicLookup[];
}

/** Groups routed notes beneath the numbered chapters used by the course structure. */
export function getNoteChapters(subject: Subject, level: StudyLevel): NoteChapter[] {
  const groupedTopics = new Map<string, { definition: CoursebookChapterDefinition; topics: TopicLookup[] }>();

  for (const entry of getTopicsForLevel(subject, level)) {
    const syllabusChapterNumber = entry.topic.id.split(".")[0];
    const coursebookPlacement = subject.code === "9618"
      ? computerScienceCoursebookChapters[entry.topic.id]
      : null;
    const fallbackDefinition = {
      number: syllabusChapterNumber,
      title: coursebookChapterTitles[subject.code]?.[syllabusChapterNumber]
        ?? (entry.topic.id.includes(".") ? entry.unit.title : entry.topic.title),
    };
    const definitions = coursebookPlacement
      ? (Array.isArray(coursebookPlacement) ? coursebookPlacement : [coursebookPlacement])
      : [fallbackDefinition];

    for (const definition of definitions) {
      const chapter = groupedTopics.get(definition.number) ?? { definition, topics: [] };
      chapter.topics.push(entry);
      groupedTopics.set(definition.number, chapter);
    }
  }

  return Array.from(groupedTopics, ([number, chapter]) => {
    const { definition, topics } = chapter;
    const firstTopic = topics[0];

    return {
      key: `${subject.code}:${level}:${number}`,
      number,
      title: definition.title,
      unitTitle: firstTopic.unit.title,
      partTitle: definition.partTitle,
      linkAnchor: definition.linkAnchor,
      linkTitle: definition.linkTitle,
      topics,
    };
  }).sort((first, second) => Number(first.number) - Number(second.number));
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
