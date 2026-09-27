# Transfer, operate, and publish with Claude Code

Use GitHub to transfer the project. Do not send Claude a loose selection of files: that loses Git
history, branches, generated data, and the ability to prove which version was deployed.

The current source and Vercel Production Branch is `rebuild/react-vite`. GitHub `main` is an older,
divergent project line and is not the transfer baseline.

## What transfers automatically

Once committed and pushed, GitHub preserves:

- application code, Business notes, tests and configuration;
- `package-lock.json` and reproducible dependency versions;
- Git history and branches;
- `CLAUDE.md`, this guide, and the operational handoff;
- `vercel.json`, which selects the Next.js framework and `npm run build:vercel`.

Git does not preserve browser study data, account credentials, Vercel dashboard settings, ignored
build/cache directories, uncommitted files, or AI conversation memory. The steps below cover each
category that matters.

## Part 1 — Finish the source-computer handoff

### Step 1: Inspect every checkout

In each project checkout, run:

```powershell
git status --short --branch
git diff
git ls-files --others --exclude-standard
```

Do not delete a checkout, run `git reset --hard`, or assume an untracked file is backed up.

The older `../caie-study-hub` checkout is based on old commit `21a714e`. Its modified
`PdfActions.tsx` change has been reviewed: the newest branch already contains the same
`isUsablePdfUrl(er)` protection inside its newer implementation, so the old edit is obsolete. Do not
port or merge it. Its Codex agent TOML files and examiner plan are not runtime data; preserve them
separately before ever deleting that checkout.

### Step 2: Confirm the newest Business-notes branch

From the handoff checkout:

```powershell
git fetch github --prune
git log -5 --oneline github/rebuild/react-vite
git rev-parse github/rebuild/react-vite
```

At handoff preparation on 2026-09-27, the newest commit was `cbb210a` (`fix: align Business content
with syllabus boundaries`). A later commit is valid and should take precedence after a fresh fetch.

Do not substitute `github/main`: at this checkpoint, `rebuild/react-vite` contains 68 commits absent
from `main`.

### Step 3: Verify the newest project locally

Use Node.js 22.13 or newer and npm 10 or newer. Some scripts require Bash; on Windows, run them from
Git Bash or WSL.

```bash
npm ci
npm run data:validate
npm run lint
npm test
```

All four commands must complete successfully. `npm test` runs both the Vinext build and the native
Vercel/Next build before the Node test suite.

If a command fails, preserve the output and fix or document the failure before transfer. Do not tell
the next agent that the baseline is healthy without a fresh successful run.

### Step 4: Commit and push these handoff files

The handoff work is on `docs/claude-handoff`, based on the newest Business-notes commit. Review it:

```powershell
git status --short
git diff --check
git diff
git add CLAUDE.md README.md docs/HANDOFF.md docs/CLAUDE-TRANSFER-GUIDE.md
git diff --cached
git commit -m "docs: add Claude transfer and operations guide"
git push -u github docs/claude-handoff
```

On GitHub, create a pull request with:

- base: `rebuild/react-vite`;
- compare: `docs/claude-handoff`.

Do not target `main`. Open the Vercel Preview deployment created for the pull request and test the
home page, one Business note, search, one paper preview, and mobile navigation. Merge only after the
local verification and Preview deployment both succeed.

### Step 5: Confirm GitHub contains the complete handoff

After merging:

```powershell
git fetch github --prune
git checkout rebuild/react-vite
git pull --ff-only github rebuild/react-vite
git log -5 --oneline
git status --short --branch
```

Open the GitHub repository in a browser and confirm that `rebuild/react-vite` contains:

- the latest Business-note files;
- `CLAUDE.md`;
- `docs/HANDOFF.md`;
- `docs/CLAUDE-TRANSFER-GUIDE.md`;
- `vercel.json`.

Only then is a fresh clone able to receive the complete project.

## Part 2 — Optionally preserve personal browser data

The application stores progress, bookmarks, highlights, recent topics, syllabus checks and theme in
the browser key `caie-study-hub:study-state:v1`. This data is not application source and is not sent
to GitHub.

To make a personal backup, open the production site's browser console and run:

```js
copy(localStorage.getItem("caie-study-hub:study-state:v1"));
```

Save the copied JSON privately. To restore it on the same trusted site origin:

```js
const value = prompt("Paste the CAIE Study Hub backup JSON");
JSON.parse(value);
localStorage.setItem("caie-study-hub:study-state:v1", value);
location.reload();
```

`JSON.parse` validates the pasted value before it overwrites the current state. Treat this export as
personal data because it records study activity.

## Part 3 — Transfer to Claude Code

### Same computer

Install and authenticate Claude Code, open a terminal in the updated repository, and continue with
“Start Claude Code” below. You do not need to copy the repository.

### New computer

Install Git, Node.js 22.13 or newer, npm 10 or newer, and Claude Code using
[Anthropic's official setup instructions](https://docs.anthropic.com/en/docs/claude-code/getting-started).
On Windows, prefer Git Bash or WSL because this repository has Bash-based scripts.

Clone the production branch and normalize the remote name used by the project instructions:

```powershell
git clone --branch rebuild/react-vite https://github.com/Alekk301/A-level-study-hub.git
cd A-level-study-hub
git remote rename origin github
git remote -v
git status --short --branch
node --version
npm --version
```

Then, from Git Bash or WSL:

```bash
npm ci
npm run data:validate
npm run lint
npm test
```

Do not copy `node_modules`, `dist`, `.next`, `.vercel`, `.wrangler`, or `.sites-runtime` from the old
computer. They are machine-specific or reproducible.

### Start Claude Code

Run Claude Code from the repository root:

```bash
claude
```

Use this first prompt:

> Read `CLAUDE.md`, `README.md`, `docs/HANDOFF.md`, and
> `docs/CLAUDE-TRANSFER-GUIDE.md`. Fetch GitHub and inspect Git status without modifying files.
> Confirm that `rebuild/react-vite` is the source and Vercel Production Branch, identify the newest
> commit, summarize the verification commands and known local-only risk, and explain the release
> process. Do not edit, commit, push, merge, or deploy yet.

Claude should report:

- a clean checkout of `rebuild/react-vite` containing the latest Business work;
- `npm run data:validate`, `npm run lint`, and `npm test` as the verification gate;
- Vercel project `a-level-study-hub`, team `Alevel`, and the production URL;
- browser study data and credentials are outside Git;
- the old `PdfActions.tsx` modification was reviewed and is obsolete because the protection already
  exists in the newest branch.

Do not run Claude's `/init` over the committed `CLAUDE.md`.

## Part 4 — Work safely in Claude Code

Before each change:

```powershell
git fetch github
git checkout rebuild/react-vite
git pull --ff-only github rebuild/react-vite
git checkout -b feature/describe-change
```

Use a scoped prompt:

> Implement only this change: [describe the result]. Inspect the relevant code and callers first.
> Preserve unrelated work and do not add dependencies unless necessary. Run the smallest relevant
> check, then `npm run data:validate`, `npm run lint`, and `npm test`. Show me the diff and remaining
> risks. Do not commit, push, merge, or deploy until I approve.

For note, subject, or paper-data changes, regenerate and review generated data:

```bash
npm run data:build
git diff -- src/data/notes/registry.ts src/data/generated/search-index.json src/data/subjects.ts
npm run data:validate
npm run lint
npm test
```

Before committing:

```powershell
git status --short
git diff --check
git diff
git add -p
git commit -m "Describe the change"
$branch = git branch --show-current
git push -u github $branch
```

Open a pull request into `rebuild/react-vite`, inspect the Vercel Preview URL, then merge after
review. If work remains unfinished, ask Claude to update `docs/HANDOFF.md` before ending the session.

## Part 5 — Publish with Vercel

The repository already contains:

- `vercel.json` with framework `nextjs`;
- build command `npm run build:vercel`;
- production branch `rebuild/react-vite` documented in `README.md`;
- production URL <https://a-level-study-hub.vercel.app/>.

In Vercel, sign in to team `Alevel`, open project `a-level-study-hub`, and confirm its Git connection
still points to `Alekk301/A-level-study-hub` with Production Branch `rebuild/react-vite`.

Normal release flow:

1. Push a feature branch and test its Vercel Preview deployment.
2. Merge the reviewed pull request into `rebuild/react-vite`.
3. Wait for Vercel's Production deployment to finish.
4. Compare the deployment's Git commit with the merged GitHub commit.
5. Open <https://a-level-study-hub.vercel.app/> in a private browser window.
6. Test the home page, Business notes, search, a paper preview, and mobile navigation.
7. If another agent will continue, record the deployed commit and result in `docs/HANDOFF.md`.

Claude Code can trigger the normal deployment by pushing a branch and merging an approved pull
request. It does not need a Vercel token when the existing Git integration is working. Dashboard
changes, manual promotions and rollbacks still require the Vercel account.

## Part 6 — Optional OpenAI Sites copy

The Vercel deployment is independent of the repository's Sites/Cloudflare-compatible build. If you
still maintain the OpenAI Sites copy, verify `npm run build`, then ask Codex to publish the exact
verified commit using the owning OpenAI account and existing `.openai/hosting.json` project. Do not
create a new Sites project unintentionally.

## Recovery procedure

If files or work appear missing:

1. Stop editing.
2. Run `git status`, `git branch --all`, `git log --all --oneline --decorate`, and `git stash list`.
3. Check GitHub branches and pull requests, especially `rebuild/react-vite`.
4. Inspect the old checkout for modified and untracked files.
5. Never force-push, hard-reset, or redeploy an older commit merely to match an old AI conversation.
6. Recreate dependencies with `npm ci`; never recover by copying `node_modules`.
7. In Vercel, compare the Production deployment's commit with GitHub before rolling back or
   redeploying.

## Final transfer checklist

- [ ] Every old checkout has been inspected for modified and untracked files.
- [x] The old `PdfActions.tsx` change was reviewed and declared obsolete because its guard already
      exists in the newest implementation.
- [ ] `docs/claude-handoff` was merged into `rebuild/react-vite`, not `main`.
- [ ] GitHub `rebuild/react-vite` contains the newest Business notes and all three handoff files.
- [ ] A fresh clone installs with `npm ci`.
- [ ] Data validation, lint, both production builds, and all tests pass.
- [ ] Claude Code reads `CLAUDE.md` and identifies the correct production branch.
- [ ] GitHub authentication works without a token stored in the repository.
- [ ] Vercel Preview works for a feature branch.
- [ ] Vercel Production deploys the expected merged commit to the expected URL.
- [ ] Optional browser study data is privately backed up if it matters to you.
- [ ] Optional OpenAI Sites publishing access remains available if that copy is still maintained.
