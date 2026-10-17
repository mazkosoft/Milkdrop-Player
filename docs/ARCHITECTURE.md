# Architecture

The player is a static HTML document. There is no compilation, bundler, API server or production npm dependency.

| File | Responsibility |
| --- | --- |
| `index.html` | Page shell, media import, visualizer lifecycle, fullscreen integration, error feedback, track metadata, immersive/idle state |
| `wmplayer.js` | WMP web component, media transport and playlist UI |
| `wmplayer.playlist.js` | Playlist model and navigation |
| `wmplayer.slider.js` | Custom seek/volume slider element |
| `wmplayer.css` | Player layout, toolbar and playlist styling |
| `wmplayer.buttons.css`, `wmplayer.slider.css` | Component control styles |
| `spritesheet-*.svg` | Upstream WMP-inspired vector assets |
| `vendor/` | Fixed visualizer bundles, license notices and checksum manifest |
| `scripts/` | Loopback dev server, checks, allowlist build and release-readiness check |
| `tests/` | Node tooling/model checks and Chromium integration checks |

## Playback flow

File picker → temporary Blob URL → `wm-player.addToPlaylist()` → internal video element → browser decoder.

Audio playback → one Web Audio media-element source → audio destination and Butterchurn → canvas inside the player's shadow content area.

The audio source is reused across tracks. The visualizer is initialized on audio playback, not on page load. `ResizeObserver` uses the actual content dimensions instead of subtracting a fixed sidebar width. The animation loop checks paused/ended state, page visibility and audio mode. The playlist class observer updates the toolbar state and layout. The canvas stays inside the element that enters fullscreen.

Media URLs are kept for the page lifetime and revoked on non-bfcache page exit. There is currently no UI for removing individual tracks or persisting a playlist. Changes to resource ownership should preserve currently playing files.

## Source boundaries

The player components, most base styles and SVGs originate in `DavidJCobb/wmp-svg`. Local code changes do not erase upstream ownership. See [LICENSING.md](LICENSING.md) and [third-party notices](../THIRD_PARTY_NOTICES.md).

Development tools are kept outside the runtime asset list. The optional `dist/` output contains only the player and relevant notices. Tests synthesize audio/video instead of bundling copyrighted tracks.

The component emits `playlist-change` after rebuilding its playlist UI. The page reads the active item title for the now-playing display. Time values come directly from the media element. Immersive mode records/restores the prior playlist state; idle hiding keeps keyboard controls recoverable and is enabled only for immersive/fullscreen playback. Narrow-screen layouts use a dismissible drawer.

Selected UI: original wmp-svg dark control/tray stylesheet followed by app integration styles. The compact top navigation is retained. See NATIVE_UI.md.
