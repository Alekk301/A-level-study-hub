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
  "2.1": [
    "Explain the purpose and stages of workforce planning.",
    "Analyse recruitment and selection, including job descriptions, person specifications and internal/external recruitment.",
    "Explain employment contracts and flexible working arrangements.",
    "Compare induction, on-the-job and off-the-job training.",
    "Distinguish dismissal and redundancy and analyse equality and diversity.",
    "Calculate and interpret labour turnover, absenteeism and labour productivity.",
    "Explain the role of trade unions and collective bargaining.",
  ],
  "2.2": [
    "Explain why employee motivation matters to business performance.",
    "Analyse Taylor, Mayo, Maslow, Herzberg, McClelland and Vroom as explanations of motivation.",
    "Compare financial motivators including wages, salary, piece rate, commission, bonus, profit sharing and fringe benefits.",
    "Compare non-financial motivators including job rotation, enlargement, enrichment, teamworking, participation, delegation and recognition.",
    "Assess which methods are appropriate in different business contexts.",
  ],
  "2.3": [
    "Explain the main functions of management: planning, organising, directing, coordinating and controlling.",
    "Apply Mintzberg's interpersonal, informational and decisional management roles.",
    "Analyse delegation, authority, responsibility and accountability.",
    "Compare autocratic, democratic and laissez-faire leadership.",
    "Explain McGregor's Theory X and Theory Y assumptions.",
    "Analyse the importance of emotional intelligence and situational management.",
  ],
  "7.1": [
    "Link organisational structure to business objectives.",
    "Compare functional, hierarchical and matrix structures and grouping by function/product/geography.",
    "Explain structural change, growth and delayering.",
    "Use hierarchy, chain of command, span of control, responsibility, authority, delegation and accountability.",
    "Analyse centralisation/decentralisation and line/staff relationships.",
  ],
  "7.2": [
    "Explain situations where effective communication is essential.",
    "Compare spoken, written, electronic and visual communication methods.",
    "Analyse barriers to communication.",
    "Explain how communication affects business efficiency and how it can be improved.",
  ],
  "7.3": [
    "Explain leadership roles of directors, managers, supervisors and worker representatives and qualities of effective leaders.",
    "Apply trait, behavioural, contingency, power/influence and transformational leadership theories.",
    "Explain Goleman's emotional-intelligence competencies: self-awareness, self-management, social awareness and social skills.",
    "Evaluate leadership effectiveness in context.",
  ],
  "7.4": [
    "Compare hard and soft HRM.",
    "Evaluate flexible working contracts and arrangements.",
    "Measure causes/consequences of poor employee performance and recommend improvements.",
    "Explain implementation and usefulness of MBO.",
    "Analyse the changing role of IT and AI in HRM.",
  ],
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
const unitTwo = ["2.1", "2.2", "2.3", "7.1", "7.2", "7.3", "7.4"];
const unitThree = ["3.1", "3.2", "3.3", "8.1", "8.2"];
const unitFour = ["4.1", "4.2", "4.3", "9.1", "9.2", "9.3"];
const baseMarketingSyllabusPoints = {
  "3.1": [
    "Explain the role of marketing and the relationship between marketing and corporate objectives.",
    "Compare market orientation, product orientation, asset-led and societal marketing.",
    "Analyse demand, supply and changes in equilibrium.",
    "Calculate and interpret market size, market growth and market share.",
    "Compare mass and niche marketing.",
    "Analyse market segmentation in consumer and industrial markets.",
  ],
  "3.2": [
    "Explain the purpose and stages of market research.",
    "Distinguish primary and secondary, quantitative and qualitative research.",
    "Compare questionnaires, interviews, focus groups, observation and test marketing.",
    "Assess internal and external secondary sources.",
    "Compare random, stratified, quota and convenience sampling.",
    "Analyse reliability, validity, bias, sample size and the role of information technology.",
  ],
  "3.3": [
    "Analyse product decisions including differentiation, branding, packaging, product portfolios and the product life cycle.",
    "Compare pricing methods. A Level extension: calculate and interpret price elasticity of demand (PED); PED is not assessed in AS Marketing.",
    "Analyse promotional objectives, methods, media and budgets.",
    "Compare direct and intermediary channels of distribution.",
    "Explain customer relationship marketing, the 4Cs, e-commerce and digital promotion.",
    "Assess an integrated marketing mix in context.",
  ],
  "8.1": [
    "Calculate and interpret PED, YED and promotional elasticity and discuss their uses/limitations.",
    "Explain the product-development process, sources of ideas and role of R&D.",
    "Explain why sales forecasting is used.",
    "Calculate/use four-period centred moving averages and qualitative forecasting.",
    "Analyse how forecasts affect business decisions.",
  ],
  "8.2": [
    "Explain contents, benefits and limitations of a marketing plan.",
    "Develop a coordinated marketing strategy consistent with objectives, target market and resources.",
    "Analyse the changing role of IT and AI in marketing.",
    "Analyse international marketing, market selection and entry strategies.",
    "Evaluate pan-global standardisation versus local adaptation.",
  ],
};

const baseOperationsSyllabusPoints = {
  "4.1": [
    "Explain the transformation process and the responsibilities of operations management.",
    "Calculate and interpret labour productivity.",
    "Distinguish efficiency and effectiveness.",
    "Compare labour-intensive and capital-intensive operations.",
    "Compare job, batch, flow and mass-customisation production.",
    "Analyse technology, flexibility and the relationship between operations and other business functions.",
  ],
  "4.2": [
    "Distinguish raw materials, work in progress and finished-goods inventory.",
    "Analyse the benefits and costs of holding inventory.",
    "Interpret inventory-control charts, including maximum level, reorder level, buffer inventory and lead time.",
    "Explain the purpose of reorder quantity and the effects of changing demand or lead time.",
    "Analyse just-in-time inventory management and the conditions required for it to work.",
  ],
  "4.3": [
    "Calculate and interpret capacity utilisation.",
    "Analyse the benefits and risks of high, full and low capacity utilisation.",
    "Explain causes of excess capacity and capacity shortages.",
    "Assess short- and long-term responses to capacity problems.",
    "Analyse outsourcing and business-process outsourcing.",
  ],
  "9.1": [
    "Analyse factors determining location and relocation at local, national and international levels.",
    "Explain reasons for and impacts of offshoring and reshoring.",
    "Analyse how globalisation changes location choices.",
    "Explain factors affecting business scale.",
    "Explain internal/external economies of scale and diseconomies of scale and their effect on unit costs.",
  ],
  "9.2": [
    "Explain why quality matters and how customer expectations define appropriate quality.",
    "Analyse quality-control methods.",
    "Analyse quality-assurance methods.",
    "Analyse Total Quality Management.",
    "Explain the purpose, process and limitations of benchmarking.",
  ],
  "9.3": [
    "Analyse how HR, marketing and finance resources constrain operations decisions.",
    "Analyse IT and AI in operations and process innovation.",
    "Explain flexibility in volume, delivery time and specification.",
    "Explain ERP and its effect on efficiency.",
    "Analyse lean production: Kaizen, quality circles, simultaneous engineering, cell production, JIT and waste management.",
    "Construct/interpret CPA networks, critical paths, minimum duration, total/free float and evaluate CPA.",
  ],
};

test("Business Unit 3 notes are exam ready", async () => {
  for (const id of unitThree) assertExamReady(await readNote(id));
  const mix = await readNote("3.3");
  assert.ok(mix.sections.some(({ id }) => id === "01-product-benefits-differentiation-and-portfolio"));
  assert.ok(mix.sections.some(({ id }) => id === "05-promotion-objectives-and-methods"));
});

test("Unit 3 teaches the complete Marketing syllabus through decisions and data", async () => {
  const coverage = {
    "3.1": ["consumer market", "industrial market", "B2B", "B2C", "psychographic", "customer relationship marketing", "local market", "national market", "international market"],
    "3.2": ["sampling frame", "non-response", "reliability", "validity", "tables", "charts", "graphs"],
    "3.3": ["goods", "services", "tangible", "intangible", "dynamic pricing", "packaging", "branding", "physical distribution"],
    "8.1": ["promotional elasticity", "product development", "R&D", "four-period", "centred moving average", "qualitative forecasting"],
    "8.2": ["marketing plan", "coordinated", "IT", "AI", "exporting", "joint venture", "pan-global", "local adaptation"],
  };
  for (const [id, terms] of Object.entries(coverage)) {
    const note = await readNote(id);
    const teaching = JSON.stringify(note.sections);
    for (const term of terms) assert.match(teaching, new RegExp(term, "i"), `${id}: teaching ${term}`);
    assert.ok(note.sections.some(({ examples }) => examples.length > 0), `${id}: applied or worked example`);
  }
  const marketScope = JSON.stringify((await readNote("3.1")).sections.find(({ id }) => id === "03-changing-markets-and-competition"));
  assert.match(marketScope, /local market[\s\S]*national market[\s\S]*international market/i);
  assert.match(marketScope, /reach[\s\S]*(?:resources|capacity)[\s\S]*adaptation/i);
});

test("Marketing calculations and evidence are taught as methods, not labels", async () => {
  const research = JSON.stringify((await readNote("3.2")).sections);
  assert.match(research, /(?:table|chart|graph)[\s\S]{0,500}(?:percentage|average|trend|comparison)/i);
  const analysis = await readNote("8.1");
  const movingAverage = JSON.stringify(analysis.sections.find(({ id }) => id === "05-four-period-centred-moving-averages"));
  assert.match(movingAverage, /four consecutive periods[\s\S]{0,500}adjacent four-period moving averages/i);
  assert.match(movingAverage, /seasonal variation[\s\S]{0,500}actual[^.]{0,100}centred trend/i);
  assert.match(movingAverage, /same (?:quarter|season)[\s\S]{0,500}(?:extrapolate|project)[\s\S]{0,500}(?:forecast|seasonal variation)/i);
  assert.match(movingAverage, /worked[\s\S]{0,1000}forecast/i);
  const elasticityTeaching = JSON.stringify(analysis.sections.find(({ id }) => id === "02-income-and-promotional-elasticity"));
  assert.match(elasticityTeaching, /0\s*<\s*YED\s*<\s*1[\s\S]{0,200}(?:necessity|income inelastic)/i);
  assert.match(elasticityTeaching, /promotional elasticity[\s\S]{0,500}(?:between 0 and 1|0\s*<)[\s\S]{0,300}negative/i);
  for (const elasticity of ["price", "income", "promotional"])
    assert.match(JSON.stringify(analysis.sections), new RegExp(`${elasticity}[\\s\\S]{0,500}(?:%|percentage).*(?:interpret|elastic|normal|inferior|response)`, "i"));
});

test("AS Marketing labels PED as an A Level bridge without moving the compatibility slot", async () => {
  const mix = await readNote("3.3");
  assert.match(mix.syllabusPoints[1], /A Level extension[\s\S]*not assessed in AS/i);
  const ped = mix.sections.find(({ id }) => id === "04-price-elasticity-of-demand");
  assert.match(ped.title, /A Level extension/i);
  assert.match(JSON.stringify(ped), /not assessed in AS/i);
  assert.ok(mix.examTips.some((tip) => /A Level extension[\s\S]*PED/i.test(tip)));
  assert.ok(mix.quickRecall.some(({ question, answer }) => /A Level extension/i.test(question) && /not assessed in AS/i.test(answer)));
  assert.ok(mix.formulas.some(({ label }) => /A Level extension[\s\S]*price elasticity/i.test(label)));
});

test("Unit 3 exam focus is topic-specific and respects AS/A Level boundaries", async () => {
  const { businessExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/business.ts");
  for (const id of unitThree) {
    const focus = businessExamFocus[id];
    assert.ok(focus?.evidence, `${id}: evidence summary`);
    if (id.startsWith("3.")) assert.equal(focus.component, "AS Level Papers 1 and 2");
    assert.ok(focus.tasks.length >= 2, `${id}: practice tasks`);
    for (const task of focus.tasks) {
      assert.ok(task.markPoints.length >= 4, `${id}: developed mark points`);
      assert.ok(task.examinerTrap, `${id}: examiner trap`);
    }
  }
  const asTasks = ["3.1", "3.2", "3.3"].flatMap((id) => businessExamFocus[id].tasks).map(JSON.stringify).join(" ");
  assert.doesNotMatch(asTasks, /income elasticity|promotional elasticity|centred moving average|pan-global|joint venture|artificial intelligence|\bAI\b/i);
  const analysisTasks = JSON.stringify(businessExamFocus["8.1"].tasks);
  for (const term of ["price elasticity", "income elasticity", "promotional elasticity", "centred moving average", "qualitative"])
    assert.match(analysisTasks, new RegExp(term, "i"), `8.1 exam task coverage: ${term}`);
  const strategyTasks = JSON.stringify(businessExamFocus["8.2"].tasks);
  for (const term of ["IT", "AI", "international", "entry", "pan-global", "adaptation"])
    assert.match(strategyTasks, new RegExp(term, "i"), `8.2 exam task coverage: ${term}`);
});

test("Business Unit 4 notes are exam ready", async () => {
  for (const id of unitFour) assertExamReady(await readNote(id));
});

test("Unit 4 teaches the complete Operations syllabus through decisions and trade-offs", async () => {
  const coverage = {
    "4.1": ["transformation process", "sustainability", "labour intensive", "capital intensive", "job production", "batch production", "flow production", "mass customisation"],
    "4.2": ["supply chain management", "JIC", "JIT", "buffer inventory", "re-order level", "lead time", "resilience"],
    "4.3": ["capacity utilisation", "average fixed cost", "excess capacity", "capacity shortage", "business-process outsourcing", "core activit"],
    "9.1": ["weighted", "qualitative", "offshoring", "reshoring", "globalisation", "purchasing economies", "external economies", "external diseconomies"],
    "9.2": ["quality control", "quality assurance", "TQM", "benchmarking", "prevention cost", "appraisal cost", "internal failure", "external failure"],
    "9.3": ["CAD", "CAM", "AI", "ERP", "Kaizen", "quality circles", "simultaneous engineering", "cell production", "dummy activity", "total float", "free float"],
  };
  for (const [id, terms] of Object.entries(coverage)) {
    const note = await readNote(id);
    const teaching = JSON.stringify(note.sections);
    for (const term of terms) assert.match(teaching, new RegExp(term, "i"), `${id}: teaching ${term}`);
    assert.ok(note.sections.some(({ examples }) => examples.length > 0), `${id}: applied or worked example`);
  }
});

test("Operations calculations show complete workings and business interpretation", async () => {
  const capacity = JSON.stringify((await readNote("4.3")).sections.find(({ id }) => id === "01-calculating-and-interpreting-capacity-utilisation"));
  assert.match(capacity, /18[ ,]?000\s*\/\s*24[ ,]?000\s*(?:×|x)\s*100\s*=\s*75%/i);
  assert.match(capacity, /24[ ,]?000\s*-\s*18[ ,]?000\s*=\s*6[ ,]?000/i);
  assert.match(capacity, /720[ ,]?000\s*\/\s*18[ ,]?000\s*=\s*\$?40[\s\S]{0,250}720[ ,]?000\s*\/\s*24[ ,]?000\s*=\s*\$?30/i);
  assert.match(capacity, /not automatically better|does not automatically/i);

  const cpa = JSON.stringify((await readNote("9.3")).sections.find(({ id }) => id === "06-critical-path-analysis"));
  assert.match(cpa, /A-C-E\s*=\s*3\s*\+\s*5\s*\+\s*3\s*=\s*11/i);
  assert.match(cpa, /B-D-E\s*=\s*4\s*\+\s*2\s*\+\s*3\s*=\s*9/i);
  assert.match(cpa, /critical path[^.]{0,100}A-C-E[^.]{0,100}11/i);
  assert.match(cpa, /B[^.]{0,100}total float[^.]{0,100}2/i);
  assert.match(cpa, /D[^.]{0,100}free float[^.]{0,100}2/i);
  assert.match(cpa, /delay[^.]{0,150}project completion|project completion[^.]{0,150}delay/i);
});

test("Unit 4 comparison tables use the note renderer schema", async () => {
  for (const id of unitFour) {
    const { comparisonTable } = await readNote(id);
    if (!comparisonTable) continue;
    assert.ok(comparisonTable.title, `${id}: comparison table title`);
    assert.ok(Array.isArray(comparisonTable.columns), `${id}: comparison table columns`);
    assert.ok(Array.isArray(comparisonTable.rows), `${id}: comparison table rows`);
    assert.ok(comparisonTable.rows.every((row) => row.length === comparisonTable.columns.length), `${id}: rectangular comparison table`);
  }
});

test("Unit 4 exam focus is topic-specific and respects AS/A Level boundaries", async () => {
  const { businessExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/business.ts");
  for (const id of unitFour) {
    const focus = businessExamFocus[id];
    assert.ok(focus?.evidence, `${id}: evidence summary`);
    if (id.startsWith("4.")) assert.equal(focus.component, "AS Level Papers 1 and 2");
    assert.ok(focus.tasks.length >= 2, `${id}: practice tasks`);
    for (const task of focus.tasks) {
      assert.ok(task.markPoints.length >= 4, `${id}: developed mark points`);
      assert.ok(task.examinerTrap, `${id}: examiner trap`);
    }
  }
  const asTasks = ["4.1", "4.2", "4.3"].flatMap((id) => businessExamFocus[id].tasks).map(JSON.stringify).join(" ");
  assert.doesNotMatch(asTasks, /benchmarking|TQM|critical path|\bCPA\b|\bERP\b|offshoring|reshoring/i);
  assert.match(JSON.stringify(businessExamFocus["9.1"].tasks), /weighted[\s\S]*(?:offshoring|reshoring)/i);
  assert.match(JSON.stringify(businessExamFocus["9.2"].tasks), /prevention[\s\S]*appraisal[\s\S]*(?:failure|benchmarking)/i);
  const strategyTasks = JSON.stringify(businessExamFocus["9.3"].tasks);
  for (const term of ["ERP", "lean", "critical path", "total float", "free float"])
    assert.match(strategyTasks, new RegExp(term, "i"), `9.3 exam task coverage: ${term}`);
});

test("Business Unit 2 notes are exam ready", async () => {
  for (const id of unitTwo) assertExamReady(await readNote(id));
});

test("Unit 2 teaches the syllabus distinctions needed for applied answers", async () => {
  const coverage = {
    "2.1": ["employee welfare", "appraisal", "development", "collective bargaining"],
    "2.2": ["Vroom", "instrumentality", "valence", "participation"],
    "2.3": ["Fayol", "paternalistic", "Mintzberg", "Theory Y"],
    "7.1": ["intrapreneurship", "product", "geographical", "accountability", "trust"],
    "7.2": ["one-way", "two-way", "vertical", "horizontal", "network", "feedback"],
    "7.3": ["trait", "behavioural", "contingency", "power", "transformational", "self-management"],
    "7.4": ["annualised", "compressed", "gig", "MBO", "bias", "policy", "percentage points"],
  };
  for (const [id, terms] of Object.entries(coverage)) {
    const note = await readNote(id);
    const teaching = JSON.stringify(note.sections);
    for (const term of terms) assert.match(teaching, new RegExp(term, "i"), `${id}: teaching ${term}`);
    assert.ok(note.sections.some(({ examples }) => examples.length > 0), `${id}: applied example`);
  }
});

test("2.1 compares the complete recruitment and selection methods", async () => {
  const note = await readNote("2.1");
  const teaching = JSON.stringify(note.sections.filter(({ id }) => /recruitment|selection/.test(id)));
  assert.match(teaching, /employment agenc(?:y|ies)[\s\S]{0,400}(?:specialist|shortlist|cost)/i);
  assert.match(teaching, /online recruitment[\s\S]{0,400}(?:reach|applications|screen|filter)/i);
  assert.match(teaching, /assessment cent(?:re|er)[\s\S]{0,400}(?:multiple|several|cost|time)/i);
  for (const method of ["employment agenc", "online recruitment", "assessment cent"])
    assert.match(teaching, new RegExp(`${method}[\\s\\S]{0,500}(?:but|however|yet|limitation|cost)`, "i"), `${method}: trade-off`);
});

test("7.4 explains flexible-working arrangements rather than listing them", async () => {
  const note = await readNote("7.4");
  const section = JSON.stringify(note.sections.find(({ id }) => id === "02-flexible-contracts-and-working"));
  assert.match(section, /flexitime[\s\S]{0,350}(?:core hours|start|finish)[\s\S]{0,350}(?:coverage|coordination|supervision)/i);
  assert.match(section, /shift working[\s\S]{0,350}(?:continuous|extended|24)[\s\S]{0,350}(?:fatigue|premium|handover)/i);
  assert.match(section, /job sharing[\s\S]{0,350}(?:two employees|two people)[\s\S]{0,350}(?:handover|continuity|accountability)/i);
});

test("Unit 2 exam focus supports topic-specific answers", async () => {
  const { businessExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/business.ts");
  for (const id of unitTwo) {
    const focus = businessExamFocus[id];
    assert.ok(focus?.evidence, `${id}: evidence summary`);
    if (id.startsWith("2.")) assert.equal(focus.component, "AS Level Papers 1 and 2");
    assert.ok(focus.tasks.length >= 2, `${id}: practice tasks`);
    for (const task of focus.tasks) {
      assert.ok(task.markPoints.length >= 4, `${id}: developed mark points`);
      assert.ok(task.examinerTrap, `${id}: examiner trap`);
    }
  }
  const leadership = JSON.stringify(businessExamFocus["7.3"].tasks);
  for (const term of ["trait", "behavioural", "contingency", "power", "transformational"])
    assert.match(leadership, new RegExp(term, "i"), `7.3 exam task coverage: ${term}`);
  assert.match(JSON.stringify(businessExamFocus["7.4"].tasks), /MBO|Management by Objectives/i);
  assert.match(JSON.stringify(businessExamFocus["7.4"].tasks), /AI/i);
});

test("AS 2.1 exam focus does not assess A2 flexible-working contracts", async () => {
  const { businessExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/business.ts");
  const asHrm = JSON.stringify(businessExamFocus["2.1"].tasks);
  assert.doesNotMatch(asHrm, /flexible[- ](?:working|employment)?[- ]?contract|zero[- ]hours|annualised hours|compressed hours|job sharing|gig economy/i);
  assert.match(JSON.stringify(businessExamFocus["7.4"].tasks), /flexible/i);
});

test("Business Unit 1 notes are exam ready", async () => {
  for (const id of unitOne) assertExamReady(await readNote(id));
});

test("existing syllabus checklist indexes remain stable", async () => {
  for (const id of [...unitOne, ...unitTwo, ...unitThree, ...unitFour]) {
    const note = await readNote(id);
    const original = baseSyllabusPoints[id] ?? baseMarketingSyllabusPoints[id] ?? baseOperationsSyllabusPoints[id];
    assert.deepEqual(note.syllabusPoints.slice(0, original.length), original, `${id}: original checklist indexes`);
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
