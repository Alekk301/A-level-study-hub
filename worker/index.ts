/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { getXtraPapersSourceUrl } from "../src/utils/pdf";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

async function handlePdfPreview(request: Request, url: URL) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const sourceUrl = getXtraPapersSourceUrl(url.searchParams.get("source"));
  if (!sourceUrl) {
    return new Response("Invalid paper URL", { status: 400 });
  }

  const upstreamHeaders = new Headers({ Accept: "application/pdf" });
  const range = request.headers.get("Range");
  if (range) upstreamHeaders.set("Range", range);

  let upstream: Response;
  try {
    upstream = await fetch(sourceUrl, { method: request.method, headers: upstreamHeaders });
  } catch {
    return new Response("The PDF preview is temporarily unavailable. Use Open separately or Download instead.", { status: 502 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("The PDF preview is temporarily unavailable. Use Open separately or Download instead.", { status: 502 });
  }

  const contentType = upstream.headers.get("Content-Type") ?? "";
  if (!contentType.toLowerCase().includes("application/pdf")) {
    return new Response("The source did not return a PDF. Use Open separately or Download instead.", { status: 502 });
  }

  const responseHeaders = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline",
    "Cache-Control": upstream.headers.get("Cache-Control") ?? "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });
  for (const name of ["Accept-Ranges", "Content-Length", "Content-Range", "ETag", "Last-Modified"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/papers/pdf") {
      return handlePdfPreview(request, url);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
