# Task 1 report

Status: complete

Commits: `feat: map Business notes to 36 coursebook chapters`

Files changed:
- `src/data/subjects.ts`
- `tests/study-logic.test.mjs`

## RED

Command:

```text
node --test --test-concurrency=1 tests/study-logic.test.mjs
```

Output summary: 5 tests, 4 passed, 1 failed. The chapter-grouping test failed with `5 !== 19`, confirming Business still returned five broad groups.

## GREEN

Command:

```text
node --test --test-concurrency=1 tests/study-logic.test.mjs
```

Output summary: 5 tests, 5 passed, 0 failed.

## Self-review

- Confirmed the diff is limited to the requested mapping, placement conditional, and chapter assertions.
- `git diff --check` reported no whitespace errors.
- No concerns found.
