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
  const scrollToHash = () => getTarget()?.scrollIntoView({ block: "start" });
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
        if (alignedScrollY !== pageWindow.scrollY) return;
        scrollToHash();
        alignedScrollY = pageWindow.scrollY;
      };
      image.addEventListener("load", realign, { once: true });
      image.addEventListener("error", realign, { once: true });
      imageCleanups.add(() => {
        image.removeEventListener("load", realign);
        image.removeEventListener("error", realign);
      });
    });
  };
  const alignAndWatch = () => {
    scrollToHash();
    alignedScrollY = pageWindow.scrollY;
    watchImagesBeforeTarget();
  };

  const frame = pageWindow.requestAnimationFrame(alignAndWatch);
  const retry = pageWindow.setTimeout(alignAndWatch, 100);
  pageWindow.addEventListener("hashchange", alignAndWatch);

  return () => {
    pageWindow.cancelAnimationFrame(frame);
    pageWindow.clearTimeout(retry);
    pageWindow.removeEventListener("hashchange", alignAndWatch);
    stopWatchingImages();
  };
}
