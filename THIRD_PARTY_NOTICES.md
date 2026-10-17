# Third-party notices

The root MIT license applies only to original contributions owned by Mazko. It does not relicense the following third-party components. Keep this file and the notices below in redistributed copies.

## DavidJCobb / wmp-svg

- Project: https://github.com/DavidJCobb/wmp-svg
- Author credited by upstream: DavidJCobb.
- Reviewed revision: `84df38f3cebcc0d6d34547b60afd1beb5dbec3d7`.
- Files: `wmplayer.js`, `wmplayer.playlist.js`, `wmplayer.slider.js`, `wmplayer.css`, `wmplayer.buttons.css`, `wmplayer.slider.css`, and all ten `spritesheet-*.svg` files.
- Local modifications: playlist layout and UI, fullscreen integration, playback promise handling, responsive styling, now-playing metadata, immersive controls, slider stylesheet URL normalization and related player integration. Some modifications predate this preparation.
- Permission status: unresolved. No explicit license was located in the reviewed tree. These files are not covered by Mazko's MIT grant. Resolve permission before public redistribution or deployment.
- Evidence and next steps: [licensing review](docs/LICENSING.md), [per-file provenance](docs/provenance.json).

## Butterchurn 2.6.7

- Project: https://github.com/jberg/butterchurn
- Bundled file: `vendor/butterchurn.min.js`.
- License: MIT, copyright (c) 2013-2018 Jordan Berg, as stated in the upstream notice.
- Full notice: [vendor/LICENSE-butterchurn](vendor/LICENSE-butterchurn).
- Bundle is preserved without local edits.

## butterchurn-presets 2.4.7

- Project: https://github.com/jberg/butterchurn-presets
- Bundled file: `vendor/butterchurnPresets.min.js`.
- Package license: MIT, copyright (c) 2013-2018 Jordan Berg, as stated in the upstream notice.
- Full notice: [vendor/LICENSE-butterchurn-presets](vendor/LICENSE-butterchurn-presets).
- The package provides 100 presets in this bundled version. The supplied package notice is preserved; this is not a new authorship claim over individual presets.

Fixed download URLs and checksums are recorded in `vendor/manifest.json`.

## Development tooling

Playwright and playwright-core 1.62.1 are development-only dependencies under Apache-2.0. Sources: https://github.com/microsoft/playwright. Installed packages include their own license/notice files. They are excluded from the player build. Dependency versions and integrity values are recorded in `package-lock.json`.

Official GitHub Actions are pinned to full commit IDs in the workflows. They run in GitHub's CI environment and are not bundled into the player.

## Names and media

Windows Media Player and Microsoft names are used to describe the visual inspiration. This is an independent project and does not claim Microsoft affiliation, endorsement or trademark rights.

No commercial songs, videos, album covers or extracted Microsoft raster assets are added by this project preparation. Documentation screenshots show the real application playing a programmatically generated test tone. The WMP-inspired SVG assets retain the permission status described above.

## UI design reference

The compact top navigation was visually informed by [Ingan121/WMPotify](https://github.com/Ingan121/WMPotify). No WMPotify resources, compiled theme, screenshots or source snippets are bundled. See [design reference](docs/DESIGN_REFERENCE.md).
