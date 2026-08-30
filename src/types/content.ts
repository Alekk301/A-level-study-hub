export type StudyLevel = "AS" | "A2";
export type ContentDepth = "full" | "in-depth" | "quick";

export interface TopicMeta {
  id: string;
  title: string;
  level: string;
  levels: StudyLevel[];
  summary: string;
  focusPoints: string[];
  contentDepth: ContentDepth;
}

export interface SubjectUnit {
  id: string;
  title: string;
  topics: TopicMeta[];
}

export interface ExternalResource {
  source: string;
  title: string;
  description: string;
  url: string;
  category: "official" | "papers" | "further-reading";
}

export interface Subject {
  code: string;
  slug: string;
  shortName: string;
  name: string;
  description: string;
  syllabusYears: string;
  accent: string;
  accentSoft: string;
  darkAccent: string;
  aliases: string[];
  units: SubjectUnit[];
  resources: ExternalResource[];
}

export interface Definition {
  term: string;
  definition: string;
}

export type ExampleKind =
  | "example"
  | "worked"
  | "pseudocode"
  | "formula"
  | "analysis";

export interface NoteExample {
  id: string;
  kind: ExampleKind;
  label: string;
  content: string;
}

export interface NoteSection {
  id: string;
  title: string;
  content: string[];
  bullets: string[];
  examples: NoteExample[];
}

export interface Formula {
  label: string;
  expression: string;
  note?: string;
}

export interface ComparisonTable {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface ConceptDiagram {
  title: string;
  type: "flow" | "layers" | "bits" | "cycle" | "stack";
  nodes: string[];
}

export interface AnalysisChain {
  title: string;
  steps: string[];
  evaluation: string;
}

export interface TopicNote {
  id: string;
  subject: string;
  level: string;
  unitId: string;
  unitTitle: string;
  title: string;
  contentDepth: ContentDepth;
  overview: string;
  syllabusPoints: string[];
  definitions: Definition[];
  sections: NoteSection[];
  formulas: Formula[];
  comparisonTable: ComparisonTable | null;
  diagram: ConceptDiagram | null;
  analysisChains: AnalysisChain[];
  examTips: string[];
  commonMistakes: string[];
  quickRecall: string[];
  relatedTopics: string[];
}

export interface TopicLookup {
  subject: Subject;
  unit: SubjectUnit;
  topic: TopicMeta;
  key: string;
}

export interface SearchFragment {
  kind: string;
  label?: string;
  text: string;
}

export interface SearchIndexEntry {
  key: string;
  subject: string;
  subjectName: string;
  level: string;
  levels: StudyLevel[];
  unitId: string;
  unitTitle: string;
  topicId: string;
  title: string;
  contentDepth: ContentDepth;
  aliases: string[];
  fragments: SearchFragment[];
}

export interface SearchMatch extends SearchIndexEntry {
  score: number;
  matchedFragment: SearchFragment;
}

export type PaperSession = "February-March" | "May-June" | "October-November";

export interface PaperRecord {
  subject: string;
  year: number;
  session: PaperSession;
  paper: string;
  qp: string | null;
  ms: string | null;
  er?: string | null;
  source?: "demo" | "downloader" | "manual";
}
