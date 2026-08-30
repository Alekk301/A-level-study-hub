# CAIE Study Hub

A calm, responsive CAIE A-Level revision platform for a small group of classmates. It combines a practical study dashboard with long-form, textbook-style notes, local progress tracking, global search and a downloader-ready past-paper browser.

Supported subjects:

- Mathematics 9709
- Computer Science 9618
- Business 9609
- Chemistry 9701

Computer Science 9618 A2 and Business 9609 A2 are the fully developed priority areas. Every one of their 15 A2 topics has structured full notes. The wider syllabus catalogue is preserved for all four subjects, with a mix of additional in-depth and quick-reference topics.

## What works

- Dashboard with continue studying, subject progress, recent topics and bookmarks
- Persistent desktop sidebar and purpose-built mobile navigation
- AS/A2 note filtering
- Editorial note reader with a sticky/collapsible table of contents
- Definitions, syllabus checklists, sections, examples, pseudocode, formulas, comparisons, diagrams, exam tips, common mistakes and quick recall
- Previous/next and related-topic navigation
- Global full-text search with `/` and `Ctrl/Cmd + K`
- Bookmarks, studied topics, recent topics, last location and theme stored in `localStorage`
- Dark mode designed for long reading sessions
- Past-paper filtering with 919 live QP/MS pairs generated from the local downloader library
- Defensive error and empty states
- Lazy topic loading and a search index that loads only when search is opened
- Data validation and automated tests

## Requirements

- Node.js 22.13 or newer
- npm 10 or newer

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
```

The primary build uses Vite through Vinext and produces a Cloudflare-compatible app in `dist/`.

## Preview the production build

```bash
npm run preview
```

If `npm run preview` is unavailable in your environment, use:

```bash
npm run start
```

## Validation and tests

```bash
npm run lint
npm run data:validate
npm test
```

`npm test` runs a fresh production build before the Node test suite.

## Architecture

This is a React 19 + Vite application using Vinext's Next-compatible file routing. The app keeps v1 deliberately backend-free: content is structured JSON, topic files are loaded on demand, and personal study state stays in the browser.

| Layer | Responsibility |
| --- | --- |
| `app/` | Production routes and document metadata |
| `src/views/` | Route-level screens such as Home, Notes, Papers and Topic |
| `src/components/` | Reusable layout, note, paper, search and common UI |
| `src/data/subjects.json` | Subject, unit and topic catalogue |
| `src/data/notes/<code>/` | One structured JSON file per detailed topic |
| `src/data/papers/papers.json` | Normalized paper/component metadata |
| `src/data/generated/` | Generated lazy-search index |
| `src/hooks/use-study.tsx` | Local bookmarks, progress, recents and theme state |
| `scripts/` | Content index generation and data validation |
| `tests/` | Route, content, search, paper and component checks |

The directory is named `src/views/`, not `src/pages/`, because Next-compatible tooling reserves `pages` for framework routes.

## Routes

```text
/
/notes
/papers
/bookmarks
/subject/9618
/subject/9618/notes
/subject/9618/notes/13.2
/subject/9618/papers
```

Dynamic subject and topic URLs are handled by production routing, so refreshing a topic page works.

## Subject metadata

Subject names, codes, accent colours, aliases, syllabus years, units, topic summaries and external resources live in:

```text
src/data/subjects.json
```

Each topic contains:

```json
{
  "id": "13.2",
  "title": "File organisation and access",
  "level": "A2",
  "levels": ["A2"],
  "summary": "...",
  "focusPoints": ["..."],
  "contentDepth": "full"
}
```

`levels` controls AS/A2 filters. `contentDepth` must be `full`, `in-depth` or `quick`.

## Notes data

Detailed topic notes live in one JSON file per topic:

```text
src/data/notes/9618/13.2.json
src/data/notes/9609/10.3.json
```

The schema is intentionally presentation-independent. Do not add HTML strings.

```json
{
  "id": "13.2",
  "subject": "9618",
  "level": "A2",
  "unitId": "A2",
  "unitTitle": "A2 Level",
  "title": "File organisation and access",
  "contentDepth": "full",
  "overview": "...",
  "syllabusPoints": ["..."],
  "definitions": [{ "term": "Hash function", "definition": "..." }],
  "sections": [
    {
      "id": "05-hashing",
      "title": "Hashing",
      "content": ["..."],
      "bullets": [],
      "examples": [
        {
          "id": "05-example-1",
          "kind": "worked",
          "label": "Worked example",
          "content": "address <- Key MOD 1000"
        }
      ]
    }
  ],
  "formulas": [],
  "comparisonTable": null,
  "diagram": null,
  "analysisChains": [],
  "examTips": ["..."],
  "commonMistakes": ["..."],
  "quickRecall": ["..."],
  "relatedTopics": ["13.1", "19.1"]
}
```

Supported example kinds are `example`, `worked`, `pseudocode`, `formula` and `analysis`.

## Add a new topic

1. Add the topic metadata under the correct unit in `src/data/subjects.json`.
2. If the topic needs detailed notes, add `src/data/notes/<subject-code>/<topic-id>.json` using the schema above.
3. Set the metadata `contentDepth` to match the note file.
4. Rebuild the note registry and search index:

   ```bash
   npm run data:build
   ```

5. Validate everything:

   ```bash
   npm run data:validate
   npm run lint
   npm run build
   ```

If no detailed file exists, the app creates a safe quick-guide page from the topic summary and focus points.

## Edit an existing topic

Edit the relevant JSON file under `src/data/notes/<code>/`, then run:

```bash
npm run data:build
npm run data:validate
```

The first command updates `src/data/notes/registry.ts` and `src/data/generated/search-index.json`. Do not hand-edit those generated files.

## Add another subject

1. Add a complete subject object to `src/data/subjects.json`.
2. Add its topic units and metadata.
3. Add a subject icon mapping in `src/components/common/SubjectIcon.tsx`.
4. Add optional detailed note files under `src/data/notes/<new-code>/`.
5. Add paper records under `src/data/papers/papers.json`.
6. Run `npm run data:build`, `npm run data:validate` and `npm run build`.

## Past-paper metadata

The browser reads:

```text
src/data/papers/papers.json
```

The included catalogue contains 919 complete QP/MS pairs generated from the PDFs in the sibling downloader library. The PDFs are not copied into this repository; each button opens the matching XtraPapers URL in a new tab.

Accepted record shape:

```json
{
  "subject": "9618",
  "year": 2025,
  "session": "May-June",
  "paper": "42",
  "qp": "https://cdn.example.edu/9618_s25_qp_42.pdf",
  "ms": "https://cdn.example.edu/9618_s25_ms_42.pdf",
  "er": null,
  "source": "downloader"
}
```

The runtime also accepts `component` instead of `paper`, which makes it easier to connect an existing downloader.

Valid session values are:

- `February-March`
- `May-June`
- `October-November`

PDF links must use HTTPS and end in `.pdf`. Invalid or missing links are shown as unavailable instead of being opened.

## Refresh from the downloader library

After downloading newer papers in the sibling `CAIE_Library_Downloader_v3_XtraPapers` project, run:

```bash
npm run papers:import
npm run data:validate
npm run build
```

The importer scans the PDFs actually present, pairs QP/MS files by subject + year + session + component, and rewrites `src/data/papers/papers.json`. It includes only complete pairs and uses the downloader manifest's XtraPapers URL where available.

## Local progress and bookmarks

The app stores one versioned object under:

```text
caie-study-hub:study-state:v1
```

It contains:

- bookmarked topic keys
- completed topic keys
- recent topics and timestamps
- last opened topic
- light/dark/system theme preference

There is no login. Clearing site data removes this device's progress. The state shape is isolated in `src/hooks/use-study.tsx` so it can later be replaced or supplemented with Supabase sync without rewriting the note UI.

## Deployment

### Vercel

The Vercel-compatible Next build has been verified.

1. Push this folder to GitHub, GitLab or Bitbucket.
2. Import the repository in Vercel.
3. Select the Next.js framework preset.
4. Override the Build Command with:

   ```bash
   npx next build
   ```

5. Keep the install command as `npm install` and deploy.

Vercel serves the dynamic subject/topic routes, so refreshed note URLs continue to work.

### Cloudflare Workers & Pages

This is a server-rendered app, not a plain static Pages folder. The Vite/Vinext build produces a Cloudflare Worker plus static assets.

```bash
npm install
npm run build
cd dist/server
npx wrangler deploy --config wrangler.json
```

In Cloudflare's dashboard this deployment appears under Workers & Pages. The generated configuration serves static assets from `dist/client` and routes requests through `dist/server/index.js`. Do not upload only `dist/client`; it has no standalone `index.html` and would break refreshed dynamic routes.

## Known limitations and technical debt

- The PDF catalogue currently covers archive years through 2025; rerun the importer after downloading newer sessions.
- Progress is device-local and is not synced between classmates.
- Computer Science and Business A2 are complete; many Mathematics, Chemistry and AS topics remain quick guides rather than full notes.
- Search is client-side. Its index is loaded lazily, but a much larger future content library may justify a server or worker search endpoint.
- There is no inline mobile PDF viewer by design; reliable new-tab/download behaviour is preferred.
- Cloudflare/Vinext build tooling remains intentionally separate from the small runtime component set; remove it only if the project moves to a different host/runtime.

## Content and copyright

See [CREDITS.md](./CREDITS.md). Notes are original summaries and examples. Commercial revision-site text is not reproduced. Cambridge, Save My Exams, ZNotes and Rocket Revise links are optional references, not the primary learning experience.
