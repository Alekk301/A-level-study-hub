# Project handoff

Update this file before moving work between Codex, Claude Code, computers, or maintainers.

## Authoritative state

- Repository: <https://github.com/Alekk301/A-level-study-hub>
- Newest development and Vercel Production Branch: `rebuild/react-vite`
- Latest verified source: `68ddeb2` (`docs: add Claude transfer and operations guide (#19)`),
  fetched on 2026-09-27
- Vercel team: `Alevel`
- Vercel project: `a-level-study-hub`
- Production URL: <https://a-level-study-hub.vercel.app/>
- Vercel build: `npm run build:vercel`, configured in `vercel.json`
- Transfer procedure: [CLAUDE-TRANSFER-GUIDE.md](CLAUDE-TRANSFER-GUIDE.md)

GitHub remains authoritative for source history, but always fetch before trusting the commit above.
The commit is a checkpoint, not a permanently current version.

## Current project state

- The Business 9609 update (`cbb210a`) and the Claude handoff documentation (PR #19, formerly
  `docs/claude-handoff`) are both merged into `github/rebuild/react-vite` at `68ddeb2`.
- That branch contains 69 commits not present on `github/main`; `main` is not the newest project
  line and must not be used as the transfer baseline.
- The project has been transferred to Claude Code on a fresh clone of `rebuild/react-vite`, with
  the remote named `github` as the project instructions expect.
- The application requires Node.js 22.13 or newer and npm 10 or newer.
- `package-lock.json` is the dependency source of truth; use `npm ci`.
- Required local verification is `npm run data:validate`, `npm run lint`, and `npm test`.
- Vercel deploys `rebuild/react-vite` to Production and uses `npm run build:vercel`.
- The repository also supports a Sites/Cloudflare-compatible Vinext build through `npm run build`.
- No project `.env` values are referenced by the application source at this checkpoint.
- There is no account database. Student state is stored in each browser's `localStorage`.

## Computer Science 9618 AS notes rebuild (in progress on `dev`)

- Goal: bring every AS topic up to the depth of the A2 notes, using `9618/1.1.json` as the
  template (7+ sections, worked examples, formulas, comparison table, diagram, three analysis
  chains, exam tips, common mistakes, question-and-answer recall). Set the topic's
  `contentDepth` to `"full"` in `subjects.json` when its note is rebuilt.
- Done: 1.1 Data Representation, 1.2 Multimedia, 1.3 Compression, 2.1 Networks, 3.1 Computers,
  3.2 Logic Gates, 4.1 CPU Architecture
  (all 2026-09-28).
- Remaining short notes to rebuild: 8.3, 9.2, 10.4.
- Remaining topics with no note file yet: 4.2, 4.3, 5.1, 5.2, 6.1, 6.2, 7.1, 8.1, 8.2,
  9.1, 10.1, 10.2, 10.3, 11.1, 11.2, 11.3, 12.1, 12.2, 12.3.
- `tests/content-data.test.mjs` hard-codes the detailed-note count; update it with each new file.
- Once all AS notes exist, add a strict 9618 AS block to `scripts/validate-data.mjs` like the
  Business one.
- The Python-example test in `tests/computer-science-notes.test.mjs` needs `python` on PATH; it
  fails with exit code 9009 on computers without Python (installed on the laptop 2026-09-28).

## Latest verification

On 2026-09-27, Claude Code verified a fresh clone of `68ddeb2` on Windows with Node.js 24.19.0 and
npm 11.17.0, after `npm ci`, running the scripts from Git Bash:

- data validation passed: 4 subjects, 153 topics, 104 detailed notes and 919 paper records;
- ESLint completed without errors;
- the Vinext and native Vercel/Next production builds passed;
- all 65 Node tests passed.

npm 11 did not run the install scripts of `esbuild`, `workerd`, `sharp` and `unrs-resolver`
because they are not yet covered by `allowScripts`. The checks above passed without them.

## Verification during handoff preparation

On 2026-09-27 against `cbb210a` plus the documentation changes:

- data validation passed: 4 subjects, 153 topics, 104 detailed notes and 919 paper records;
- ESLint completed without errors;
- the Vinext production build passed;
- the native Vercel/Next production build passed, including TypeScript and static generation;
- all 65 Node tests passed.

The clean verification ran from an isolated archive of `cbb210a` with dependencies installed from
the imported lockfile, because this worktree's `node_modules` junction belongs to the older sibling
checkout. The Vercel Preview deployment remains the required confirmation for the documentation PR.

## Reviewed local-only work

The older sibling checkout `../caie-study-hub` is based on old commit `21a714e`. Its uncommitted
`PdfActions.tsx` change hides unusable examiner-report URLs with `isUsablePdfUrl(er)`. The newest
branch already contains that same guard inside the newer `PdfResource` implementation, so the old
edit is obsolete and must not be ported.

The old checkout also retains two Codex agent TOML files and one Computer Science examiner plan
under `.codex/` and `docs/superpowers/`. They are not application runtime data and are intentionally
left untouched in the old checkout; archive them separately before that checkout is ever removed.

## Data outside Git

| Data | Location | Transfer method |
| --- | --- | --- |
| Code, notes, tests, configuration and history | GitHub | Push the handoff branch, merge it into `rebuild/react-vite`, then clone |
| Study progress, bookmarks and highlights | Browser `localStorage` | Optional private export in the transfer guide |
| GitHub authentication | User credential store | Sign in again; never commit tokens |
| Vercel settings, domains and deployment history | Vercel account | Sign in to team `Alevel`; verify project `a-level-study-hub` |
| OpenAI Sites publishing access | Owner's Codex/OpenAI account | Required only if maintaining the separate Sites copy |
| AI conversations | Codex or Claude account | Summarize durable facts here; chats are not runtime dependencies |
| Dependencies and build caches | Ignored local directories | Recreate with `npm ci` and build commands |

## Before the next handoff

- Fetch GitHub and record the newest `rebuild/react-vite` commit.
- Record the active branch and all unfinished work.
- Commit and push every file that must survive.
- List intentional local-only files without exposing secret values.
- Record the results of validation, lint, tests, and the Vercel Preview deployment.
- After release, record the Vercel Production commit and verify the public URL.
- Remove resolved warnings so future agents are not sent toward stale work.
