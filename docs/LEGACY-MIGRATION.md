# Legacy migration record

The uploaded archive was audited before the rebuild.

## Reused

- The complete four-subject syllabus catalogue: 153 topics
- Subject codes, titles, syllabus years and useful resource links
- All 33 structured rich-note entries
- 19 additional unique HTML-formatted in-depth notes, converted to structured data
- The strongest visual ideas: restrained subject accents, compact navigation and clear content-depth labels
- Original sourcing and non-affiliation guidance

## Replaced

- Inline `onclick` handlers and direct DOM mutation were replaced by React components and route state.
- Large HTML strings in `DEEP` were parsed into sections, bullets, formulas and exam-tip arrays.
- `innerHTML` rendering was removed.
- The one-screen home/subject switcher was replaced by refresh-safe routes.
- PapaCambridge links were removed from primary paper navigation; the internal metadata browser is now primary.
- The Chemistry RocketRevise URL was removed because it pointed through an incorrect Biology path.
- The mobile layout was redesigned instead of shrinking the desktop rail.

## Newly added

- Dashboard, bookmarks, progress, recents, last-location memory and dark mode
- Global full-text search
- AS/A2 filtering
- Editorial note reader and responsive table of contents
- Internal paper filters with QP/MS pairing
- Lazy topic loading, validation scripts, automated tests and production deployment paths

No useful note text or topic metadata from the current archive was discarded.
