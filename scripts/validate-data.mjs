import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "src/data");
const subjects = JSON.parse(await fs.readFile(path.join(dataRoot, "subjects.json"), "utf8"));
const papers = JSON.parse(await fs.readFile(path.join(dataRoot, "papers/papers.json"), "utf8"));
const searchIndex = JSON.parse(await fs.readFile(path.join(dataRoot, "generated/search-index.json"), "utf8"));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const requiredCodes = ["9709", "9618", "9609", "9701"];
assert(subjects.length === 4, `Expected four subjects, found ${subjects.length}.`);
assert(requiredCodes.every((code) => subjects.some((subject) => subject.code === code)), "One or more required subject codes are missing.");
const mathematics = subjects.find((subject) => subject.code === "9709");
assert(
  mathematics?.resources?.some((resource) => resource.source === "Past Paper Penguin" && resource.url === "https://pastpaperpenguin.com/home/" && resource.category !== "papers"),
  "Mathematics must visibly link to Past Paper Penguin for topical questions.",
);
assert(
  !mathematics?.resources?.some((resource) => resource.source === "RocketRevise"),
  "Mathematics should not retain the outdated Rocket Revise topical resource.",
);

const topicKeys = new Set();
const topicIdsBySubject = new Map();
let topicCount = 0;
for (const subject of subjects) {
  assert(Array.isArray(subject.units) && subject.units.length > 0, `${subject.code} has no units.`);
  assert(Array.isArray(subject.resources), `${subject.code} resources must be an array.`);
  const ids = new Set();
  topicIdsBySubject.set(subject.code, ids);
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      topicCount += 1;
      const key = `${subject.code}:${topic.id}`;
      assert(!topicKeys.has(key), `Duplicate topic ${key}.`);
      topicKeys.add(key);
      ids.add(topic.id);
      assert(topic.title && topic.summary, `${key} is missing title or summary.`);
      assert(Array.isArray(topic.levels) && topic.levels.length > 0, `${key} is missing filter levels.`);
      assert(["full", "in-depth", "quick"].includes(topic.contentDepth), `${key} has invalid contentDepth.`);
    }
  }
}
assert(topicCount === 153, `Expected 153 migrated topics, found ${topicCount}.`);

const noteMap = new Map();
for (const subject of subjects) {
  const directory = path.join(dataRoot, "notes", subject.code);
  let files = [];
  try {
    files = (await fs.readdir(directory)).filter((file) => file.endsWith(".json"));
  } catch {
    continue;
  }
  for (const file of files) {
    const note = JSON.parse(await fs.readFile(path.join(directory, file), "utf8"));
    const key = `${note.subject}:${note.id}`;
    noteMap.set(key, note);
    assert(topicKeys.has(key), `Detailed note ${key} has no topic metadata.`);
    assert(note.title && note.overview, `${key} is missing title or overview.`);
    assert(Array.isArray(note.sections) && note.sections.length > 0, `${key} has no sections.`);
    assert(Array.isArray(note.syllabusPoints), `${key} syllabusPoints must be an array.`);
    assert(Array.isArray(note.definitions), `${key} definitions must be an array.`);
    assert(Array.isArray(note.examTips), `${key} examTips must be an array.`);
    assert(Array.isArray(note.commonMistakes), `${key} commonMistakes must be an array.`);
    assert(Array.isArray(note.quickRecall), `${key} quickRecall must be an array.`);
    for (const [index, item] of (note.quickRecall ?? []).entries()) {
      assert(
        typeof item === "string" ||
          (item && typeof item.question === "string" && typeof item.answer === "string"),
        `${key} quickRecall item ${index + 1} must be a string or a question/answer pair.`,
      );
    }
    assert(!/<\/?(?:div|span|p|h[1-6]|ul|li|b|em)\b/i.test(JSON.stringify(note)), `${key} contains legacy HTML markup.`);
    for (const related of note.relatedTopics ?? []) {
      assert(topicIdsBySubject.get(note.subject)?.has(related), `${key} points to missing related topic ${related}.`);
    }
  }
}

const expectedA2Counts = new Map([["9709", 24], ["9618", 15], ["9609", 15], ["9701", 15]]);
for (const code of requiredCodes) {
  const subject = subjects.find((item) => item.code === code);
  const a2Topics = subject.units.flatMap((unit) => unit.topics).filter((topic) => topic.levels.includes("A2"));
  assert(a2Topics.length === expectedA2Counts.get(code), `${code} should contain ${expectedA2Counts.get(code)} A2-route topics, found ${a2Topics.length}.`);
  for (const topic of a2Topics) {
    const key = `${code}:${topic.id}`;
    const note = noteMap.get(key);
    assert(Boolean(note), `${key} is missing its detailed note file.`);
    if (!note) continue;
    assert(note.contentDepth === "full", `${key} is not marked as full notes.`);
    assert(note.sections.length >= 4, `${key} needs at least four substantive sections.`);
    assert(note.definitions.length >= 4, `${key} needs at least four definitions.`);
    assert(note.examTips.length >= 2, `${key} needs at least two exam tips.`);
    assert(note.commonMistakes.length >= 3, `${key} needs at least three common mistakes.`);
    assert(note.quickRecall.length >= 4, `${key} needs at least four recall checks.`);
    assert(JSON.stringify(note).length >= 2_500, `${key} is unexpectedly shallow.`);
  }
}

const business = subjects.find((subject) => subject.code === "9609");
const asBusinessTopics = business.units
  .flatMap((unit) => unit.topics)
  .filter((topic) => topic.levels.includes("AS"));
assert(asBusinessTopics.length === 19, `9609 should contain 19 AS topics, found ${asBusinessTopics.length}.`);
for (const topic of asBusinessTopics) {
  const key = `9609:${topic.id}`;
  const note = noteMap.get(key);
  assert(Boolean(note), `${key} is missing its detailed AS Business note file.`);
  if (!note) continue;
  assert(note.contentDepth === "full", `${key} is not marked as full notes.`);
  assert(note.sections.length >= 6, `${key} needs at least six substantive sections.`);
  assert(note.definitions.length >= 6, `${key} needs at least six definitions.`);
  assert(note.analysisChains.length >= 3, `${key} needs at least three applied analysis chains.`);
  assert(note.examTips.length >= 4, `${key} needs at least four exam tips.`);
  assert(note.commonMistakes.length >= 4, `${key} needs at least four common mistakes.`);
  assert(note.quickRecall.length >= 6, `${key} needs at least six recall checks.`);
  assert(
    note.quickRecall.every((item) => item && typeof item.question === "string" && typeof item.answer === "string"),
    `${key} quick recall must use question-and-answer disclosures.`,
  );
  assert(JSON.stringify(note).length >= 8_000, `${key} is unexpectedly shallow for the detailed AS Business set.`);
}

assert(searchIndex.length === topicCount, `Search index has ${searchIndex.length} entries for ${topicCount} topics.`);
assert(new Set(searchIndex.map((entry) => entry.key)).size === searchIndex.length, "Search index contains duplicate keys.");

const paperKeys = new Set();
const validSessions = new Set(["February-March", "May-June", "October-November"]);
for (const paper of papers) {
  const key = `${paper.subject}:${paper.year}:${paper.session}:${paper.paper}`;
  assert(!paperKeys.has(key), `Duplicate paper record ${key}.`);
  paperKeys.add(key);
  assert(requiredCodes.includes(paper.subject), `${key} has an unknown subject.`);
  assert(validSessions.has(paper.session), `${key} has an invalid session.`);
  assert(Object.hasOwn(paper, "qp") && Object.hasOwn(paper, "ms"), `${key} must expose paired qp and ms fields.`);
  for (const field of ["qp", "ms", "er"]) {
    const value = paper[field];
    if (value == null) continue;
    assert(/^https:\/\//.test(value) && /\.pdf(?:\/download)?(?:$|[?#])/i.test(value), `${key}.${field} is not a safe HTTPS PDF URL.`);
  }
}

if (errors.length) {
  console.error(`Data validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Data valid: ${subjects.length} subjects, ${topicCount} topics, ${noteMap.size} detailed notes, ${papers.length} paper records.`);
