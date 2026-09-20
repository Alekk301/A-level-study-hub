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

const baseSyllabusPoints = {
  "1.1": [
    "Explain business activity, needs and wants, scarcity, choice and opportunity cost.",
    "Explain the four factors of production and the difference between consumer goods, consumer services and capital goods.",
    "Calculate and analyse added value and ways a business can increase it.",
    "Analyse entrepreneurs and intrapreneurs, their characteristics, risks and rewards.",
    "Explain the purpose, contents and limitations of a business plan.",
    "Analyse why enterprise matters to an economy and how social enterprises use the triple bottom line.",
  ],
  "1.2": [
    "Distinguish primary, secondary and tertiary activity and explain why sector importance changes over time.",
    "Distinguish private-sector and public-sector organisations in mixed, free-market and command economies.",
    "Compare sole traders, partnerships, private limited companies and public limited companies.",
    "Explain limited liability, separate legal identity, continuity and the divorce between ownership and control.",
    "Analyse franchises, co-operatives, joint ventures and social enterprises.",
    "Recommend an appropriate business form using contextual factors.",
  ],
  "1.3": [
    "Compare revenue, employees, capital employed, output and market share as measures of business size.",
    "Explain limitations of comparing size between businesses and industries.",
    "Analyse reasons for growth and methods of internal and external growth.",
    "Analyse advantages and disadvantages of small and large businesses.",
    "Analyse causes and consequences of rapid or unsuccessful growth.",
  ],
  "1.4": [
    "Explain why businesses set aims, objectives, strategies and tactics.",
    "Analyse common objectives including survival, profit, growth, market share and shareholder return.",
    "Apply SMART criteria and management by objectives.",
    "Explain the role and limitations of mission statements.",
    "Analyse why objectives change and how ethics and corporate social responsibility influence decisions.",
    "Analyse conflicts between objectives and the importance of communicating them.",
  ],
  "1.5": [
    "Distinguish internal and external stakeholders and explain their objectives.",
    "Analyse how business decisions affect owners, employees, managers, customers, suppliers, lenders, government and communities.",
    "Explain why stakeholder objectives conflict and how compromise may be reached.",
    "Analyse stakeholder influence and business accountability.",
    "Assess how changing business objectives affect stakeholder groups.",
  ],
  "6.1": [
    "Analyse political and legal influences, including regulation, privatisation and nationalisation.",
    "Analyse macroeconomic objectives and monetary, fiscal, supply-side and exchange-rate policies.",
    "Analyse social/demographic change, CSR and pressure groups.",
    "Analyse technological change and the influence of competitors and suppliers.",
    "Analyse international trade, agreements and multinational businesses.",
    "Analyse environmental issues, environmental audits and sustainability.",
  ],
  "6.2": [
    "Explain strategy and the stages of strategic management: analysis, choice and implementation.",
    "Apply blue ocean strategy and scenario planning.",
    "Apply SWOT, PEST, Porter's five forces, core competence, Ansoff, force-field analysis and decision trees.",
    "Explain corporate planning/culture and transformational leadership in implementation.",
    "Analyse strategic change, contingency planning and crisis management.",
  ],
};

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

test("existing syllabus checklist indexes remain stable", async () => {
  for (const id of unitOne) {
    const note = await readNote(id);
    assert.deepEqual(note.syllabusPoints.slice(0, baseSyllabusPoints[id].length), baseSyllabusPoints[id], `${id}: original checklist indexes`);
  }
});

test("economic and corporate-planning chapters are substantive", async () => {
  const economics = await readNote("6.1");
  const strategy = await readNote("6.2");
  assert.ok(economics.sections.some(({ id }) => id === "02-economic-influences"));
  for (const term of ["market failure", "unemployment", "fiscal policy", "monetary policy", "supply-side policy", "exchange rate"])
    assert.match(JSON.stringify(economics), new RegExp(term, "i"));
  assert.ok(strategy.sections.some(({ id }) => id === "07-corporate-planning-and-culture"));
  for (const id of ["07-implementation-and-change", "08-leading-and-controlling-strategic-change", "09-contingency-planning-and-crisis-management"])
    assert.ok(strategy.sections.some((section) => section.id === id), `6.2: stable section ${id}`);
  for (const term of ["transformational leadership", "strategic change", "contingency planning", "crisis management"])
    assert.match(JSON.stringify(strategy), new RegExp(term, "i"));
});

test("economic policy teaching is accurate and covers the complete syllabus mechanisms", async () => {
  const economics = await readNote("6.1");
  const text = JSON.stringify(economics);
  const depreciation = economics.analysisChains.find(({ title }) => /currency depreciation/i.test(title));
  assert.match(depreciation.steps.join(" "), /foreign-currency price of exports falls for overseas buyers/i);
  assert.doesNotMatch(depreciation.steps.join(" "), /domestic currency price of exports falls for overseas buyers/i);
  assert.match(text, /expansionary fiscal policy/i);
  assert.match(text, /contractionary fiscal policy/i);
  assert.match(text, /foreign currency reserves/i);
  assert.match(text, /social audit/i);
  assert.match(text, /accounting practices/i);
  assert.match(text, /contract incentives/i);
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

  const asOwnershipTasks = businessExamFocus["1.2"].tasks.flatMap(({ prompt, markPoints }) => [prompt, ...markPoints]).join(" ");
  assert.doesNotMatch(asOwnershipTasks, /privatisation|nationalisation/i, "1.2: AS tasks must not assess A Level-only ownership policy");

  const economicsTasks = businessExamFocus["6.1"].tasks.flatMap(({ prompt, markPoints }) => [prompt, ...markPoints]).join(" ");
  assert.match(economicsTasks, /fiscal policy/i);
  assert.match(economicsTasks, /monetary policy/i);
  assert.match(economicsTasks, /supply-side policy/i);
  assert.match(economicsTasks, /exchange rate/i);
  assert.match(economicsTasks, /transmission/i);

  const strategyTasks = businessExamFocus["6.2"].tasks.flatMap(({ prompt, markPoints }) => [prompt, ...markPoints]).join(" ");
  for (const term of ["corporate planning", "culture", "transformational leadership", "strategic change", "contingency planning", "crisis management"])
    assert.match(strategyTasks, new RegExp(term, "i"), `6.2 exam task coverage: ${term}`);
});
