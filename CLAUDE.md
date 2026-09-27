# Claude Code project instructions

This repository is the source of truth for the CAIE Study Hub. The newest project line and Vercel
Production Branch are `rebuild/react-vite`, not `main`. Read `README.md` and `docs/HANDOFF.md`
before changing anything.

## Start every session safely

1. Run `git status --short --branch`. Preserve all existing work.
2. Run `git fetch github` when network access is available.
3. Compare the current branch with `github/rebuild/react-vite`; never reset or overwrite work to
   make them match.
4. Use Node.js 22.13 or newer and npm 10 or newer. Install locked dependencies with `npm ci`.
5. Establish a clean baseline by running `npm run data:validate`, `npm run lint`, and `npm test`.

## Working across computers

The owner edits this project from more than one computer using the cycle in
`docs/WORK-CYCLE.md`: day-to-day work happens on the shared `dev` branch, not
`rebuild/react-vite`. At the start of a session run `.\work start`; when the owner is done, offer to
run `.\work finish "<summary>"`. Only run `.\work publish` when the owner asks to go live.

## Normal workflow

- Work on `dev` after `.\work start` (see "Working across computers" above).
- Keep changes focused and reuse existing components, scripts, and patterns.
- For content changes, run `npm run data:build` and review the regenerated registry and search index.
- Before committing or publishing, run `npm run data:validate`, `npm run lint`, and `npm test`.
- `.\work finish` pushes `dev` and creates a Vercel Preview; inspect it, and merge into
  `rebuild/react-vite` with `.\work publish` only after review and when the owner asks.
- Never force-push the Production Branch.
- Update `docs/HANDOFF.md` whenever unfinished work, verification results, branch state, or
  deployment details change.

## Project boundaries

- Subject metadata lives in `src/data/subjects.json` and its generated TypeScript representation.
- Notes live in `src/data/notes/<subject-code>/`; paper metadata lives in
  `src/data/papers/papers.json`.
- `src/data/notes/registry.ts` and `src/data/generated/search-index.json` are generated. Rebuild them
  instead of editing them by hand.
- Past-paper PDFs are external and must not be committed.
- The PDF endpoint must remain restricted to approved HTTPS hosts.
- Study progress, bookmarks, highlights, and syllabus checks live only in browser `localStorage`.
- Never commit `.env*`, credentials, tokens, `.vercel/`, `.wrangler/`, `.sites-runtime/`, build
  output, or dependencies.

## Commands

```bash
npm ci                  # install the locked dependency tree
npm run dev             # local development server
npm run data:build      # regenerate note registry and search index
npm run data:validate   # validate subjects, notes, search data and papers
npm run lint            # lint the project
npm test                # Vinext build, Vercel/Next build and Node tests
npm run build:vercel    # Vercel's native Next.js production build
npm run build           # Sites/Cloudflare-compatible Vinext build
```

Some repository scripts require Bash. On Windows, use Claude Code through Git Bash or WSL if the
current shell cannot run them.

## Publishing

Vercel project `a-level-study-hub` under team `Alevel` is connected to GitHub. Its Production Branch
is `rebuild/react-vite`, and its production URL is <https://a-level-study-hub.vercel.app/>. Feature
branch pushes create Preview deployments; pushes or merges to the Production Branch create
Production deployments. Verify the deployed commit and URL in Vercel after every release.

The repository also retains an OpenAI Sites/Cloudflare-compatible build. Publishing that separate
copy requires Codex and the owning OpenAI account; it is not required for the Vercel deployment.
Follow `docs/CLAUDE-TRANSFER-GUIDE.md` for the complete transfer and release procedure.
