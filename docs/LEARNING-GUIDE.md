# Learn how the website works

The goal is not to memorise every file. It is to trace one user action through the layers until you
can predict what will happen before running the code.

Use this guide in order. After each stage, explain the flow aloud without reading the answer.

## Stage 1: Build the mental model

Learn these five layers:

1. **Route** — a URL file in `app/` decides which screen is requested.
2. **View** — a file in `src/views/` coordinates the screen.
3. **Component** — files in `src/components/` render reusable pieces.
4. **Data** — JSON and generated indexes under `src/data/` supply content.
5. **State** — `src/hooks/use-study.tsx` remembers a student's actions.

Exercise: open `app/page.tsx`, follow its import to `HomePage`, and identify the components and data
used there.

You understand this stage when you can answer: “Why is `app/` different from `src/views/`?”

## Stage 2: Trace one topic page

Start with:

```text
app/subject/[subject]/notes/[topic]/page.tsx
src/views/TopicPage.tsx
src/data/subjects.ts
src/data/notes/registry.ts
src/data/notes/9618/13.2.json
```

Follow the values `subject = 9618` and `topic = 13.2`. Find where invalid values become a not-found
page, where the JSON is imported, and which component renders each note section.

Exercise: change one sentence in a local note, run the app, and find exactly where it changes on
screen. Revert your practice change afterwards.

You understand this stage when you can explain why a missing detailed file still produces a quick
guide.

## Stage 3: Trace saved highlights

Read:

```text
src/components/notes/PersistentHighlighter.tsx
src/hooks/use-study.tsx
src/views/TopicPage.tsx
```

Trace this sequence:

```text
select text → create offsets/context → addHighlight → React state → localStorage
     return later → parse saved state → rebuild Range → CSS highlight
```

Use browser developer tools, open **Application → Local Storage**, and watch
`caie-study-hub:study-state:v1` change when you save or remove a highlight.

You understand this stage when you can explain why both offsets and surrounding text are stored.

## Stage 4: Trace a paper preview

Read:

```text
src/views/PapersPage.tsx
src/components/papers/PaperCard.tsx
src/components/papers/PdfActions.tsx
src/utils/pdf.ts
worker/index.ts
tests/pdf-proxy.test.mjs
```

Follow one question-paper URL from `papers.json` to the preview button and worker request. Find each
validation check that stops an arbitrary website from using the proxy.

You understand this stage when you can explain why an allowlist matters and why PDFs are not
committed to GitHub.

## Stage 5: Learn the content pipeline

Read:

```text
scripts/rebuild-content-index.mjs
scripts/validate-data.mjs
src/data/notes/registry.ts
src/data/generated/search-index.json
```

Run:

```bash
npm run data:build
npm run data:validate
```

The first command creates derived files; the second checks whether source and derived data agree.

You understand this stage when you can explain why generated files should not be edited by hand.

## Stage 6: Learn testing and delivery

Read one test at a time in `tests/`, beginning with `study-logic.test.mjs`, then
`pdf-proxy.test.mjs`. For each assertion, identify the failure it is designed to catch.

Run:

```bash
npm run check
```

Then read `.github/workflows/ci.yml` and compare its steps with your local command.

You understand this stage when you can describe what is checked before a change reaches `main`.

## Stage 7: Make one change without AI

Choose a small task:

- improve an error message;
- add a test for an invalid stored highlight;
- add one original quick-recall item and regenerate the index;
- improve the keyboard label of an existing control.

Before editing, write your prediction of the files and tests involved. Make the change, run the
checks, and write what surprised you. This is how the project becomes knowledge you genuinely own.

## Questions you should answer before recording

- What happens from entering a topic URL to seeing its note?
- Which data is source data and which data is generated?
- How does a highlight survive a return visit?
- What information is stored locally, and what leaves the browser?
- Why is the PDF proxy restricted?
- What does the CI workflow protect?
- What did you personally decide, test and learn?
- Where did AI assist, and how did you verify its output?

If any answer feels memorised, reopen the relevant files and trace the flow again.
