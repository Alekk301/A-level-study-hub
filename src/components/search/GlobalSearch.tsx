"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenText, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SearchIndexEntry } from "@/src/types/content";
import { paths } from "@/src/utils/paths";
import { searchTopics } from "@/src/utils/search";

function excerpt(text: string, query: string) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 170) return cleaned;
  const firstToken = query.trim().split(/\s+/)[0]?.toLowerCase();
  const match = firstToken ? cleaned.toLowerCase().indexOf(firstToken) : -1;
  const start = Math.max(0, (match >= 0 ? match : 0) - 55);
  const end = Math.min(cleaned.length, start + 170);
  return `${start ? "…" : ""}${cleaned.slice(start, end)}${end < cleaned.length ? "…" : ""}`;
}

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!open || index || loadError) return;
    import("@/src/data/generated/search-index.json")
      .then((module) => setIndex(module.default as unknown as SearchIndexEntry[]))
      .catch(() => setLoadError(true));
  }, [open, index, loadError]);

  const results = useMemo(
    () => (index && query.trim() ? searchTopics(index, query) : []),
    [index, query],
  );

  const choose = (subject: string, topicId: string) => {
    onOpenChange(false);
    router.push(paths.topic(subject, topicId));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setQuery("");
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="search-dialog" showCloseButton>
        <DialogHeader className="sr-only">
          <DialogTitle>Search all revision notes</DialogTitle>
          <DialogDescription>
            Search subject codes, topic titles, definitions, headings and note content.
          </DialogDescription>
        </DialogHeader>
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search “hash function”, “NPV”, “13.2”…"
            aria-label="Search all notes"
          />
          <CommandList className="search-results">
            {!query.trim() ? (
              <div className="search-prompt">
                <Search aria-hidden="true" />
                <p>Search across all four subjects and every note section.</p>
                <span>Tip: press / from anywhere.</span>
              </div>
            ) : null}
            {query.trim() && !index && !loadError ? (
              <div className="search-prompt" role="status">Loading the note index…</div>
            ) : null}
            {loadError ? (
              <div className="search-prompt search-prompt--error" role="alert">
                Search could not load. Close this window and try again.
              </div>
            ) : null}
            {query.trim() && index ? (
              <>
                <CommandEmpty>No topics match “{query}”. Try a shorter term or topic number.</CommandEmpty>
                <CommandGroup heading={`${results.length} result${results.length === 1 ? "" : "s"}`}>
                  {results.map((result) => (
                    <CommandItem
                      key={result.key}
                      value={result.key}
                      onSelect={() => choose(result.subject, result.topicId)}
                      className="search-result"
                    >
                      <BookOpenText aria-hidden="true" />
                      <span className="search-result__body">
                        <span className="search-result__eyebrow">
                          {result.subject} · {result.level} · {result.matchedFragment.kind}
                        </span>
                        <strong>{result.topicId} {result.title}</strong>
                        <small>
                          {result.matchedFragment.label ? `${result.matchedFragment.label}: ` : ""}
                          {excerpt(result.matchedFragment.text, query)}
                        </small>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
