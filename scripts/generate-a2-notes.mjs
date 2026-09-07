import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mathA2 } from "./a2-note-content/math.mjs";
import { chemistryA2 } from "./a2-note-content/chemistry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const subjectsPath = path.join(root, "src/data/subjects.json");
const subjects = JSON.parse(await fs.readFile(subjectsPath, "utf8"));
const contentBySubject = { "9709": mathA2, "9701": chemistryA2 };

function asDefinition([term, definition]) {
  return { term, definition };
}

function asFormula([label, expression, note]) {
  return note ? { label, expression, note } : { label, expression };
}

function asRecall([question, answer]) {
  return { question, answer };
}

function buildNote(subject, unit, topic, content) {
  const sections = content.p.map(([title, text, bullets], index) => ({
    id: `${String(index + 1).padStart(2, "0")}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    title,
    content: [text],
    bullets,
    examples:
      index === 0 && content.f.length
        ? [{
            id: "01-key-relationship",
            kind: "formula",
            label: "Key relationship",
            content: `${content.f[0][0]}: ${content.f[0][1]}`,
          }]
        : [],
  }));

  return {
    id: topic.id,
    subject: subject.code,
    level: topic.level,
    unitId: unit.id,
    unitTitle: unit.title,
    title: topic.title,
    contentDepth: "full",
    overview: `${topic.summary} This guide turns the current syllabus outcomes into a connected revision sequence: learn the ideas, practise the method, then use the recall cards and checklist to diagnose what still needs work.`,
    syllabusPoints: content.s,
    definitions: content.d.map(asDefinition),
    sections,
    formulas: content.f.map(asFormula),
    comparisonTable: null,
    diagram: {
      title: `${topic.title}: revision route`,
      type: "flow",
      nodes: sections.map((section) => section.title),
    },
    analysisChains: [],
    examTips: [
      ...content.t,
      subject.code === "9709"
        ? "Show the mathematical setup and exact working before the final rounded answer; unsupported calculator output may not earn method marks."
        : "Use precise chemical vocabulary, balanced equations and stated conditions; link every observation or trend to particles, bonding or equilibrium.",
    ],
    commonMistakes: content.m,
    quickRecall: content.r.map(asRecall),
    relatedTopics: content.rel,
  };
}

let generated = 0;
for (const subject of subjects) {
  const contentMap = contentBySubject[subject.code];
  if (!contentMap) continue;

  const expectedA2 = subject.units.flatMap((unit) =>
    unit.topics
      .filter((topic) => topic.levels.includes("A2"))
      .map((topic) => topic.id),
  );
  const missing = expectedA2.filter((id) => !contentMap[id]);
  const extra = Object.keys(contentMap).filter((id) => !expectedA2.includes(id));
  if (missing.length || extra.length) {
    throw new Error(`${subject.code} content map mismatch. Missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}.`);
  }

  const directory = path.join(root, "src/data/notes", subject.code);
  await fs.mkdir(directory, { recursive: true });
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      if (!contentMap[topic.id]) continue;
      const note = buildNote(subject, unit, topic, contentMap[topic.id]);
      await fs.writeFile(
        path.join(directory, `${topic.id}.json`),
        `${JSON.stringify(note, null, 2)}\n`,
        "utf8",
      );
      topic.contentDepth = "full";
      generated += 1;
    }
  }
}

await fs.writeFile(subjectsPath, `${JSON.stringify(subjects, null, 2)}\n`, "utf8");
console.log(`Generated ${generated} full A2 Mathematics and Chemistry notes.`);
