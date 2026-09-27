type HashScrollDocument = Pick<Document, "getElementById" | "images">;
type HashScrollWindow = Pick<
  Window,
  | "location"
  | "scrollY"
  | "requestAnimationFrame"
  | "cancelAnimationFrame"
  | "setTimeout"
  | "clearTimeout"
  | "addEventListener"
  | "removeEventListener"
>;

const DOCUMENT_POSITION_FOLLOWING = 4;

export function keepHashTargetAligned(
  pageDocument: HashScrollDocument = document,
  pageWindow: HashScrollWindow = window,
) {
  const imageCleanups = new Set<() => void>();
  let alignedScrollY: number | null = null;

  const getTarget = () => {
    const id = pageWindow.location.hash.slice(1);
    return id ? pageDocument.getElementById(id) : null;
  };
  const scrollToHash = () => {
    const target = getTarget();
    if (!target) return false;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    alignedScrollY = pageWindow.scrollY;
    return true;
  };
  const userMoved = () => alignedScrollY !== null && alignedScrollY !== pageWindow.scrollY;
  const stopWatchingImages = () => {
    imageCleanups.forEach((cleanup) => cleanup());
    imageCleanups.clear();
  };
  const watchImagesBeforeTarget = () => {
    stopWatchingImages();
    const target = getTarget();
    if (!target) return;

    Array.from(pageDocument.images).forEach((image) => {
      const isBeforeTarget = Boolean(
        image.compareDocumentPosition(target) & DOCUMENT_POSITION_FOLLOWING,
      );
      if (image.complete || !isBeforeTarget) return;

      const realign = () => {
        if (userMoved()) return;
        scrollToHash();
      };
      image.addEventListener("load", realign, { once: true });
      image.addEventListener("error", realign, { once: true });
      imageCleanups.add(() => {
        image.removeEventListener("load", realign);
        image.removeEventListener("error", realign);
      });
    });
  };
  const alignAndWatch = (respectCurrentPosition = false) => {
    if (respectCurrentPosition && userMoved()) return;
    if (scrollToHash()) watchImagesBeforeTarget();
  };

  const frame = pageWindow.requestAnimationFrame(() => alignAndWatch());
  const retry = pageWindow.setTimeout(() => alignAndWatch(true), 100);
  const handleHashChange = () => alignAndWatch();
  pageWindow.addEventListener("hashchange", handleHashChange);

  return () => {
    pageWindow.cancelAnimationFrame(frame);
    pageWindow.clearTimeout(retry);
    pageWindow.removeEventListener("hashchange", handleHashChange);
    stopWatchingImages();
  };
}
