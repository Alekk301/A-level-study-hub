import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vite = await createServer({ root, configFile: false, server: { middlewareMode: true }, appType: "custom" });
test.after(async () => vite.close());
const readNote = async (id) => JSON.parse(await readFile(path.join(root, `src/data/notes/9609/${id}.json`), "utf8"));

function assertExamReady(note) {
  assert.equal(note.subject, "9609");
  assert.equal(note.contentDepth, "full");
  assert.ok(note.syllabusPoints.length >= 5, `${note.id}: syllabus coverage`);
  assert.ok(note.definitions.length >= 6, `${note.id}: definitions`);
  assert.ok(note.sections.length >= 6, `${note.id}: substantive sections`);
  assert.ok(note.analysisChains.length >= 3, `${note.id}: applied analysis`);
  assert.ok(note.examTips.length >= 4, `${note.id}: exam guidance`);
  assert.ok(note.commonMistakes.length >= 4, `${note.id}: common mistakes`);
  assert.ok(note.quickRecall.length >= 6, `${note.id}: recall`);
  assert.ok(note.quickRecall.every((item) => item?.question && item?.answer), `${note.id}: revealable answers`);
  assert.ok(JSON.stringify(note).length >= 8_000, `${note.id}: depth`);
}

const unitOne = ["1.1", "1.2", "1.3", "1.4", "1.5", "6.1", "6.2"];
test("Business Unit 1 notes are exam ready", async () => {
  for (const id of unitOne) assertExamReady(await readNote(id));
});

test("economic and corporate-planning chapters are substantive", async () => {
  const economics = await readNote("6.1");
  const strategy = await readNote("6.2");
  assert.ok(economics.sections.some(({ id }) => id === "02-economic-influences"));
  for (const term of ["market failure", "unemployment", "fiscal policy", "monetary policy", "supply-side policy", "exchange rate"])
    assert.match(JSON.stringify(economics), new RegExp(term, "i"));
  assert.ok(strategy.sections.some(({ id }) => id === "07-corporate-planning-and-culture"));
  for (const term of ["transformational leadership", "strategic change", "contingency planning", "crisis management"])
    assert.match(JSON.stringify(strategy), new RegExp(term, "i"));
});

test("Unit 1 exam focus supports topic-specific answers", async () => {
  const { businessExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/business.ts");
  for (const id of unitOne) {
    const focus = businessExamFocus[id];
    assert.ok(focus?.evidence, `${id}: evidence summary`);
    if (id.startsWith("1.")) assert.equal(focus.component, "AS Level Papers 1 and 2");
    assert.ok(focus.tasks.length >= 1, `${id}: practice task`);
    for (const task of focus.tasks) {
      assert.ok(task.markPoints.length >= 4, `${id}: developed mark points`);
      assert.ok(task.examinerTrap, `${id}: precise examiner trap`);
    }
  }
});
