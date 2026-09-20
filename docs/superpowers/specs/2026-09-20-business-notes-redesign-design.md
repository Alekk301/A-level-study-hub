# Business Notes Redesign

**Date:** 2026-09-20  
**Subject:** Cambridge International AS & A Level Business 9609  
**Status:** Approved design; implementation not started

## Objective

Redesign all Business notes so that they are useful as a student's main revision resource rather than a short definition list. The finished notes must follow the current Cambridge 9609 syllabus, expose the coursebook's 36-chapter structure, and teach the knowledge, application, analysis and evaluation required by past-paper mark schemes.

The redesign must preserve existing topic URLs and locally stored progress, bookmarks, checklist state and highlights.

## Evidence hierarchy

Content will be researched and cross-checked in this order:

1. Cambridge International AS & A Level Business 9609 syllabus for 2026–2028: authoritative scope and learning outcomes.
2. The user's `resources/business.pdf`: authoritative coursebook chapter structure and primary explanation reference.
3. The user's `resources/AS LEVEL NOTES.docx`: detailed AS revision reference.
4. Official Cambridge past papers, mark schemes and examiner reports: evidence for recurring question demands, accepted terminology, calculation method, analysis and evaluation expectations.
5. Professional revision resources such as Save My Exams and ZNotes: independent coverage and presentation cross-checks.

All website prose, diagrams, examples and answer guidance will be original. Third-party prose and copyrighted diagrams will not be copied. A real image may be used only when it materially improves learning, has a suitable reuse licence and is attributed.

## Information architecture

### Decision

Use a hybrid structure:

- The Business catalogue shows all 36 numbered coursebook chapters.
- Existing syllabus-topic routes remain the canonical note pages.
- When more than one coursebook chapter maps to one route, each catalogue chapter links to a stable section anchor on that page.
- When one coursebook chapter contains more than one routed syllabus topic, it shows both subtopic links.

This makes missing chapters discoverable without migrating saved user data or duplicating content.

### Chapter mapping

#### Unit 1 — Business and its environment

| Coursebook chapter | Existing route | Destination |
| --- | --- | --- |
| 1 Enterprise | `1.1` | Page start |
| 2 Business structure | `1.2` | Page start |
| 3 Size of business | `1.3` | Page start |
| 4 Business objectives | `1.4` | Page start |
| 5 Stakeholders in a business | `1.5` | Page start |
| 6 External influences on business activity | `6.1` | External political, legal, social, technological, environmental and international influences anchor |
| 7 External economic influences on business activity | `6.1` | Economic influences anchor |
| 8 Business strategy | `6.2` | Strategic analysis and choice anchor |
| 9 Corporate planning and implementation | `6.2` | Corporate planning, culture, strategic change and contingency planning anchor |

#### Unit 2 — Human resource management

| Coursebook chapter | Existing route |
| --- | --- |
| 10 Human resource management | `2.1` |
| 11 Motivation | `2.2` |
| 12 Management | `2.3` |
| 13 Organisational structure | `7.1` |
| 14 Business communication | `7.2` |
| 15 Leadership | `7.3` |
| 16 Human resource management strategy | `7.4` |

#### Unit 3 — Marketing

| Coursebook chapter | Existing route | Destination |
| --- | --- | --- |
| 17 The nature of marketing | `3.1` | Page start |
| 18 Market research | `3.2` | Page start |
| 19 The marketing mix — product and price | `3.3` | Product and price anchor |
| 20 The marketing mix — promotion and place | `3.3` | Promotion and place anchor |
| 21 Marketing analysis | `8.1` | Page start |
| 22 Marketing strategy | `8.2` | Page start |

#### Unit 4 — Operations management

| Coursebook chapter | Existing route |
| --- | --- |
| 23 The nature of operations | `4.1` |
| 24 Inventory management | `4.2` |
| 25 Capacity utilisation and outsourcing | `4.3` |
| 26 Location and scale | `9.1` |
| 27 Quality management | `9.2` |
| 28 Operations strategy | `9.3` |

#### Unit 5 — Finance and accounting

| Coursebook chapter | Existing route |
| --- | --- |
| 29 Business finance | `5.1`, `5.2` |
| 30 Forecasting and managing cash flows | `5.3` |
| 31 Costs | `5.4` |
| 32 Budgets | `5.5` |
| 33 Financial statements | `10.1` |
| 34 Analysis of published accounts | `10.2` |
| 35 Investment appraisal | `10.3` |
| 36 Finance and accounting strategy | `10.4` |

## Catalogue experience

The existing AS/A2 tabs remain. Each level lists only its relevant chapters, grouped under the five coursebook units. A chapter expands to show its smaller routed syllabus topics. A chapter with a dedicated section anchor opens that exact section rather than the top of a long page.

The catalogue must visibly include Chapter 7, **External economic influences on business activity**, and Chapter 9, **Corporate planning and implementation**.

Progress remains topic-based because that is the existing durable storage key. A duplicated route displayed under two coursebook chapters must not be counted twice in the overall progress total.

## Note-page learning design

The current shared renderer will be reused. No new content framework or dependency is required unless implementation reveals an unavoidable limitation.

Each note should include the applicable subset of the following:

1. **Overview:** the business decision or problem the topic helps solve.
2. **Syllabus checklist:** short, independently tickable outcomes written in student language.
3. **Key language:** precise definitions embedded in useful business context.
4. **Complete notes:** mechanisms, causes, consequences and connections rather than isolated facts.
5. **Decision factors:** what makes a method appropriate or inappropriate in different contexts.
6. **Advantages and limitations:** applied consequences rather than generic lists.
7. **Worked method:** formulas, calculations or a repeatable decision process where relevant.
8. **Business context:** concise real or realistic examples used to demonstrate application.
9. **Visual model:** an original diagram, matrix, continuum, process, graph or comparison table when it reduces cognitive load.
10. **Exam application:** common question patterns and how to turn knowledge into contextual analysis.
11. **Evaluation:** conditions, trade-offs, time horizon, stakeholder effects and a justified judgement.
12. **Common mistakes:** errors evidenced by official mark schemes or examiner reports.
13. **Quick recall:** click-to-reveal questions that test explanation and application as well as definitions.

The existing visual distinction between core notes and a detached “mark-scheme focus” must not lead to duplicated or fragmented explanations. Mark-scheme requirements will be integrated into the relevant content sections; the exam-focus block remains a concise practice and answer-planning summary.

## Exam-ready content standard

Every routed Business note must:

- cover every syllabus point assigned to the topic;
- explain at least one complete cause-and-effect chain;
- include contextual application guidance;
- show relevant advantages, disadvantages or decision factors;
- include evaluation that states what the judgement depends on;
- include useful recall prompts and common errors;
- use Cambridge terminology and current syllabus formulas;
- distinguish similar concepts that students commonly confuse;
- avoid unsupported absolutes such as “always” and “best”;
- avoid filler, repeated definitions and decorative visuals.

A2 notes require greater strategic integration. They should connect functional decisions to corporate objectives, finance, stakeholders, implementation risk and external change.

## Priority corrections

### Chapter 7 — External economic influences

The `6.1` note must visibly and substantially cover:

- government intervention and market failure;
- unemployment, inflation and economic growth;
- fiscal, monetary, supply-side and exchange-rate policy;
- transmission from policy or economic change to demand, costs, investment, employment, competitiveness and business decisions;
- different effects by industry, business size, gearing, import/export exposure and time horizon.

### Chapter 9 — Corporate planning and implementation

The `6.2` note must visibly and substantially cover:

- meaning, purpose and limitations of corporate planning;
- corporate culture and its effect on strategy;
- transformational leadership;
- causes, types, management and control of strategic change;
- resistance to change and implementation risk;
- contingency planning and crisis management;
- evaluation of plans using objectives, resources, uncertainty, stakeholder response and time.

## Visual policy

Reuse the existing accessible SVG/CSS visual system. Add or revise visuals only where they teach a model, relationship or process better than prose. Priority Business visuals include:

- stakeholder power–interest matrix;
- motivation-theory comparisons;
- organisational structures and communication flows;
- product portfolio and positioning models;
- elasticity and forecasting relationships;
- SWOT, PEST, Five Forces, Ansoff and decision trees;
- force-field analysis and strategic-change process;
- economic-policy transmission chains;
- inventory, capacity, break-even and critical-path diagrams;
- ratio interpretation, investment appraisal and finance trade-off models.

Every visual needs meaningful accessible text and an explicit exam-use explanation. Decorative stock images are excluded.

## Data and compatibility

- Keep canonical topic IDs and routes unchanged.
- Keep the existing `TopicNote` schema unless a required outcome cannot be represented cleanly.
- Prefer mapping metadata and section anchors over duplicated pages or content.
- Keep storage keys unchanged for completion, bookmarks, checklists and highlights.
- Ensure anchor IDs are stable, unique and URL-safe.
- Preserve lazy loading through the existing note registry.

## Quality controls

### Content checks

- Map every 2026–2028 Business syllabus bullet to at least one note section.
- Confirm all 36 coursebook chapters are represented in the catalogue.
- Confirm all 34 existing topic routes still resolve.
- Check formulas and calculation examples against the syllabus and official mark schemes.
- Check examiner guidance against more than one paper/session where possible so a single question is not treated as a universal rule.
- Review all professional-source research for original wording and independent accuracy.

### Automated checks

- Add a focused chapter-mapping test for all 36 Business chapters and their routes/anchors.
- Add coverage validation for required Business note fields and syllabus points.
- Preserve current visual-coverage, search, registry, route and rendered-HTML tests.
- Run lint, type/build validation and the full test suite.

### Browser checks

- Test Business catalogue and representative AS/A2 pages at mobile and desktop widths.
- Verify Chapter 7 and Chapter 9 deep links land on the intended sections.
- Verify checklist state, completion, bookmarks and highlights persist after reload.
- Verify diagrams, tables, formulas and recall controls remain readable and keyboard accessible.

## Delivery sequence

1. Implement and test the 36-chapter catalogue mapping.
2. Establish content validation and the shared exam-ready page pattern using the existing schema.
3. Rebuild Unit 1, including the missing economic and corporate-planning depth.
4. Rebuild Units 2–5, completing AS and A2 coverage.
5. Review visuals and add only the models needed for understanding.
6. Run content, automated and browser verification.
7. Present the local result for review before publishing or pushing unless the user explicitly asks for those actions.

## Out of scope

- Changing the Business syllabus code or examination structure.
- Copying paid revision notes, coursebook prose or copyrighted diagrams.
- Replacing the existing progress/highlight storage model.
- Introducing a CMS, database or new UI framework.
- Redesigning the other three subjects during this work.
