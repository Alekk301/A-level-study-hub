# Contributing

Thank you for helping improve a free study resource. Small, reviewable changes with evidence are
preferred.

## Setup

Requirements: Node.js 22.13 or newer and npm 10 or newer.

```bash
npm install
npm run dev
```

Create a branch for the change. Do not commit `.env` files, downloaded papers, build output or local
browser data.

## Before opening a pull request

Run:

```bash
npm run data:build
npm run check
```

Commit regenerated note registry and search-index files when source content changed. Explain:

- the problem;
- the chosen change;
- how it was tested;
- any remaining limitation;
- whether and how AI assisted.

## Educational content

- Write in original language; do not paste coursebooks or commercial revision-site text.
- Check syllabus scope and technical claims against reliable sources.
- Use the established JSON schema and match the declared `contentDepth`.
- Add source and licence information for every third-party diagram.
- Do not add Cambridge papers or mark schemes to Git.
- Treat AI-generated subject content as a draft that requires human checking.

## Code and security

- Reuse existing components and typed paths where practical.
- Keep study-state changes backwards-compatible with the versioned parser.
- Add or update tests for behaviour changes.
- Keep the PDF proxy restricted to approved HTTPS document hosts.
- Report vulnerabilities through the private process in `SECURITY.md`, not a public issue.

By contributing original educational content, you agree that it may be distributed under
CC BY-NC-SA 4.0. Code contributions are accepted under the MIT License.
