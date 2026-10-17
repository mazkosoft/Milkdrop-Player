# Security policy

This is a static browser application with local file selection and WebGL rendering. There is no backend, account system or media upload endpoint in this repository.

Security fixes are intended for the latest code on the default branch. There is currently no published stable release or response-time commitment.

## Reporting

Use the repository's **Security → Report a vulnerability** flow when private vulnerability reporting is enabled. The maintainer must enable this before public launch, as described in [RELEASING.md](docs/RELEASING.md).

If private reporting is unavailable, open a minimal issue asking for a private contact method without exploit details, personal data or sample private media. Do not publish a working exploit in a general bug report.

Include the affected revision, browser/OS, reproduction steps, impact and a synthetic sample if possible. Never send tokens or private music/video collections.

## Maintainer notes

Review file-name DOM insertion, dependencies, Web Audio/WebGL error handling and external requests. Keep GitHub Actions permissions minimal. Do not run pull-request code with secrets via `pull_request_target`.

The local development server binds to `127.0.0.1` and serves an asset allowlist. It is not a general-purpose production server. A hosting provider may log ordinary page requests independently of this application. See [PRIVACY.md](PRIVACY.md).
