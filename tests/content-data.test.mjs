import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));

test("all subject, note, search and paper data passes validation", () => {
  const output = execFileSync("node", ["scripts/validate-data.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.match(output, /Data valid: 4 subjects, 153 topics, 52 detailed notes, 919 paper records/);
});
