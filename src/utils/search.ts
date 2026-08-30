import type {
  SearchFragment,
  SearchIndexEntry,
  SearchMatch,
} from "@/src/types/content";

const normalize = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.%+\-]+/g, " ")
    .trim();

function fragmentScore(fragment: SearchFragment, tokens: string[]) {
  const text = normalize(`${fragment.label ?? ""} ${fragment.text}`);
  const matches = tokens.filter((token) => text.includes(token)).length;
  return matches * 8 + (matches === tokens.length ? 20 : 0);
}

export function searchTopics(
  index: SearchIndexEntry[],
  rawQuery: string,
  limit = 30,
): SearchMatch[] {
  const query = normalize(rawQuery);
  if (!query) return [];
  const tokens = [...new Set(query.split(/\s+/).filter(Boolean))];

  return index
    .flatMap((entry) => {
      const identity = normalize(
        `${entry.subject} ${entry.subjectName} ${entry.aliases.join(" ")} ${entry.topicId} ${entry.title} ${entry.unitTitle}`,
      );
      const searchable = normalize(
        `${identity} ${entry.fragments.map((fragment) => `${fragment.label ?? ""} ${fragment.text}`).join(" ")}`,
      );
      if (!tokens.every((token) => searchable.includes(token))) return [];

      let score = tokens.reduce(
        (total, token) => total + (identity.includes(token) ? 12 : 3),
        0,
      );
      if (normalize(entry.topicId) === query) score += 90;
      if (normalize(entry.subject) === query) score += 70;
      if (normalize(entry.title) === query) score += 100;
      if (normalize(entry.title).startsWith(query)) score += 45;
      if (normalize(entry.title).includes(query)) score += 25;

      const rankedFragments = entry.fragments
        .map((fragment) => ({ fragment, score: fragmentScore(fragment, tokens) }))
        .sort((a, b) => b.score - a.score);
      const best = rankedFragments[0] ?? {
        fragment: { kind: "Topic", text: entry.title },
        score: 0,
      };
      score += best.score;
      return [{ ...entry, score, matchedFragment: best.fragment }];
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
