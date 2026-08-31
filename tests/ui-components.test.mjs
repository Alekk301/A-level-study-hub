import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
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

test("keeps responsive navigation, note TOC and reduced-motion safeguards", async () => {
  const responsive = await readFile(path.join(root, "src/styles/responsive.css"), "utf8");
  const theme = await readFile(path.join(root, "src/styles/theme.css"), "utf8");

  assert.match(responsive, /@media \(max-width: 767px\)/);
  assert.match(responsive, /\.mobile-nav\s*\{/);
  assert.match(responsive, /\.table-of-contents \{ display: none; \}/);
  assert.match(responsive, /@media \(max-width: 420px\)/);
  assert.match(theme, /:focus-visible/);
  assert.match(theme, /@media \(prefers-reduced-motion: reduce\)/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("renders preview-first paper actions with a separate download", async () => {
  const { PdfActions, getPdfPreviewUrl } = await vite.ssrLoadModule(
    "/src/components/papers/PdfActions.tsx",
  );
  const downloadUrl = "https://xtrapapers.co/example.pdf/download";
  const html = renderToStaticMarkup(
    React.createElement(PdfActions, { qp: downloadUrl, ms: downloadUrl }),
  );

  assert.equal(
    getPdfPreviewUrl(downloadUrl),
    "/api/papers/pdf?source=https%3A%2F%2Fxtrapapers.co%2Fexample.pdf%2Fdownload",
  );
  assert.match(html, /View full PDF/);
  assert.match(html, /Download Question Paper/);
  assert.match(html, /example\.pdf\/download/);
});

test("renders syllabus outcomes as checkboxes and recall answers as disclosures", async () => {
  const { StudyProvider } = await vite.ssrLoadModule("/src/hooks/use-study.tsx");
  const { SyllabusChecklist } = await vite.ssrLoadModule(
    "/src/components/notes/SyllabusChecklist.tsx",
  );
  const { QuickRecall } = await vite.ssrLoadModule(
    "/src/components/notes/QuickRecall.tsx",
  );
  const checklist = renderToStaticMarkup(
    React.createElement(
      StudyProvider,
      null,
      React.createElement(SyllabusChecklist, {
        topicKey: "9709:3.1",
        points: ["Use the factor theorem."],
      }),
    ),
  );
  const recall = renderToStaticMarkup(
    React.createElement(QuickRecall, {
      items: [{ question: "What is i²?", answer: "i² = −1." }],
    }),
  );

  assert.match(checklist, /type="checkbox"/);
  assert.match(checklist, /Use the factor theorem/);
  assert.match(recall, /<details>/);
  assert.match(recall, /What is i²\?/);
  assert.match(recall, /i² = −1/);
});

test("renders curated, accessible visual explainers across every A2 subject", async () => {
  const { getTopicVisual, TopicVisual, topicVisualCatalog } = await vite.ssrLoadModule(
    "/src/components/notes/TopicVisual.tsx",
  );
  const subjects = new Set(topicVisualCatalog.map((visual) => visual.subject));
  assert.deepEqual([...subjects].sort(), ["9609", "9618", "9701", "9709"]);
  assert.ok(topicVisualCatalog.length >= 24);

  const visual = getTopicVisual("9701", "23");
  const html = renderToStaticMarkup(React.createElement(TopicVisual, { visual }));
  assert.match(html, /Visual explainer/);
  assert.match(html, /Activation energy on an enthalpy profile/);
  assert.match(html, /<svg/);
  assert.match(html, /role="img"/);
  assert.match(html, /Exam link/);

  const normal = renderToStaticMarkup(
    React.createElement(TopicVisual, { visual: getTopicVisual("9709", "5.5") }),
  );
  assert.match(normal, /normal-distribution\.svg/);
  assert.match(normal, /Geek3 via Wikimedia Commons/);
  assert.match(normal, /CC BY 3\.0/);

  const packetSwitching = renderToStaticMarkup(
    React.createElement(TopicVisual, { visual: getTopicVisual("9618", "14.2") }),
  );
  assert.match(packetSwitching, /packet-switching-330\.gif/);
  assert.match(packetSwitching, /Oddbodz via Wikimedia Commons/);
});

test("combines mark-scheme guidance with every A2 topic's complete notes", async () => {
  const subjects = JSON.parse(await readFile(path.join(root, "src/data/subjects.json"), "utf8"));
  const { getExamFocus } = await vite.ssrLoadModule("/src/data/exam-focus/index.ts");
  const { ExamFocusBlock } = await vite.ssrLoadModule(
    "/src/components/notes/ExamFocusBlock.tsx",
  );
  const a2Topics = subjects.flatMap((subject) =>
    subject.units.flatMap((unit) =>
      unit.topics
        .filter((topic) => topic.levels.includes("A2"))
        .map((topic) => ({ subject: subject.code, id: topic.id })),
    ),
  );

  assert.equal(a2Topics.length, 69);
  for (const topic of a2Topics) {
    const focus = getExamFocus(topic.subject, topic.id);
    assert.ok(focus, `missing mark-scheme focus for ${topic.subject}:${topic.id}`);
    assert.ok(focus.answerMethod.length >= 4, `short answer method for ${topic.subject}:${topic.id}`);
    assert.ok(focus.tasks.length >= 2, `too few recurring tasks for ${topic.subject}:${topic.id}`);
    assert.ok(
      focus.tasks.every((task) => task.markPoints.length >= 4),
      `underdeveloped mark points for ${topic.subject}:${topic.id}`,
    );
  }

  const html = renderToStaticMarkup(
    React.createElement(ExamFocusBlock, { focus: getExamFocus("9701", "24") }),
  );
  assert.match(html, /How this knowledge earns marks/);
  assert.match(html, /Recurring question/i);
  assert.match(html, /Examiner trap/);
});
