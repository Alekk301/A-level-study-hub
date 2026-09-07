# Decision log

This is a concise record of important choices and their trade-offs. Dates are supported by the Git
history unless marked as a future decision.

## 2026-08-30 — Rebuild the original static site

**Decision:** move from a one-screen vanilla JavaScript site to React, TypeScript and refresh-safe
routes.

**Reason:** the project needed reusable note components, clearer navigation and room to grow.

**Trade-off:** the toolchain and architecture became more complex.

## 2026-08-30 — Keep paper PDFs outside Git

**Decision:** store normalised metadata and connect question papers to mark schemes instead of
committing the PDF library.

**Reason:** a searchable catalogue is useful without turning the repository into a large copy of
third-party documents.

**Trade-off:** previews depend on an external host.

## 2026-08-31 — Model notes as structured data

**Decision:** represent definitions, sections, examples, diagrams, tips and recall prompts as JSON
fields rather than HTML strings.

**Reason:** data can be validated, searched and rendered consistently.

**Trade-off:** authors must follow a stricter schema.

## 2026-08-31 — Prioritise complete A2 notes

**Decision:** build complete A2 coverage before expanding every AS topic.

**Reason:** a coherent exam-stage slice was more useful than shallow uniform coverage.

**Trade-off:** content depth is still uneven across the wider catalogue.

## 2026-09-01 — Organise topics around course structure

**Decision:** group material by coursebook chapter and separate Mathematics by paper.

**Reason:** students already understand that mental model, so navigation requires less learning.

**Trade-off:** source syllabuses and books can change, so metadata needs maintenance.

## 2026-09-05 — Add persistent highlighting from feedback

**Decision:** let students save selected note text and recover it on the next visit.

**Reason:** a classmate explicitly requested it.

**Trade-off:** robust text anchoring is harder than storing a bookmark, especially after note edits.

## 2026-09-07 — Make analytics opt-in

**Decision:** keep aggregate usage measurement, but do not load Google Analytics before explicit
visitor acceptance.

**Reason:** user measurement is valuable, but study-state privacy and international visitors require
a cautious default.

**Trade-off:** declined or unanswered consent means analytics undercounts usage.

## 2026-09-07 — Present AI assistance openly

**Decision:** disclose the tools and estimated 60–70% AI-generated or AI-assisted share.

**Reason:** honest authorship is more credible than implying independent implementation.

**Trade-off:** the project must be defended through understanding, verification and continued
independent learning rather than code volume alone.
