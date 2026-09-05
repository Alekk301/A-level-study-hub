"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChevronDown, Highlighter, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudy, type SavedHighlight } from "@/src/hooks/use-study";

const HIGHLIGHT_NAME = "caie-saved-highlights";
const CONTEXT_LENGTH = 36;
const HIGHLIGHT_CSS = `
  ::highlight(caie-saved-highlights) {
    background-color: rgba(250, 211, 92, 0.72);
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #9f6a00;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.14em;
  }
  [data-theme="dark"] ::highlight(caie-saved-highlights) {
    background-color: rgba(199, 149, 32, 0.58);
    text-decoration-color: #f3cb68;
  }
`;

interface PendingHighlight {
  start: number;
  end: number;
  text: string;
  prefix: string;
  suffix: string;
  left: number;
  top: number;
}

interface HighlightRegistryLike {
  set: (name: string, highlight: unknown) => void;
  delete: (name: string) => void;
}

interface HighlightGlobals {
  CSS?: { highlights?: HighlightRegistryLike };
  Highlight?: new (...ranges: Range[]) => unknown;
}

function getHighlightGlobals() {
  return globalThis as typeof globalThis & HighlightGlobals;
}

function textNodesWithin(root: HTMLElement) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    if (current.textContent) nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function rangeFromOffsets(root: HTMLElement, start: number, end: number) {
  if (start < 0 || end <= start) return null;
  const nodes = textNodesWithin(root);
  let cursor = 0;
  let startNode: Text | null = null;
  let endNode: Text | null = null;
  let startOffset = 0;
  let endOffset = 0;

  for (const node of nodes) {
    const next = cursor + node.data.length;
    if (!startNode && start <= next) {
      startNode = node;
      startOffset = Math.max(0, start - cursor);
    }
    if (end <= next) {
      endNode = node;
      endOffset = Math.max(0, end - cursor);
      break;
    }
    cursor = next;
  }

  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, Math.min(startOffset, startNode.data.length));
  range.setEnd(endNode, Math.min(endOffset, endNode.data.length));
  return range;
}

function findHighlightOffsets(rootText: string, highlight: SavedHighlight) {
  if (rootText.slice(highlight.start, highlight.end) === highlight.text) {
    return { start: highlight.start, end: highlight.end };
  }

  let match = rootText.indexOf(highlight.text);
  const fallback = match;
  while (match >= 0) {
    const prefix = rootText.slice(Math.max(0, match - highlight.prefix.length), match);
    const suffix = rootText.slice(
      match + highlight.text.length,
      match + highlight.text.length + highlight.suffix.length,
    );
    if ((!highlight.prefix || prefix === highlight.prefix) && (!highlight.suffix || suffix === highlight.suffix)) {
      return { start: match, end: match + highlight.text.length };
    }
    match = rootText.indexOf(highlight.text, match + 1);
  }

  return fallback >= 0
    ? { start: fallback, end: fallback + highlight.text.length }
    : null;
}

function selectionWithin(root: HTMLElement): PendingHighlight | null {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;

  const rawText = range.toString();
  const leadingSpace = rawText.length - rawText.trimStart().length;
  const text = rawText.trim();
  if (!text || text.length > 1_500) return null;

  const prefixRange = document.createRange();
  prefixRange.selectNodeContents(root);
  prefixRange.setEnd(range.startContainer, range.startOffset);
  const start = prefixRange.toString().length + leadingSpace;
  const end = start + text.length;
  const rootText = root.textContent ?? "";
  const rect = range.getBoundingClientRect();
  const left = Math.min(Math.max(rect.left + rect.width / 2, 60), window.innerWidth - 60);
  const top = Math.max(rect.top - 50, 12);

  return {
    start,
    end,
    text,
    prefix: rootText.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffix: rootText.slice(end, end + CONTEXT_LENGTH),
    left,
    top,
  };
}

function createHighlightId() {
  return globalThis.crypto?.randomUUID?.() ?? `highlight-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function PersistentHighlighter({
  topicKey,
  children,
}: {
  topicKey: string;
  children: ReactNode;
}) {
  const study = useStudy();
  const rootRef = useRef<HTMLDivElement>(null);
  const rangesRef = useRef(new Map<string, Range>());
  const didScrollToQuery = useRef(false);
  const [pending, setPending] = useState<PendingHighlight | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const highlights = useMemo(
    () => study.highlights[topicKey] ?? [],
    [study.highlights, topicKey],
  );

  const refreshSelection = useCallback(() => {
    const root = rootRef.current;
    setPending(root ? selectionWithin(root) : null);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", refreshSelection);
    window.addEventListener("resize", refreshSelection);
    return () => {
      document.removeEventListener("selectionchange", refreshSelection);
      window.removeEventListener("resize", refreshSelection);
    };
  }, [refreshSelection]);

  useEffect(() => {
    const root = rootRef.current;
    const globals = getHighlightGlobals();
    const registry = globals.CSS?.highlights;
    const HighlightConstructor = globals.Highlight;
    if (!root || !registry || !HighlightConstructor) return;

    const rootText = root.textContent ?? "";
    const savedRanges = new Map<string, Range>();
    for (const highlight of highlights) {
      const offsets = findHighlightOffsets(rootText, highlight);
      if (!offsets) continue;
      const range = rangeFromOffsets(root, offsets.start, offsets.end);
      if (range) savedRanges.set(highlight.id, range);
    }
    rangesRef.current = savedRanges;
    registry.set(HIGHLIGHT_NAME, new HighlightConstructor(...savedRanges.values()));

    if (!didScrollToQuery.current) {
      const requestedId = new URLSearchParams(window.location.search).get("highlight");
      const requestedRange = requestedId ? savedRanges.get(requestedId) : null;
      if (requestedRange) {
        didScrollToQuery.current = true;
        window.requestAnimationFrame(() => {
          requestedRange.startContainer.parentElement?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
    }

    return () => {
      registry.delete(HIGHLIGHT_NAME);
      rangesRef.current.clear();
    };
  }, [highlights, topicKey]);

  const savePendingHighlight = () => {
    if (!pending) return;
    study.addHighlight(topicKey, {
      id: createHighlightId(),
      start: pending.start,
      end: pending.end,
      text: pending.text,
      prefix: pending.prefix,
      suffix: pending.suffix,
      createdAt: Date.now(),
    });
    window.getSelection()?.removeAllRanges();
    setPending(null);
    setAnnouncement("Highlight saved on this device.");
  };

  const jumpToHighlight = (highlightId: string) => {
    const range = rangesRef.current.get(highlightId);
    range?.startContainer.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const removeHighlight = (highlightId: string) => {
    study.removeHighlight(topicKey, highlightId);
    setAnnouncement("Highlight removed.");
  };

  return (
    <>
      <style>{HIGHLIGHT_CSS}</style>
      <section className="highlight-panel" aria-labelledby="highlight-panel-title">
        <div className="highlight-panel__heading">
          <span className="highlight-panel__icon" aria-hidden="true"><Highlighter /></span>
          <div>
            <p>Personal highlights</p>
            <h2 id="highlight-panel-title">Select a useful line to save it</h2>
          </div>
          <span className="highlight-panel__count">
            {study.hydrated ? highlights.length : "–"} saved
          </span>
        </div>
        <p className="highlight-panel__help">
          Select text anywhere in these notes, then choose <strong>Highlight</strong>. It will still be marked when you return on this device.
        </p>
        {highlights.length ? (
          <details className="highlight-panel__saved">
            <summary>
              Review highlights from this topic
              <ChevronDown aria-hidden="true" />
            </summary>
            <ul>
              {highlights.map((highlight, index) => (
                <li key={highlight.id}>
                  <button type="button" onClick={() => jumpToHighlight(highlight.id)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <q>{highlight.text}</q>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeHighlight(highlight.id)}
                    aria-label={`Remove highlight: ${highlight.text.slice(0, 70)}`}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </section>

      <div ref={rootRef} className="highlightable-notes" data-highlight-root="true">
        {children}
      </div>

      {pending ? (
        <div
          className="selection-toolbar"
          role="toolbar"
          aria-label="Text highlight actions"
          style={{ left: pending.left, top: pending.top } as CSSProperties}
          onPointerDown={(event) => event.preventDefault()}
        >
          <Button type="button" size="sm" onClick={savePendingHighlight}>
            <Highlighter aria-hidden="true" />
            Highlight
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              window.getSelection()?.removeAllRanges();
              setPending(null);
            }}
            aria-label="Cancel highlight"
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </>
  );
}
