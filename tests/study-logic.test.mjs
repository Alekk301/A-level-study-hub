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
  assert.equal(computerScience[0].number, "13");
  assert.equal(computerScience[0].title, "Data representation");
  assert.deepEqual(computerScience[0].topics.map((entry) => entry.topic.id), ["13.1", "13.2", "13.3"]);

  const mathematics = getNoteChapters(getSubject("9709"), "A2");
  assert.equal(mathematics[0].title, "Pure Mathematics 3");
  assert.equal(mathematics[0].topics.length, 9);

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
