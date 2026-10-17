# Changelog

## Unreleased

### Added

- Compact black navigation strip with a blue active label and dense light playlist, visually informed by WMPotify.

- Milkdrop-Player identity with the original wmp-svg dark playback controls and curved tray.
- Actual track title, elapsed/total time, playlist count and current-track indicator.
- Immersive mode with idle chrome hiding and keyboard/pointer recovery.
- Mobile playlist drawer with close, backdrop and Escape interactions.

- Local Butterchurn 2.6.7 and preset 2.4.7 bundles with upstream MIT notices.
- Chinese media toolbar, empty state and dependency/playback failure messages.
- Responsive playlist layout and keyboard-focusable playlist entries.
- English and Chinese documentation, third-party provenance records and release checklist.
- Portable syntax/asset checks, generated-media browser regression tests and GitHub CI templates.

### Fixed

- Slider stylesheet URLs containing an extra slash when served over HTTP.

- Visualization canvas placement in fullscreen and sizing against the actual media area.
- Unnecessary visualization rendering while paused, hidden or playing video.
- Initial visualization preset selection.
- Playback error handling bypassed by the component's automatic method proxy.

### Release status

- No version has been published. `0.1.0` is the initial development package version.
- Redistribution permission for the WMP component and SVG/CSS assets is pending verification.
