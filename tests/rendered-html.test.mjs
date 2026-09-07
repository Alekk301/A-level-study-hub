import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders production metadata and the dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>CAIE Study Hub<\/title>/);
  assert.match(html, /Study with less friction/);
  assert.match(html, /Mathematics/);
  assert.match(html, /Computer Science/);
  assert.match(html, /Business/);
  assert.match(html, /Chemistry/);
  assert.match(html, /Made by/);
  assert.match(html, /Alex Le/);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /codex-preview/);
});

test("refreshing a dynamic topic route returns the application", async () => {
  const response = await render("/subject/9618/notes/13.2");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(await response.text(), /Loading topic notes/);
});
