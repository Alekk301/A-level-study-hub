import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "src/data");
const notesRoot = path.join(dataRoot, "notes");
const subjects = JSON.parse(await fs.readFile(path.join(dataRoot, "subjects.json"), "utf8"));

const notes = new Map();
for (const subject of subjects) {
  const directory = path.join(notesRoot, subject.code);
  let files = [];
  try {
    files = (await fs.readdir(directory)).filter((file) => file.endsWith(".json"));
  } catch {
    continue;
  }
  for (const file of files) {
    const note = JSON.parse(await fs.readFile(path.join(directory, file), "utf8"));
    notes.set(`${note.subject}:${note.id}`, note);
  }
}

const registryEntries = [...notes.keys()].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true }),
);
const registry = [
  'import type { TopicNote } from "@/src/types/content";',
  "",
  "export const noteLoaders: Record<string, () => Promise<TopicNote>> = {",
  ...registryEntries.map((key) => {
    const [subject, id] = key.split(":");
    return `  "${key}": () => import("./${subject}/${id}.json").then((module) => module.default as TopicNote),`;
  }),
  "};",
  "",
  "export const hasDetailedNote = (key: string) => Object.hasOwn(noteLoaders, key);",
  "",
].join("\n");
await fs.writeFile(path.join(notesRoot, "registry.ts"), registry);

const searchIndex = [];
for (const subject of subjects) {
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      const key = `${subject.code}:${topic.id}`;
      const note = notes.get(key);
      const fragments = [
        { kind: "Overview", text: note?.overview ?? topic.summary },
        ...(note?.definitions ?? []).map((definition) => ({
          kind: "Definition",
          label: definition.term,
          text: definition.definition,
        })),
        ...(note?.sections ?? []).flatMap((section) => [
          { kind: "Section", text: section.title },
          ...section.content.map((text) => ({ kind: "Content", label: section.title, text })),
          ...section.bullets.map((text) => ({ kind: "Content", label: section.title, text })),
          ...section.examples.map((example) => ({ kind: "Example", label: section.title, text: example.content })),
        ]),
        ...(note?.quickRecall ?? topic.focusPoints).flatMap((item) =>
          typeof item === "string"
            ? [{ kind: "Quick recall", text: item }]
            : [
                { kind: "Quick recall question", text: item.question },
                { kind: "Quick recall answer", label: item.question, text: item.answer },
              ],
        ),
      ];
      searchIndex.push({
        key,
        subject: subject.code,
        subjectName: subject.name,
        level: topic.level,
        levels: topic.levels,
        unitId: unit.id,
        unitTitle: unit.title,
        topicId: topic.id,
        title: topic.title,
        contentDepth: topic.contentDepth,
        aliases: subject.aliases,
        fragments,
      });
    }
  }
}

await fs.mkdir(path.join(dataRoot, "generated"), { recursive: true });
await fs.writeFile(
  path.join(dataRoot, "generated/search-index.json"),
  `${JSON.stringify(searchIndex, null, 2)}\n`,
);

console.log(`Rebuilt ${registryEntries.length} lazy note loaders and ${searchIndex.length} search entries.`);
