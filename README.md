# CAIE A Level Study Hub

A personal revision hub for four Cambridge International A Level subjects, built to stop switching between ten tabs during revision.

**Subjects covered:** Mathematics (9709) · Computer Science (9618) · Business (9609) · Chemistry (9701)

## What's in it

- Full syllabus-aligned topic tree for all four subjects (units → topics, matching the current Cambridge specifications)
- Original revision notes: some topics are **in depth** (formulas, worked reasoning, exam tips), the rest are **quick reference** (orientation + focus points) — labelled on the page so you know what you're looking at
- A resources panel per subject linking out to the official syllabus PDF, PapaCambridge (past papers + mark schemes), Save My Exams, ZNotes and RocketRevise

## Running it

No build step, no server, no dependencies. Clone the repo and open `index.html` in a browser.

```
git clone <your-repo-url>
cd caie-study-hub
open index.html   # or just double-click it
```

## Structure

```
caie-study-hub/
├── index.html        # markup + subject nav
├── css/
│   └── style.css      # all styling
├── data/
│   └── data.js         # syllabus structure + in-depth notes content
├── js/
│   └── app.js           # rendering / navigation logic
└── CREDITS.md
```

`data/data.js` is the file to edit if you want to add or rewrite notes — each subject is a list of units, each unit a list of topics (`id`, `title`, `level`, `points`, optional `blurb`). Topics with an entry in the `DEEP` object at the bottom of the file get the full in-depth view instead of the quick-reference one.

## Extending it

To turn a "quick reference" topic into "in depth": write the fuller notes as an HTML string and add it to the `DEEP` object in `data/data.js`, keyed as `"subjectKey:topicId"` (e.g. `"math:1.3"`). No other file needs to change.

## Notes on sourcing

See [CREDITS.md](./CREDITS.md). Short version: syllabus topic structure follows the public Cambridge International specifications; all note text here is original writing, not copied from any third-party revision site; past papers and mark schemes are linked to their official/legitimate hosts rather than stored in this repo.
