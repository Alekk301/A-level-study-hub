# Impact and feedback

This file separates verified evidence from future measurements. It should be updated with dates and
sources rather than estimates.

## Verified baseline

As of September 2026:

- at least 10 classmates have opened the website;
- the original intended audience was the project owner and their class;
- the paper browser and note relevance were manually checked during development;
- one classmate supplied a specific feature request.

This is a small pilot, not evidence of large-scale adoption.

## Feedback-to-feature example

Classmate feedback:

> “You should add the highlight function that can be stored until the next return, that would be great”

Response:

- persistent text highlighting was added in commit `d97b562`;
- highlights are grouped by topic and stored in versioned browser state;
- saved text is restored on the next visit on the same device;
- a student can review, jump to or remove saved highlights;
- the implementation stores offsets plus nearby context so it can recover from some note edits;
- tests cover stored-highlight parsing and update behaviour.

This example is more useful than a general claim that users “liked the site” because it connects a
real request to a traceable product and engineering change.

## Analytics policy

Google Analytics is optional and loads only after visitor consent. Analytics should be used for
aggregate product questions such as:

- Which subjects and routes are used?
- Do visitors return?
- Is the paper browser reached?
- Are visits concentrated near examination periods?

No analytics total is recorded here yet because a dated export has not been reviewed in this
repository. The “at least 10” figure remains the honest minimum.

When an export is available, record:

| Measurement | Value | Date range | Evidence |
| --- | ---: | --- | --- |
| Active users | Pending | Pending | Analytics screenshot/export |
| Returning users | Pending | Pending | Analytics screenshot/export |
| Most-used routes | Pending | Pending | Analytics screenshot/export |

Do not commit an export containing identifiers or unnecessary device/location detail.

## Next evidence to collect

1. Ask three classmates to complete the same tasks: find a note, save a highlight, and open a paper.
2. Record completion, confusion and one direct quote with permission.
3. Run a short before/after revision-time comparison.
4. File each actionable problem as a GitHub issue.
5. Link the eventual fix or decision back to that issue.
