# Working from more than one computer

Both computers share one working branch, `dev`. Pushing `dev` only creates a Vercel Preview;
the live site changes only when you run `.\work publish`, which merges `dev` into the
Production Branch `rebuild/react-vite`.

## The cycle

Run these from the project folder (in PowerShell, keep the `.\`; in Command Prompt, drop it).

| When | Command | What it does |
| --- | --- | --- |
| Before you edit anything | `.\work start` | Downloads the newest changes and switches to `dev`. Refuses to run if this computer has unsaved work. |
| When you stop working | `.\work finish "what you changed"` | Commits everything, pulls anything new, and uploads to GitHub. |
| When `dev` is ready to go live | `.\work publish` | Runs `data:validate`, `lint` and `test`, then merges `dev` into `rebuild/react-vite` and pushes. |
| Any time | `.\work` | Shows what's changed locally and whether GitHub has anything newer. |

## Rules that prevent conflicts

1. Always `start` before editing and `finish` before walking away, even for a tiny change.
2. Never leave work unfinished on one computer and start on the other. If you forgot, go back
   and `finish` there first.
3. If a command says "Stopped", read the message: nothing has been overwritten. For conflicts,
   fix the listed files (or ask Claude Code to), then follow the printed steps.

## First time on another computer

The scripts arrive with the `dev` branch. On a computer that already has the project:

```
git fetch
git switch dev
.\work start
```

On a new computer, `git clone https://github.com/Alekk301/A-level-study-hub.git`, then the
same three commands inside the new folder.
