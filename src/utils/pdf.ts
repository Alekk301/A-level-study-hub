const XTRAPAPERS_HOSTS = new Set(["xtrapapers.co", "www.xtrapapers.co"]);

export function getXtraPapersSourceUrl(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !XTRAPAPERS_HOSTS.has(url.hostname.toLowerCase())) return null;
    if (!/\.pdf(?:\/(?:download|raw))?$/i.test(url.pathname)) return null;

    url.pathname = url.pathname.replace(/\.pdf(?:\/(?:download|raw))?$/i, ".pdf/raw");
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function getPdfPreviewUrl(value: string) {
  return `/api/papers/pdf?source=${encodeURIComponent(value)}`;
}
