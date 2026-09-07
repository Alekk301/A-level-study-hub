import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("analytics is loaded only after an explicit choice", async () => {
  const [layout, analytics, privacy] = await Promise.all([
    readProjectFile("app/layout.tsx"),
    readProjectFile("src/components/analytics/GoogleAnalytics.tsx"),
    readProjectFile("PRIVACY.md"),
  ]);

  assert.doesNotMatch(layout, /dangerouslySetInnerHTML/);
  assert.doesNotMatch(layout, /googletagmanager\.com/);
  assert.match(analytics, /consent !== "accepted"/);
  assert.match(analytics, /Accept analytics/);
  assert.match(analytics, /Decline/);
  assert.match(privacy, /script\s+is not inserted until a visitor explicitly selects/);
});

test("primary package scripts are cross-platform", async () => {
  const packageJson = JSON.parse(await readProjectFile("package.json"));
  const primary = ["dev", "build", "start", "lint", "check"];

  for (const script of primary) {
    assert.equal(typeof packageJson.scripts[script], "string");
    assert.doesNotMatch(packageJson.scripts[script], /\bbash\b|WRANGLER_LOG_PATH=/);
  }
});

test("portfolio documentation includes transparent ownership and evidence", async () => {
  const [readme, aiUsage, impact, architecture] = await Promise.all([
    readProjectFile("README.md"),
    readProjectFile("docs/AI-USAGE.md"),
    readProjectFile("docs/IMPACT.md"),
    readProjectFile("ARCHITECTURE.md"),
  ]);

  assert.match(readme, /Đức Anh Lê \(Alex Le\)/);
  assert.match(aiUsage, /60–70%/);
  assert.match(impact, /at least 10 classmates/i);
  assert.match(impact, /highlight function that can be stored/i);
  assert.match(architecture, /allowlist/i);
});
