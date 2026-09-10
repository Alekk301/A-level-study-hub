import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const topicIds = ["19.1", "19.2", "20.1", "20.2"];

async function readNote(topicId) {
  const source = await readFile(
    path.join(root, "src", "data", "notes", "9618", `${topicId}.json`),
    "utf8",
  );
  return JSON.parse(source);
}

test("every A2 further-programming note includes labelled code examples", async () => {
  for (const topicId of topicIds) {
    const note = await readNote(topicId);
    const examples = note.sections.flatMap((section) => section.examples);
    const codeExamples = examples.filter((example) => example.kind === "code");

    assert.ok(codeExamples.length >= 2, `${topicId} needs at least two code examples`);
    assert.ok(
      codeExamples.every((example) => example.language && example.content.includes("\n")),
      `${topicId} code examples need a language and multi-line source`,
    );
  }
});

test("further-programming code covers the practical syllabus techniques", async () => {
  const sourceByTopic = Object.fromEntries(
    await Promise.all(
      topicIds.map(async (topicId) => {
        const note = await readNote(topicId);
        return [
          topicId,
          note.sections
            .flatMap((section) => section.examples)
            .filter((example) => example.kind === "code")
            .map((example) => example.content)
            .join("\n"),
        ];
      }),
    ),
  );

  assert.match(sourceByTopic["19.1"], /def binary_search/);
  assert.match(sourceByTopic["19.1"], /class Stack/);
  assert.match(sourceByTopic["19.1"], /class QueueUsingTwoStacks/);
  assert.match(sourceByTopic["19.2"], /def factorial/);
  assert.match(sourceByTopic["20.1"], /class .+\(.+\):/);
  assert.match(sourceByTopic["20.2"], /with open\(/);
  assert.match(sourceByTopic["20.2"], /except (FileNotFoundError|ValueError)/);
});

test("covers every required addressing mode with executable-style notation", async () => {
  const note = await readNote("20.1");
  const addressing = note.sections
    .flatMap((section) => section.examples)
    .find((example) => example.id === "01-addressing-modes")?.content ?? "";

  for (const mode of ["immediate", "direct", "indirect", "indexed", "relative"]) {
    assert.match(addressing, new RegExp(`^.*\\b${mode}\\b`, "im"));
  }
  assert.match(addressing, /^LOAD\s+R\d+,\s*\[PC\s*[+-]\s*\d+\]/m);
});

test("recall prompts are all click-to-reveal question and answer pairs", async () => {
  for (const topicId of topicIds) {
    const note = await readNote(topicId);
    assert.ok(note.quickRecall.length > 0, `${topicId} needs recall prompts`);
    assert.ok(
      note.quickRecall.every(
        (item) => typeof item.question === "string" && typeof item.answer === "string",
      ),
      `${topicId} recall items must all include questions and answers`,
    );
  }
});

test("Python examples compile and core examples behave correctly", async () => {
  const examples = (
    await Promise.all(topicIds.map(async (topicId) => {
      const note = await readNote(topicId);
      return note.sections
        .flatMap((section) => section.examples)
        .filter((example) => example.language === "python")
        .map((example) => ({ label: example.label, content: example.content }));
    }))
  ).flat();

  const verifier = String.raw`
import ast, json, pathlib, tempfile, sys

examples = {item["label"]: item["content"] for item in json.load(sys.stdin)}
for label, source in examples.items():
    compile(source, label, "exec")

def definitions(label):
    tree = ast.parse(examples[label])
    tree.body = [node for node in tree.body if isinstance(node, (ast.FunctionDef, ast.ClassDef))]
    scope = {}
    exec(compile(tree, label, "exec"), scope)
    return scope

algorithms = {}
for label in (
    "Linear search with a not-found result",
    "Iterative binary search",
    "Optimised bubble sort",
    "Insertion sort with shifting",
):
    algorithms.update(definitions(label))
assert algorithms["linear_search"]([8, 3, 5], 5) == 2
assert algorithms["linear_search"]([], 5) == -1
assert algorithms["binary_search"]([2, 4, 9, 12], 9) == 2
assert algorithms["binary_search"]([2, 4, 9, 12], 7) == -1
assert algorithms["bubble_sort"]([3, 1, 2]) == [1, 2, 3]
assert algorithms["insertion_sort"]([3, 1, 2]) == [1, 2, 3]

stack = definitions("Stack ADT")["Stack"]()
stack.push("A"); stack.push("B")
assert stack.peek() == "B" and stack.pop() == "B" and stack.pop() == "A"

queue = definitions("Queue built from two stack ADTs")["QueueUsingTwoStacks"]()
queue.enqueue("A"); queue.enqueue("B")
assert queue.dequeue() == "A" and queue.dequeue() == "B"

recursion = definitions("Factorial with a guarded input domain")
assert recursion["factorial"](0) == 1 and recursion["factorial"](5) == 120
try:
    recursion["factorial"](-1)
    raise AssertionError("negative factorial input was accepted")
except ValueError:
    pass

oop = definitions("Inheritance with an overridden method")
assert oop["EmailNotification"]().send("Ready") == "Email: Ready"
assert oop["TextNotification"]().send("Ready") == "SMS: Ready"

records = definitions("Parse and validate one delimited record")
assert records["parse_student"]("A104,Ari,72\n")["mark"] == 72
try:
    records["parse_student"]("A104,Ari,101\n")
    raise AssertionError("invalid mark was accepted")
except ValueError:
    pass

files = definitions("Specific file and conversion handlers")
with tempfile.TemporaryDirectory() as directory:
    filename = pathlib.Path(directory) / "marks.txt"
    filename.write_text("12\n34\n", encoding="utf-8")
    assert files["load_marks"](filename) == [12, 34]
`;

  const result = spawnSync("python", ["-c", verifier], {
    input: JSON.stringify(examples),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
