# Milkdrop-Player

A browser media player with glassy WMP-inspired controls and music-reactive Butterchurn visuals. Select your own audio or video files and play them locally.

[简体中文](README.zh-CN.md) · [Contributing](CONTRIBUTING.md) · [Licensing status](docs/LICENSING.md)

![Milkdrop-Player playing a generated test tone](docs/images/desktop.png)

**Publication status:** the application and repository tooling are prepared locally. Redistribution permission for the upstream WMP component and SVG assets is still being verified. The MIT license covers Mazko's original contributions only. See [third-party notices](THIRD_PARTY_NOTICES.md) before redistribution.

## Run

Download the whole project and open `index.html` in a recent desktop Chrome or Edge. Keep the JavaScript, CSS, SVG and `vendor/` files beside it. No build or package installation is required to play local files.

For a local web server with Node.js 22 or newer:

```sh
node scripts/serve.mjs
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080). `PORT` can override the default port.

## Use

1. Choose **添加媒体** (Add media) and select one or more audio/video files.
2. Click a playlist entry to change tracks. Use the transport controls for playback, seeking, volume, shuffle and repeat.
3. Select a visualization preset for audio. The included preset bundle provides 100 choices.
4. Use **沉浸模式** (Immersive mode) to expand the picture. During playback the controls fade after 3.5 seconds of inactivity; pointer movement or keyboard focus restores them. Exit the mode to restore the previous playlist state.
5. On narrow screens the playlist starts closed and opens as a drawer. Close it with its close button, the backdrop or Escape. The footer shows the selected filename and actual elapsed/total time.
6. Enter fullscreen using the bottom-right control. The playlist is hidden on entry and restored on exit if it was previously open.

The interface is currently in Simplified Chinese. Playlist entries, toolbar buttons and native select controls support keyboard focus. Fullscreen and media playback remain subject to browser permissions.

## What is included

- Local audio/video playback through the browser's media decoder.
- Butterchurn audio visualizations, loaded from local fixed-version files.
- Playlist selection, seek/volume controls, shuffle and repeat.
- Responsive toolbar and playlist layout, checked at 320px and 390px widths.
- Visualization rendering stops on pause and on page visibility changes. Video playback does not run the audio visualization loop.
- Playback and dependency failure messages. Audio playback remains available when the visualization library cannot load.

The page has no media upload, account, analytics or persistence feature. Files and the playlist are kept for the current page session. Refreshing clears them. See [privacy](PRIVACY.md).

## Compatibility and limits

Desktop Microsoft Edge on Windows was used for local runtime verification. CI is configured for Chromium on Linux. Other browsers and mobile devices need further testing, especially for Web Audio, WebGL, fullscreen, CSS nesting and `ElementInternals.states`.

A filename extension does not guarantee codec support. WAV audio and WebM video were checked locally. MP3, AAC, FLAC, MP4 and other formats depend on the browser, operating system and codecs. DRM media, streaming services, lyrics, metadata extraction and playlist persistence are outside the current feature set.

The app can run offline after the whole project has been downloaded. A GitHub Pages visit still requests the static application files from GitHub. This project has no service worker or installable PWA support.

## Development

Node.js 22+ and npm are required only for development:

```sh
npm ci --ignore-scripts
npm run check
npm test
npx playwright install chromium
npm run test:browser
npm run build
```

On Linux, Playwright may require `npx playwright install --with-deps chromium` instead. To use an installed Microsoft Edge for local tests, set `PLAYWRIGHT_CHANNEL=msedge` in your shell. Browser tests generate their own audio. They do not include commercial music.

`npm run build` recreates `dist/` from an explicit player-asset allowlist. It excludes backups, development dependencies, tests and repository metadata. `npm run release:check` is a separate release-readiness check and intentionally fails until upstream permission and repository metadata have been recorded.

See [architecture and file map](docs/ARCHITECTURE.md), [testing](docs/TESTING.md), [release instructions](docs/RELEASING.md) and the [changelog](CHANGELOG.md).

## Credits and licensing

Project integration and maintenance: [Mazko / mazkosoft](https://github.com/mazkosoft).

- Player components and WMP-style SVG/CSS: [DavidJCobb/wmp-svg](https://github.com/DavidJCobb/wmp-svg), including locally modified player/layout code. An explicit redistribution license has not yet been located at the reviewed upstream revision.
- Visualizer: [jberg/butterchurn](https://github.com/jberg/butterchurn), version 2.6.7, MIT.
- Presets: [jberg/butterchurn-presets](https://github.com/jberg/butterchurn-presets), package version 2.4.7, distributed with its upstream MIT notice.

[LICENSE](LICENSE) applies to Mazko's original contributions. It does not grant rights to upstream WMP code, SVGs, other third-party content or trademarks. Preserve [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and the bundled vendor license files.

This is an independent project. Windows Media Player and Microsoft names describe the visual inspiration and are not a claim of affiliation or endorsement. No sample songs or videos are distributed.

## UI

The selected UI combines a compact black navigation strip and blue active label with the original wmp-svg dark playback controls and curved tray. [UI source details](docs/DESIGN_REFERENCE.md).
