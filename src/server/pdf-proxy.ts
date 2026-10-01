import { getXtraPapersSourceUrl } from "../utils/pdf";

const unavailable = () => new Response(
  "The PDF preview is temporarily unavailable. Use Open separately or Download instead.",
  { status: 502 },
);

export async function handlePdfPreview(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const sourceUrl = getXtraPapersSourceUrl(new URL(request.url).searchParams.get("source"));
  if (!sourceUrl) return new Response("Invalid paper URL", { status: 400 });

  const upstreamHeaders = new Headers({ Accept: "application/pdf" });
  const range = request.headers.get("Range");
  if (range) upstreamHeaders.set("Range", range);

  let upstream: Response;
  try {
    upstream = await fetch(sourceUrl, { method: request.method, headers: upstreamHeaders });
  } catch {
    return unavailable();
  }

  if (!upstream.ok && upstream.status !== 206) return unavailable();
  if (!upstream.headers.get("Content-Type")?.toLowerCase().includes("application/pdf")) {
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
