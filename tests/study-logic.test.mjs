import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after } from "node:test";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false },
});

after(async () => {
  await vite.close();
});

test("global search ranks exact concepts and topic IDs", async () => {
  const { searchTopics } = await vite.ssrLoadModule("/src/utils/search.ts");
  const index = JSON.parse(
    await readFile(new URL("../src/data/generated/search-index.json", import.meta.url), "utf8"),
  );

  const hashing = searchTopics(index, "hash function");
  assert.equal(hashing[0].key, "9618:13.2");
  assert.match(`${hashing[0].matchedFragment.label} ${hashing[0].matchedFragment.text}`, /hash/i);

  const exactTopic = searchTopics(index, "9609 10.3");
  assert.equal(exactTopic[0].key, "9609:10.3");
});

test("paper metadata accepts downloader component aliases and rejects malformed records", async () => {
  const { normalizePaperRecord, isUsablePdfUrl } = await vite.ssrLoadModule(
    "/src/data/papers/index.ts",
  );
  const normalized = normalizePaperRecord({
    subject: "9618",
    year: 2025,
    session: "May-June",
    component: "42",
    qp: "https://cdn.example.org/9618_s25_qp_42.pdf",
    ms: "https://cdn.example.org/9618_s25_ms_42.pdf",
    source: "downloader",
  });
  assert.equal(normalized.paper, "42");
  assert.equal(normalized.source, "downloader");
  assert.equal(isUsablePdfUrl(normalized.qp), true);
  assert.equal(isUsablePdfUrl("https://xtrapapers.co/archive/9618_s25_qp_42.pdf/download"), true);
  assert.equal(normalizePaperRecord({ subject: "9618", year: "bad" }), null);
  assert.equal(isUsablePdfUrl("javascript:alert(1)"), false);
});

test("topic navigation remains within the selected study level", async () => {
  const { getSubject, getTopic, getTopicNeighbours } = await vite.ssrLoadModule(
    "/src/data/subjects.ts",
  );
  const subject = getSubject("9618");
  const lookup = getTopic("9618", "13.2");
  const neighbours = getTopicNeighbours(subject, lookup.topic);
  assert.equal(neighbours.previous.topic.id, "13.1");
  assert.equal(neighbours.next.topic.id, "13.3");
});

test("notes are grouped into coursebook chapters before their subtopics", async () => {
  const { getNoteChapters, getSubject } = await vite.ssrLoadModule(
    "/src/data/subjects.ts",
  );

  const computerScience = getNoteChapters(getSubject("9618"), "A2");
  assert.equal(computerScience[0].number, "16");
  assert.equal(computerScience[0].title, "Data representation");
  assert.equal(computerScience[0].partTitle, "Part 3 · Advanced theory");
  assert.deepEqual(computerScience[0].topics.map((entry) => entry.topic.id), ["13.1", "13.2", "13.3"]);
  assert.equal(computerScience.at(-1).number, "29");
  assert.equal(computerScience.at(-1).linkAnchor, "05-declarative-programming");

  const computerScienceAs = getNoteChapters(getSubject("9618"), "AS");
  assert.equal(computerScienceAs.find((chapter) => chapter.number === "4").topics[0].topic.id, "3.2");
  assert.equal(computerScienceAs.find((chapter) => chapter.number === "7").title, "Monitoring and control systems");

  const mathematics = getNoteChapters(getSubject("9709"), "A2");
  const pureThree = mathematics.filter((chapter) => chapter.partTitle === "Paper 3 · Pure Mathematics 3");
  assert.equal(pureThree.length, 11);
  assert.equal(pureThree[0].title, "Algebra");
  assert.equal(pureThree[6].title, "Further algebra");
  assert.deepEqual(pureThree[7].topics.map((entry) => entry.topic.id), ["3.4", "3.5"]);

  const statisticsOne = mathematics.find((chapter) => (
    chapter.partTitle === "Paper 5 · Probability & Statistics 1" && chapter.number === "1"
  ));
  const statisticsTwo = mathematics.find((chapter) => (
    chapter.partTitle === "Paper 6 · Probability & Statistics 2" && chapter.number === "1"
  ));
  assert.equal(statisticsOne.title, "Representation of data");
  assert.equal(statisticsOne.topics[0].topic.id, "5.1");
  assert.equal(statisticsTwo.title, "The Poisson distribution");
  assert.equal(statisticsTwo.topics[0].topic.id, "6.1");

  const mathematicsAs = getNoteChapters(getSubject("9709"), "AS");
  assert.equal(mathematicsAs.filter((chapter) => chapter.partTitle === "Paper 2 · Pure Mathematics 2").length, 6);
  assert.equal(mathematicsAs.find((chapter) => chapter.partTitle === "Paper 2 · Pure Mathematics 2").title, "Algebra");

  const chemistry = getNoteChapters(getSubject("9701"), "A2");
  assert.equal(chemistry[0].number, "23");
  assert.equal(chemistry[0].topics.length, 1);
});

test("stored syllabus checks survive hydration without losing older study data", async () => {
  const { parseStoredState } = await vite.ssrLoadModule("/src/hooks/use-study.tsx");
  const state = parseStoredState(JSON.stringify({
    bookmarks: ["9709:3.1"],
    completed: [],
    syllabusChecks: { "9709:3.1": ["0", "2", 4] },
    theme: "system",
  }));

  assert.deepEqual(state.bookmarks, ["9709:3.1"]);
  assert.deepEqual(state.syllabusChecks, { "9709:3.1": ["0", "2"] });
});
