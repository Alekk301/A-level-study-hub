import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));

test("all subject, note, search and paper data passes validation", () => {
  const output = execFileSync("node", ["scripts/validate-data.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.match(output, /Data valid: 4 subjects, 153 topics, 111 detailed notes, 919 paper records/);
});

test("Business recall validation rejects whitespace-only questions and answers", async () => {
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), "caie-data-validation-"));
  try {
    await mkdir(path.join(fixtureRoot, "scripts"));
    await cp(path.join(root, "scripts/validate-data.mjs"), path.join(fixtureRoot, "scripts/validate-data.mjs"));
    await cp(path.join(root, "src/data"), path.join(fixtureRoot, "src/data"), { recursive: true });
    const notePath = path.join(fixtureRoot, "src/data/notes/9609/10.4.json");
    const original = JSON.parse(await readFile(notePath, "utf8"));
    for (const field of ["question", "answer"]) {
      const note = structuredClone(original);
      note.quickRecall[0][field] = "   ";
      await writeFile(notePath, JSON.stringify(note));
      const result = spawnSync("node", ["scripts/validate-data.mjs"], { cwd: fixtureRoot, encoding: "utf8" });
      assert.notEqual(result.status, 0, `whitespace-only ${field} should fail validation`);
      assert.match(result.stderr, /9609:10\.4 quick recall must use non-empty question-and-answer disclosures/);
    }
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});

test("note validation rejects example kinds outside the declared schema", async () => {
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), "caie-data-validation-"));
  try {
    await mkdir(path.join(fixtureRoot, "scripts"));
    await cp(path.join(root, "scripts/validate-data.mjs"), path.join(fixtureRoot, "scripts/validate-data.mjs"));
    await cp(path.join(root, "src/data"), path.join(fixtureRoot, "src/data"), { recursive: true });
    const notePath = path.join(fixtureRoot, "src/data/notes/9609/10.4.json");
    const note = JSON.parse(await readFile(notePath, "utf8"));
    note.sections[0].examples[0].kind = "case-study";
    await writeFile(notePath, JSON.stringify(note));

    const result = spawnSync("node", ["scripts/validate-data.mjs"], { cwd: fixtureRoot, encoding: "utf8" });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /9609:10\.4 section 1 example 1 has invalid kind case-study/);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
});
