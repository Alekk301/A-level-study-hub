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
