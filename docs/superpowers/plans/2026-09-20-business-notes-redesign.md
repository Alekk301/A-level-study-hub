# Business Notes Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Cambridge 9609 Business into a complete, exam-ready revision resource organised by the coursebook's 36 chapters while preserving all existing topic URLs and local study data.

**Architecture:** Add a Business chapter-placement map to the existing `getNoteChapters` pipeline and use anchors when multiple coursebook chapters share one routed topic. Keep the existing `TopicNote` schema, note renderer, visual system and local-storage keys; deepen all 34 Business note files and their exam-focus records in five unit-sized passes.

**Tech Stack:** Next.js 16, React 19, TypeScript, JSON content, Node's built-in test runner, existing SVG/CSS visual renderer.

**Spec:** `docs/superpowers/specs/2026-09-20-business-notes-redesign-design.md`

## Global Constraints

- Preserve every canonical topic ID and `/subject/9609/notes/<topic-id>` route.
- Preserve completion, bookmark, checklist and highlight storage keys.
- Reuse the current schema, renderer, catalogue and visual layouts. Add no dependency, CMS or database.
- Use the 2026–2028 syllabus as the coverage authority.
- Use `D:\Cambrigde downloader\resources\business.pdf` and `D:\Cambrigde downloader\resources\AS LEVEL NOTES.docx` as the user's primary references.
- Cross-check assessment guidance against official papers, mark schemes and examiner reports from more than one session where possible.
- Use professional notes such as Save My Exams and ZNotes only to cross-check coverage and presentation.
- Write original prose and diagrams; do not copy third-party text or copyrighted images.
- Do not publish or push until the user reviews the verified local result and asks.

## File Responsibilities

- `src/data/subjects.ts`: Business chapter mapping only.
- `tests/study-logic.test.mjs`: exact chapter/order/anchor behaviour.
- `tests/business-notes.test.mjs`: exam-readiness checks for all Business content.
- `src/data/notes/9609/*.json`: teaching content for 34 stable routes.
- `src/data/exam-focus/business.ts`: mark-scheme-grounded tasks for every route.
- `src/components/notes/TopicVisual.tsx`: only missing high-value Business visuals.
- `scripts/validate-data.mjs`: permanent Business content floor.
- `src/data/generated/search-index.json`: regenerated search content.

---

### Task 1: Map all 36 coursebook chapters

**Files:**
- Modify: `src/data/subjects.ts`
- Modify: `tests/study-logic.test.mjs`

**Interfaces:**
- Consumes: `CoursebookChapterDefinition` and `getNoteChapters(subject, level)`.
- Produces: `businessCoursebookChapters` placements; 19 AS chapters and 17 A2 chapters.

- [ ] **Step 1: Add the failing chapter test**

Add to the existing chapter-grouping test:

```js
const businessAs = getNoteChapters(getSubject("9609"), "AS");
assert.equal(businessAs.length, 19);
assert.deepEqual(businessAs.map(({ number }) => number), [
  "1", "2", "3", "4", "5", "10", "11", "12", "17", "18",
  "19", "20", "23", "24", "25", "29", "30", "31", "32",
]);
assert.deepEqual(
  businessAs.find(({ number }) => number === "29").topics.map(({ topic }) => topic.id),
  ["5.1", "5.2"],
);
assert.equal(businessAs.find(({ number }) => number === "20").linkAnchor, "05-promotion-objectives-and-methods");

const businessA2 = getNoteChapters(getSubject("9609"), "A2");
assert.equal(businessA2.length, 17);
assert.deepEqual(businessA2.map(({ number }) => number), [
  "6", "7", "8", "9", "13", "14", "15", "16", "21",
  "22", "26", "27", "28", "33", "34", "35", "36",
]);
assert.equal(businessA2.find(({ number }) => number === "7").linkAnchor, "02-economic-influences");
assert.equal(businessA2.find(({ number }) => number === "9").linkAnchor, "07-corporate-planning-and-culture");
```

- [ ] **Step 2: Confirm the test fails**

Run: `node --test --test-concurrency=1 tests/study-logic.test.mjs`

Expected: FAIL because Business currently returns ten broad groups.

- [ ] **Step 3: Add the minimal placement map**

Add `businessCoursebookChapters` beside the existing Mathematics and Computer Science maps. Use this exact mapping:

| Chapter | Topic | Unit/part | Anchor when required |
| --- | --- | --- | --- |
| 1 Enterprise | `1.1` | Unit 1 | — |
| 2 Business structure | `1.2` | Unit 1 | — |
| 3 Size of business | `1.3` | Unit 1 | — |
| 4 Business objectives | `1.4` | Unit 1 | — |
| 5 Stakeholders in a business | `1.5` | Unit 1 | — |
| 6 External influences on business activity | `6.1` | Unit 1 | `01-political-and-legal-influences` |
| 7 External economic influences on business activity | `6.1` | Unit 1 | `02-economic-influences` |
| 8 Business strategy | `6.2` | Unit 1 | `01-strategic-management-process` |
| 9 Corporate planning and implementation | `6.2` | Unit 1 | `07-corporate-planning-and-culture` |
| 10 Human resource management | `2.1` | Unit 2 | — |
| 11 Motivation | `2.2` | Unit 2 | — |
| 12 Management | `2.3` | Unit 2 | — |
| 13 Organisational structure | `7.1` | Unit 2 | — |
| 14 Business communication | `7.2` | Unit 2 | — |
| 15 Leadership | `7.3` | Unit 2 | — |
| 16 Human resource management strategy | `7.4` | Unit 2 | — |
| 17 The nature of marketing | `3.1` | Unit 3 | — |
| 18 Market research | `3.2` | Unit 3 | — |
| 19 The marketing mix — product and price | `3.3` | Unit 3 | `01-product-benefits-differentiation-and-portfolio` |
| 20 The marketing mix — promotion and place | `3.3` | Unit 3 | `05-promotion-objectives-and-methods` |
| 21 Marketing analysis | `8.1` | Unit 3 | — |
| 22 Marketing strategy | `8.2` | Unit 3 | — |
| 23 The nature of operations | `4.1` | Unit 4 | — |
| 24 Inventory management | `4.2` | Unit 4 | — |
| 25 Capacity utilisation and outsourcing | `4.3` | Unit 4 | — |
| 26 Location and scale | `9.1` | Unit 4 | — |
| 27 Quality management | `9.2` | Unit 4 | — |
| 28 Operations strategy | `9.3` | Unit 4 | — |
| 29 Business finance | `5.1`, `5.2` | Unit 5 | — |
| 30 Forecasting and managing cash flows | `5.3` | Unit 5 | — |
| 31 Costs | `5.4` | Unit 5 | — |
| 32 Budgets | `5.5` | Unit 5 | — |
| 33 Financial statements | `10.1` | Unit 5 | — |
| 34 Analysis of published accounts | `10.2` | Unit 5 | — |
| 35 Investment appraisal | `10.3` | Unit 5 | — |
| 36 Finance and accounting strategy | `10.4` | Unit 5 | — |

Use part titles `Unit 1 · Business and its environment` through `Unit 5 · Finance and accounting`, with `partOrder` 1–5. Extend the `coursebookPlacement` conditional to select this map for subject `9609`.

- [ ] **Step 4: Verify and commit**

Run: `node --test --test-concurrency=1 tests/study-logic.test.mjs`

Expected: PASS.

```bash
git add src/data/subjects.ts tests/study-logic.test.mjs
git commit -m "feat: map Business notes to 36 coursebook chapters"
```

---

### Task 2: Create the Business quality test and rebuild Unit 1

**Files:**
- Create: `tests/business-notes.test.mjs`
- Modify: `src/data/notes/9609/{1.1,1.2,1.3,1.4,1.5,6.1,6.2}.json`
- Modify: `src/data/exam-focus/business.ts`

**Interfaces:**
- Produces: reusable `assertExamReady(note)` and complete Unit 1 notes; stable Chapter 7/9 anchors.

- [ ] **Step 1: Research Unit 1**

Read coursebook Chapters 1–9, syllabus AS 1.1–1.5/A Level 6.1–6.2, the AS notes document, official marking evidence and the matching professional-note sections. Use sources to verify coverage and answer demands, not to copy wording.

- [ ] **Step 2: Create the failing test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vite = await createServer({ root, server: { middlewareMode: true }, appType: "custom" });
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
```

- [ ] **Step 3: Confirm the real failures**

Run: `node --test --test-concurrency=1 tests/business-notes.test.mjs`

Expected: FAIL for shallow `6.1`/`6.2` and string-only recall.

- [ ] **Step 4: Rebuild Unit 1 content**

Retain accurate AS material but fill gaps and sharpen application/evaluation. Fully expand `6.1` and `6.2`.

| Topic | Mandatory content |
| --- | --- |
| `1.1` | enterprise, scarcity/opportunity cost, added value, entrepreneur/intrapreneur, plans, social enterprise |
| `1.2` | sectors, structural change, ownership, liability/control/finance/continuity, privatisation/nationalisation |
| `1.3` | size measures, internal/external growth, small/large advantages and growth risk |
| `1.4` | objectives, SMART/MBO, mission, ethics/CSR and decision cycle |
| `1.5` | stakeholder objectives, conflict, power/influence, accountability and prioritisation |
| `6.1` | intervention, market failure, macro objectives, fiscal/monetary/supply-side/exchange-rate policy, demographic/social/technology/competitive/international/environmental influences |
| `6.2` | strategic process, SWOT/PEST/Five Forces/core competence/Ansoff/decision trees/force field/scenarios, corporate planning/culture, transformational leadership, change, contingency and crisis management |

In `6.2`, use the stable sections `07-corporate-planning-and-culture`, `08-leading-and-controlling-strategic-change` and `09-contingency-planning-and-crisis-management`.

- [ ] **Step 5: Add Unit 1 exam focus**

Add records `1.1`–`1.5` to `businessExamFocus` using component `AS Level Papers 1 and 2`; each needs a source-grounded evidence summary, at least one topic-specific task, four or more mark points and a precise examiner trap. Refine `6.1`/`6.2` to cover the new economic and corporate-planning material.

- [ ] **Step 6: Verify and commit**

Run `node --test --test-concurrency=1 tests/business-notes.test.mjs` and `npm run data:validate`; both must pass.

```bash
git add tests/business-notes.test.mjs src/data/notes/9609 src/data/exam-focus/business.ts
git commit -m "feat: rebuild Business environment and strategy notes"
```

---

### Task 3: Rebuild Unit 2 — Human resource management

**Files:**
- Modify: `tests/business-notes.test.mjs`
- Modify: `src/data/notes/9609/{2.1,2.2,2.3,7.1,7.2,7.3,7.4}.json`
- Modify: `src/data/exam-focus/business.ts`

- [ ] **Step 1: Research Chapters 10–16 and syllabus 2.1–2.3/7.1–7.4** using the same evidence hierarchy.

- [ ] **Step 2: Add a failing Unit 2 test**

```js
const unitTwo = ["2.1", "2.2", "2.3", "7.1", "7.2", "7.3", "7.4"];
test("Business Unit 2 notes are exam ready", async () => {
  for (const id of unitTwo) assertExamReady(await readNote(id));
});
```

Run the Business test; expect shallow A2 notes to fail.

- [ ] **Step 3: Rebuild the notes**

Cover workforce planning/recruitment/contracts/training/unions (`2.1`); Taylor through Vroom and contextual reward/job-design choice (`2.2`); management functions/Mintzberg/delegation/McGregor/EI (`2.3`); structures/span/chain/decentralisation (`7.1`); channel/network/barriers/feedback (`7.2`); leadership theory/power/transformation/EI (`7.3`); hard/soft HRM, performance diagnosis, policy bundles and technology (`7.4`). Every chain must reach a workforce and business-performance consequence.

- [ ] **Step 4: Add AS focus `2.1`–`2.3` and refine A2 focus `7.1`–`7.4`.**

- [ ] **Step 5: Verify and commit**

Run the Business test and `npm run data:validate`; both must pass.

```bash
git add tests/business-notes.test.mjs src/data/notes/9609 src/data/exam-focus/business.ts
git commit -m "feat: rebuild Business human resources notes"
```

---

### Task 4: Rebuild Unit 3 — Marketing

**Files:**
- Modify: `tests/business-notes.test.mjs`
- Modify: `src/data/notes/9609/{3.1,3.2,3.3,8.1,8.2}.json`
- Modify: `src/data/exam-focus/business.ts`

- [ ] **Step 1: Research Chapters 17–22 and syllabus 3.1–3.3/8.1–8.2.**

- [ ] **Step 2: Add a failing Unit 3 test**

```js
const unitThree = ["3.1", "3.2", "3.3", "8.1", "8.2"];
test("Business Unit 3 notes are exam ready", async () => {
  for (const id of unitThree) assertExamReady(await readNote(id));
  const mix = await readNote("3.3");
  assert.ok(mix.sections.some(({ id }) => id === "01-product-benefits-differentiation-and-portfolio"));
  assert.ok(mix.sections.some(({ id }) => id === "05-promotion-objectives-and-methods"));
});
```

- [ ] **Step 3: Rebuild the notes**

Cover marketing role/orientation/demand/segmentation (`3.1`); methods/sampling/reliability/bias (`3.2`); product/life cycle/portfolio/price/PED/promotion/place/digital/relationship/integration (`3.3`); elasticity/R&D/time series/qualitative forecasting (`8.1`); planning/STP/coordinated mix/data/AI/international entry/adaptation (`8.2`). Keep both asserted Chapter 19/20 anchors.

- [ ] **Step 4: Add AS focus `3.1`–`3.3` and refine A2 focus `8.1`–`8.2`.** Include numerical and data-evaluation tasks.

- [ ] **Step 5: Verify and commit**

Run the Business test and data validation; both must pass. Commit as `feat: rebuild Business marketing notes`.

---

### Task 5: Rebuild Unit 4 — Operations management

**Files:**
- Modify: `tests/business-notes.test.mjs`
- Modify: `src/data/notes/9609/{4.1,4.2,4.3,9.1,9.2,9.3}.json`
- Modify: `src/data/exam-focus/business.ts`

- [ ] **Step 1: Research Chapters 23–28 and syllabus 4.1–4.3/9.1–9.3.**

- [ ] **Step 2: Add a failing Unit 4 test**

```js
const unitFour = ["4.1", "4.2", "4.3", "9.1", "9.2", "9.3"];
test("Business Unit 4 notes are exam ready", async () => {
  for (const id of unitFour) assertExamReady(await readNote(id));
});
```

- [ ] **Step 3: Rebuild the notes**

Cover transformation/productivity/job-batch-flow/technology (`4.1`); inventory charts/JIT/resilience (`4.2`); capacity/outsourcing/make-or-buy (`4.3`); weighted location/offshoring/reshoring/economies (`9.1`); QC/QA/TQM/benchmarking/cost of quality (`9.2`); technology/ERP/lean/CPA and limitations (`9.3`). Include complete capacity and CPA workings with interpretation.

- [ ] **Step 4: Add AS focus `4.1`–`4.3` and refine A2 focus `9.1`–`9.3`.**

- [ ] **Step 5: Verify and commit**

Run the Business test and data validation; both must pass. Commit as `feat: rebuild Business operations notes`.

---

### Task 6: Rebuild Unit 5 — Finance and accounting

**Files:**
- Modify: `tests/business-notes.test.mjs`
- Modify: `src/data/notes/9609/{5.1,5.2,5.3,5.4,5.5,10.1,10.2,10.3,10.4}.json`
- Modify: `src/data/exam-focus/business.ts`

- [ ] **Step 1: Research Chapters 29–36 and syllabus 5.1–5.5/10.1–10.4.** Verify every formula against the current syllabus and official schemes.

- [ ] **Step 2: Add a failing Unit 5 test**

```js
const unitFive = ["5.1", "5.2", "5.3", "5.4", "5.5", "10.1", "10.2", "10.3", "10.4"];
test("Business Unit 5 notes are exam ready", async () => {
  for (const id of unitFive) assertExamReady(await readNote(id));
});
test("every Business topic has exam practice", async () => {
  const { getExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/index.ts");
  for (const id of [...unitOne, ...unitTwo, ...unitThree, ...unitFour, ...unitFive])
    assert.ok(getExamFocus("9609", id), `${id}: exam focus`);
});
```

- [ ] **Step 3: Rebuild the notes**

Cover finance need/cash vs profit (`5.1`); source matching/cost/control/risk (`5.2`); cash-flow construction/diagnosis/responses (`5.3`); costs/contribution/break-even/margin of safety (`5.4`); budgets/variance/behaviour (`5.5`); statements/NRV/depreciation (`10.1`); required ratios and limitations (`10.2`); payback/ARR/NPV and qualitative judgement (`10.3`); accounts/annual reports/debt-equity/dividends/integrated strategy (`10.4`). Every numerical method must show formula, substitution, answer, unit and decision interpretation.

- [ ] **Step 4: Add AS focus `5.1`–`5.5` and refine A2 focus `10.1`–`10.4`.** Include calculation and long-answer tasks.

- [ ] **Step 5: Verify and commit**

Run the Business test and data validation; both must pass. Commit as `feat: rebuild Business finance notes`.

---

### Task 7: Add the two priority visuals

**Files:**
- Modify: `src/components/notes/TopicVisual.tsx`
- Modify: `tests/ui-components.test.mjs`

- [ ] **Step 1: Add failing assertions**

```js
assert.ok(getTopicVisuals("9609", "6.1").some(({ title }) => title === "Economic-policy transmission chain"));
assert.ok(getTopicVisuals("9609", "6.2").some(({ title }) => title === "From corporate plan to controlled change"));
```

- [ ] **Step 2: Confirm `tests/ui-components.test.mjs` fails.**

- [ ] **Step 3: Add two existing-layout `flow` specs**

The economic flow is: policy instrument → immediate demand/cost/currency/labour effect → contextual business decision → performance effect qualified by exposure and time. The corporate-planning flow is: direction/evidence → plan/resources/responsibility → culture/leadership/change → monitoring/contingency/crisis response. Give both accessible descriptions and exam links.

- [ ] **Step 4: Run the UI component test and commit** as `feat: add Business economics and planning visuals`.

---

### Task 8: Enforce the final standard and rebuild search

**Files:**
- Modify: `scripts/validate-data.mjs`
- Modify: `src/data/generated/search-index.json`
- Verify generated: `src/data/notes/registry.ts`

- [ ] **Step 1: Replace the AS-only Business validation with all 34 topics**

Use the same thresholds as `assertExamReady`: 5 syllabus outcomes, 6 definitions, 6 sections, 3 chains, 4 tips, 4 mistakes, 6 question/answer recall items and 8,000 serialized characters. Assert exactly 34 Business topics.

- [ ] **Step 2: Run `npm run data:validate`; expect PASS.**

- [ ] **Step 3: Run `npm run data:build`.** Verify the same 34 `9609:*` registry keys and updated search fragments.

- [ ] **Step 4: Run:**

```bash
npm run data:validate
node --test --test-concurrency=1 tests/business-notes.test.mjs tests/study-logic.test.mjs tests/ui-components.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit** as `test: enforce exam-ready Business note coverage`.

---

### Task 9: Full verification and browser review

**Files:** Verify only; modify only if a check exposes a defect.

- [ ] **Step 1: Run static and production checks**

```bash
npm run lint
npm run data:validate
npm run build
npm run build:vercel
```

Expected: every command exits 0.

- [ ] **Step 2: Run the full suite:** `node --test --test-concurrency=1 tests/*.test.mjs`.

- [ ] **Step 3: Start `npm run dev -- --host 127.0.0.1` and inspect:**

- `/subject/9609/notes`: AS 19 chapters, A2 17, five units.
- `/subject/9609/notes/6.1#02-economic-influences`: detailed Chapter 7 landing.
- `/subject/9609/notes/6.2#07-corporate-planning-and-culture`: detailed Chapter 9 landing.
- `/subject/9609/notes/3.3#05-promotion-objectives-and-methods`: Chapter 20 landing.
- `/subject/9609/notes/10.3`: formulas, worked appraisal and visual comparison.

- [ ] **Step 4: At approximately 1280×800 and 390×844, verify:** chapter expansion, anchored headings, table of contents, diagram/table overflow, keyboard recall, persisted checklist/highlight/bookmark/completion state and no double-counted progress for duplicated chapter routes.

- [ ] **Step 5: Search for** `market failure`, `transformational leadership`, `contingency planning`, `fiscal policy` and `net present value`; each must return the correct Business topic with matching context.

- [ ] **Step 6: Run `git diff --check`, `git status --short` and `git log --oneline -9`.** Confirm no resource/PDF files were committed.

- [ ] **Step 7: Commit only a correction exposed by verification.** Do not publish or push; present the verified local result to the user.

## Self-Review

- All 36 chapters, 34 stable routes, five units, two priority omissions, exam focus, visuals, search and compatibility are assigned to a task.
- The plan uses existing interfaces and adds no speculative platform or dependency.
- The chapter numbers, route IDs and anchor IDs are consistent across mapping, content and tests.
- No placeholder steps remain; every task has exact files, coverage, verification and a commit boundary.
