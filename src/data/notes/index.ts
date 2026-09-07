import { noteLoaders } from "./registry";
import { getTopic } from "@/src/data/subjects";
import type { TopicNote } from "@/src/types/content";

function createQuickNote(subjectCode: string, topicId: string): TopicNote | null {
  const lookup = getTopic(subjectCode, topicId);
  if (!lookup) return null;

  const { topic, unit } = lookup;
  return {
    id: topic.id,
    subject: subjectCode,
    level: topic.level,
    unitId: unit.id,
    unitTitle: unit.title,
    title: topic.title,
    contentDepth: "quick",
    overview: topic.summary,
    syllabusPoints: topic.focusPoints,
    definitions: [],
    sections: [
      {
        id: "01-core-focus",
        title: "Core focus",
        content: [
          "Use this page as a syllabus orientation and revision checklist. Detailed textbook-style notes for this topic are planned; the focus points below are already searchable and can be marked as studied.",
        ],
        bullets: topic.focusPoints,
        examples: [],
      },
    ],
    formulas: [],
    comparisonTable: null,
    diagram: null,
    analysisChains: [],
    examTips: [],
    commonMistakes: [],
    quickRecall: topic.focusPoints,
    relatedTopics: [],
  };
}

export async function loadTopicNote(subjectCode: string, topicId: string) {
  const key = `${subjectCode}:${topicId}`;
  const loader = noteLoaders[key];
  if (!loader) return createQuickNote(subjectCode, topicId);
  return loader();
}
