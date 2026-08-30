import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

test("streams approved XtraPapers PDFs inline and preserves range responses", async () => {
  const worker = await loadWorker();
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";

  globalThis.fetch = async (input, init) => {
    requestedUrl = String(input);
    assert.equal(new Headers(init?.headers).get("Range"), "bytes=0-99");
    return new Response("%PDF-test", {
      status: 206,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Range": "bytes 0-8/9",
        "Accept-Ranges": "bytes",
      },
    });
  };

  try {
    const source = encodeURIComponent("https://xtrapapers.co/example.pdf/download");
    const response = await worker.fetch(
      new Request(`https://study.test/api/papers/pdf?source=${source}`, { headers: { Range: "bytes=0-99" } }),
      env,
      ctx,
    );

    assert.equal(requestedUrl, "https://xtrapapers.co/example.pdf/raw");
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("Content-Type"), "application/pdf");
    assert.equal(response.headers.get("Content-Disposition"), "inline");
    assert.equal(response.headers.get("Content-Range"), "bytes 0-8/9");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects unapproved PDF proxy hosts", async () => {
  const worker = await loadWorker();
  const source = encodeURIComponent("https://example.com/paper.pdf");
  const response = await worker.fetch(
    new Request(`https://study.test/api/papers/pdf?source=${source}`),
    env,
    ctx,
  );
  assert.equal(response.status, 400);
});
