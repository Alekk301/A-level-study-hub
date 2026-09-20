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
  partOrder?: number;
  linkAnchor?: string;
  linkTitle?: string;
}

const mathematicsCoursebookChapters: Record<string, CoursebookChapterDefinition | CoursebookChapterDefinition[]> = {
  "1.1": { number: "1", title: "Quadratics", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.2": { number: "2", title: "Functions", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.3": { number: "3", title: "Coordinate geometry", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.4": { number: "4", title: "Circular measure", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.5": { number: "5", title: "Trigonometry", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.6": { number: "6", title: "Series", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.7": { number: "7", title: "Differentiation", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "1.8": { number: "8", title: "Integration", partTitle: "Paper 1 · Pure Mathematics 1", partOrder: 1 },
  "2.1": { number: "1", title: "Algebra", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "2.2": { number: "2", title: "Logarithmic and exponential functions", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "2.3": { number: "3", title: "Trigonometry", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "2.4": { number: "4", title: "Differentiation", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "2.5": { number: "5", title: "Integration", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "2.6": { number: "6", title: "Numerical solutions of equations", partTitle: "Paper 2 · Pure Mathematics 2", partOrder: 2 },
  "3.1": [
    { number: "1", title: "Algebra", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
    { number: "7", title: "Further algebra", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  ],
  "3.2": { number: "2", title: "Logarithmic and exponential functions", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "3.3": { number: "3", title: "Trigonometry", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "3.4": [
    { number: "4", title: "Differentiation", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
    { number: "8", title: "Further calculus", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  ],
  "3.5": [
    { number: "5", title: "Integration", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
    { number: "8", title: "Further calculus", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  ],
  "3.6": { number: "6", title: "Numerical solutions of equations", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "3.7": { number: "9", title: "Vectors", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "3.8": { number: "10", title: "Differential equations", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "3.9": { number: "11", title: "Complex numbers", partTitle: "Paper 3 · Pure Mathematics 3", partOrder: 3 },
  "4.1": { number: "1", title: "Forces and equilibrium", partTitle: "Paper 4 · Mechanics", partOrder: 4 },
  "4.2": { number: "2", title: "Kinematics of motion in a straight line", partTitle: "Paper 4 · Mechanics", partOrder: 4 },
  "4.3": { number: "3", title: "Momentum", partTitle: "Paper 4 · Mechanics", partOrder: 4 },
  "4.4": { number: "4", title: "Newton's laws of motion", partTitle: "Paper 4 · Mechanics", partOrder: 4 },
  "4.5": { number: "5", title: "Energy, work and power", partTitle: "Paper 4 · Mechanics", partOrder: 4 },
  "5.1": { number: "1", title: "Representation of data", partTitle: "Paper 5 · Probability & Statistics 1", partOrder: 5 },
  "5.2": { number: "2", title: "Permutations and combinations", partTitle: "Paper 5 · Probability & Statistics 1", partOrder: 5 },
  "5.3": { number: "3", title: "Probability", partTitle: "Paper 5 · Probability & Statistics 1", partOrder: 5 },
  "5.4": { number: "4", title: "Discrete random variables", partTitle: "Paper 5 · Probability & Statistics 1", partOrder: 5 },
  "5.5": { number: "5", title: "The normal distribution", partTitle: "Paper 5 · Probability & Statistics 1", partOrder: 5 },
  "6.1": { number: "1", title: "The Poisson distribution", partTitle: "Paper 6 · Probability & Statistics 2", partOrder: 6 },
  "6.2": { number: "2", title: "Linear combinations of random variables", partTitle: "Paper 6 · Probability & Statistics 2", partOrder: 6 },
  "6.3": { number: "3", title: "Continuous random variables", partTitle: "Paper 6 · Probability & Statistics 2", partOrder: 6 },
  "6.4": { number: "4", title: "Sampling and estimation", partTitle: "Paper 6 · Probability & Statistics 2", partOrder: 6 },
  "6.5": { number: "5", title: "Hypothesis tests", partTitle: "Paper 6 · Probability & Statistics 2", partOrder: 6 },
};

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

const businessCoursebookChapters: Record<string, CoursebookChapterDefinition | CoursebookChapterDefinition[]> = {
  "1.1": { number: "1", title: "Enterprise", partTitle: "Unit 1 · Business and its environment", partOrder: 1 },
  "1.2": { number: "2", title: "Business structure", partTitle: "Unit 1 · Business and its environment", partOrder: 1 },
  "1.3": { number: "3", title: "Size of business", partTitle: "Unit 1 · Business and its environment", partOrder: 1 },
  "1.4": { number: "4", title: "Business objectives", partTitle: "Unit 1 · Business and its environment", partOrder: 1 },
  "1.5": { number: "5", title: "Stakeholders in a business", partTitle: "Unit 1 · Business and its environment", partOrder: 1 },
  "6.1": [
    { number: "6", title: "External influences on business activity", partTitle: "Unit 1 · Business and its environment", partOrder: 1, linkAnchor: "01-political-and-legal-influences" },
    { number: "7", title: "External economic influences on business activity", partTitle: "Unit 1 · Business and its environment", partOrder: 1, linkAnchor: "02-economic-influences" },
  ],
  "6.2": [
    { number: "8", title: "Business strategy", partTitle: "Unit 1 · Business and its environment", partOrder: 1, linkAnchor: "01-strategic-management-process" },
    { number: "9", title: "Corporate planning and implementation", partTitle: "Unit 1 · Business and its environment", partOrder: 1, linkAnchor: "07-corporate-planning-and-culture" },
  ],
  "2.1": { number: "10", title: "Human resource management", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "2.2": { number: "11", title: "Motivation", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "2.3": { number: "12", title: "Management", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "7.1": { number: "13", title: "Organisational structure", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "7.2": { number: "14", title: "Business communication", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "7.3": { number: "15", title: "Leadership", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "7.4": { number: "16", title: "Human resource management strategy", partTitle: "Unit 2 · People in organisations", partOrder: 2 },
  "3.1": { number: "17", title: "The nature of marketing", partTitle: "Unit 3 · Marketing", partOrder: 3 },
  "3.2": { number: "18", title: "Market research", partTitle: "Unit 3 · Marketing", partOrder: 3 },
  "3.3": [
    { number: "19", title: "The marketing mix — product and price", partTitle: "Unit 3 · Marketing", partOrder: 3, linkAnchor: "01-product-benefits-differentiation-and-portfolio" },
    { number: "20", title: "The marketing mix — promotion and place", partTitle: "Unit 3 · Marketing", partOrder: 3, linkAnchor: "05-promotion-objectives-and-methods" },
  ],
  "8.1": { number: "21", title: "Marketing analysis", partTitle: "Unit 3 · Marketing", partOrder: 3 },
  "8.2": { number: "22", title: "Marketing strategy", partTitle: "Unit 3 · Marketing", partOrder: 3 },
  "4.1": { number: "23", title: "The nature of operations", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "4.2": { number: "24", title: "Inventory management", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "4.3": { number: "25", title: "Capacity utilisation and outsourcing", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "9.1": { number: "26", title: "Location and scale", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "9.2": { number: "27", title: "Quality management", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "9.3": { number: "28", title: "Operations strategy", partTitle: "Unit 4 · Operations management", partOrder: 4 },
  "5.1": { number: "29", title: "Business finance", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "5.2": { number: "29", title: "Business finance", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "5.3": { number: "30", title: "Forecasting and managing cash flows", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "5.4": { number: "31", title: "Costs", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "5.5": { number: "32", title: "Budgets", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "10.1": { number: "33", title: "Financial statements", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "10.2": { number: "34", title: "Analysis of published accounts", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "10.3": { number: "35", title: "Investment appraisal", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
  "10.4": { number: "36", title: "Finance and accounting strategy", partTitle: "Unit 5 · Finance and accounting", partOrder: 5 },
};

export interface NoteChapter {
  key: string;
  number: string;
  title: string;
  unitTitle: string;
  partTitle?: string;
  partOrder?: number;
  linkAnchor?: string;
  linkTitle?: string;
  topics: TopicLookup[];
}

/** Groups routed notes beneath the numbered chapters used by the course structure. */
export function getNoteChapters(subject: Subject, level: StudyLevel): NoteChapter[] {
  const groupedTopics = new Map<string, { definition: CoursebookChapterDefinition; topics: TopicLookup[] }>();

  for (const entry of getTopicsForLevel(subject, level)) {
    const syllabusChapterNumber = entry.topic.id.split(".")[0];
    const coursebookPlacement = subject.code === "9709"
      ? mathematicsCoursebookChapters[entry.topic.id]
      : subject.code === "9618"
        ? computerScienceCoursebookChapters[entry.topic.id]
        : subject.code === "9609"
          ? businessCoursebookChapters[entry.topic.id]
          : null;
    const fallbackDefinition: CoursebookChapterDefinition = {
      number: syllabusChapterNumber,
      title: coursebookChapterTitles[subject.code]?.[syllabusChapterNumber]
        ?? (entry.topic.id.includes(".") ? entry.unit.title : entry.topic.title),
    };
    const definitions = coursebookPlacement
      ? (Array.isArray(coursebookPlacement) ? coursebookPlacement : [coursebookPlacement])
      : [fallbackDefinition];

    for (const definition of definitions) {
      const groupKey = `${definition.partTitle ?? entry.unit.title}:${definition.number}`;
      const chapter = groupedTopics.get(groupKey) ?? { definition, topics: [] };
      chapter.topics.push(entry);
      groupedTopics.set(groupKey, chapter);
    }
  }

  return Array.from(groupedTopics, ([groupKey, chapter]) => {
    const { definition, topics } = chapter;
    const firstTopic = topics[0];

    return {
      key: `${subject.code}:${level}:${groupKey}`,
      number: definition.number,
      title: definition.title,
      unitTitle: firstTopic.unit.title,
      partTitle: definition.partTitle,
      partOrder: definition.partOrder,
      linkAnchor: definition.linkAnchor,
      linkTitle: definition.linkTitle,
      topics,
    };
  }).sort((first, second) => (
    (first.partOrder ?? 0) - (second.partOrder ?? 0)
    || Number(first.number) - Number(second.number)
  ));
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
