"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark" | "system";

export interface SavedHighlight {
  id: string;
  start: number;
  end: number;
  text: string;
  prefix: string;
  suffix: string;
  createdAt: number;
}

interface RecentTopic {
  key: string;
  openedAt: number;
}

interface StudyState {
  version: 1;
  bookmarks: string[];
  completed: string[];
  syllabusChecks: Record<string, string[]>;
  highlights: Record<string, SavedHighlight[]>;
  recent: RecentTopic[];
  lastOpened: string | null;
  theme: ThemePreference;
}

interface StudyContextValue extends StudyState {
  hydrated: boolean;
  toggleBookmark: (key: string) => void;
  toggleCompleted: (key: string) => void;
  toggleSyllabusPoint: (topicKey: string, pointKey: string) => void;
  addHighlight: (topicKey: string, highlight: SavedHighlight) => void;
  removeHighlight: (topicKey: string, highlightId: string) => void;
  recordOpened: (key: string) => void;
  setTheme: (theme: ThemePreference) => void;
  isBookmarked: (key: string) => boolean;
  isCompleted: (key: string) => boolean;
  isSyllabusPointChecked: (topicKey: string, pointKey: string) => boolean;
}

const STORAGE_KEY = "caie-study-hub:study-state:v1";

const initialState: StudyState = {
  version: 1,
  bookmarks: [],
  completed: [],
  syllabusChecks: {},
  highlights: {},
  recent: [],
  lastOpened: null,
  theme: "system",
};

const StudyContext = createContext<StudyContextValue | null>(null);

function parseHighlights(value: unknown): Record<string, SavedHighlight[]> {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, highlights]) => Array.isArray(highlights))
      .map(([topicKey, highlights]) => [
        topicKey,
        (highlights as unknown[])
          .filter((highlight: unknown): highlight is SavedHighlight => {
            if (!highlight || typeof highlight !== "object") return false;
            const item = highlight as Partial<SavedHighlight>;
            return (
              typeof item.id === "string" &&
              item.id.length > 0 &&
              Number.isInteger(item.start) &&
              Number.isInteger(item.end) &&
              Number(item.start) >= 0 &&
              Number(item.end) > Number(item.start) &&
              typeof item.text === "string" &&
              item.text.trim().length > 0 &&
              Number.isFinite(item.createdAt)
            );
          })
          .map((highlight: SavedHighlight) => ({
            ...highlight,
            prefix: typeof highlight.prefix === "string" ? highlight.prefix : "",
            suffix: typeof highlight.suffix === "string" ? highlight.suffix : "",
          }))
          .slice(-100),
      ])
      .filter(([, highlights]) => (highlights as SavedHighlight[]).length > 0),
  );
}

export function parseStoredState(value: string | null): StudyState {
  if (!value) return initialState;
  try {
    const parsed = JSON.parse(value) as Partial<StudyState>;
    const validTheme =
      parsed.theme === "light" ||
      parsed.theme === "dark" ||
      parsed.theme === "system"
        ? parsed.theme
        : "system";
    return {
      version: 1,
      bookmarks: Array.isArray(parsed.bookmarks)
        ? parsed.bookmarks.filter((item): item is string => typeof item === "string")
        : [],
      completed: Array.isArray(parsed.completed)
        ? parsed.completed.filter((item): item is string => typeof item === "string")
        : [],
      syllabusChecks:
        parsed.syllabusChecks && typeof parsed.syllabusChecks === "object"
          ? Object.fromEntries(
              Object.entries(parsed.syllabusChecks)
                .filter(([, points]) => Array.isArray(points))
                .map(([topicKey, points]) => [
                  topicKey,
                  points.filter((point): point is string => typeof point === "string"),
                ]),
            )
          : {},
      highlights: parseHighlights(parsed.highlights),
      recent: Array.isArray(parsed.recent)
        ? parsed.recent
            .filter(
              (item): item is RecentTopic =>
                Boolean(item) &&
                typeof item.key === "string" &&
                Number.isFinite(item.openedAt),
            )
            .slice(0, 12)
        : [],
      lastOpened: typeof parsed.lastOpened === "string" ? parsed.lastOpened : null,
      theme: validTheme,
    };
  } catch {
    return initialState;
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const didLoad = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(parseStoredState(window.localStorage.getItem(STORAGE_KEY)));
      didLoad.current = true;
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!didLoad.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setState(parseStoredState(event.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const resolved = state.theme === "system" ? (media.matches ? "dark" : "light") : state.theme;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [state.theme]);

  const toggleBookmark = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(key)
        ? current.bookmarks.filter((item) => item !== key)
        : [...current.bookmarks, key],
    }));
  }, []);

  const toggleCompleted = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      completed: current.completed.includes(key)
        ? current.completed.filter((item) => item !== key)
        : [...current.completed, key],
    }));
  }, []);

  const toggleSyllabusPoint = useCallback((topicKey: string, pointKey: string) => {
    setState((current) => {
      const checked = current.syllabusChecks[topicKey] ?? [];
      const next = checked.includes(pointKey)
        ? checked.filter((item) => item !== pointKey)
        : [...checked, pointKey];
      const syllabusChecks = { ...current.syllabusChecks };
      if (next.length) syllabusChecks[topicKey] = next;
      else delete syllabusChecks[topicKey];
      return { ...current, syllabusChecks };
    });
  }, []);

  const addHighlight = useCallback((topicKey: string, highlight: SavedHighlight) => {
    setState((current) => {
      const saved = current.highlights[topicKey] ?? [];
      if (saved.some((item) => item.start === highlight.start && item.end === highlight.end)) {
        return current;
      }
      return {
        ...current,
        highlights: {
          ...current.highlights,
          [topicKey]: [...saved, highlight].slice(-100),
        },
      };
    });
  }, []);

  const removeHighlight = useCallback((topicKey: string, highlightId: string) => {
    setState((current) => {
      const next = (current.highlights[topicKey] ?? []).filter(
        (highlight) => highlight.id !== highlightId,
      );
      const highlights = { ...current.highlights };
      if (next.length) highlights[topicKey] = next;
      else delete highlights[topicKey];
      return { ...current, highlights };
    });
  }, []);

  const recordOpened = useCallback((key: string) => {
    setState((current) => ({
      ...current,
      lastOpened: key,
      recent: [
        { key, openedAt: Date.now() },
        ...current.recent.filter((item) => item.key !== key),
      ].slice(0, 12),
    }));
  }, []);

  const setTheme = useCallback((theme: ThemePreference) => {
    setState((current) => ({ ...current, theme }));
  }, []);

  const bookmarks = useMemo(() => new Set(state.bookmarks), [state.bookmarks]);
  const completed = useMemo(() => new Set(state.completed), [state.completed]);

  const value = useMemo<StudyContextValue>(
    () => ({
      ...state,
      hydrated,
      toggleBookmark,
      toggleCompleted,
      toggleSyllabusPoint,
      addHighlight,
      removeHighlight,
      recordOpened,
      setTheme,
      isBookmarked: (key) => bookmarks.has(key),
      isCompleted: (key) => completed.has(key),
      isSyllabusPointChecked: (topicKey, pointKey) =>
        (state.syllabusChecks[topicKey] ?? []).includes(pointKey),
    }),
    [
      state,
      hydrated,
      toggleBookmark,
      toggleCompleted,
      toggleSyllabusPoint,
      addHighlight,
      removeHighlight,
      recordOpened,
      setTheme,
      bookmarks,
      completed,
    ],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy must be used within StudyProvider");
  return context;
}
