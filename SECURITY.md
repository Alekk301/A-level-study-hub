# Security policy

## Supported version

Security fixes are applied to the latest code on `main`. Older tags are retained as project history
and are not supported deployments.

## Report a vulnerability

Please do not publish a sensitive vulnerability in a normal issue. Use
[GitHub's private vulnerability-reporting form](https://github.com/Alekk301/A-level-study-hub/security/advisories/new)
and include:

- the affected route or file;
- steps to reproduce;
- likely impact; and
- a suggested fix, if known.

Do not include real student data, credentials or unnecessary personal information.

## Important boundaries

- No user account or student database exists in version 1.
- Study progress is browser-local.
- Environment files and private keys are ignored and must never be committed.
- Paper-preview URLs must remain HTTPS, PDF-only and restricted to approved hosts.
- Third-party dependencies and external PDF hosts remain separate trust boundaries.

Educational-content mistakes are important but are not usually security vulnerabilities; report
those through a normal issue with a reliable correction source.
