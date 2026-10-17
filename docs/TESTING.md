# Testing

## Automated checks

```sh
npm ci --ignore-scripts
npm run check
npm test
npx playwright install chromium
npm run test:browser
npm run build
```

Use `npx playwright install --with-deps chromium` on Linux when browser libraries are missing. For an installed Edge, set the `PLAYWRIGHT_CHANNEL` environment variable to `msedge`. For example in PowerShell: `$env:PLAYWRIGHT_CHANNEL = 'msedge'`.

- `check`: JavaScript syntax including inline scripts, local runtime paths, vendor SHA-256 checksums and documentation links.
- `test`: local-server allowlist, rejected metadata/traversal requests, and playlist navigation/loop/clear behavior.
- `test:browser`: real WAV playback, preset initialization/change, render counts across pause/resume, fullscreen, playlist changes, 320/390px control geometry, invalid and repeated imports, missing-library fallback and rejected play promises. It also checks for uncaught JavaScript errors and external runtime requests.
- Page visibility events are simulated in headless tests. Check actual background-tab behavior manually as well.

## Visual checks

To regenerate README screenshots from the live player with synthesized test audio:

```sh
node tests/browser.mjs --screenshots
node tests/ui.mjs --screenshots
```

Files are written under `docs/images/`. Inspect them before committing. Visualizer output changes between frames and should not use pixel-identical snapshot assertions.

## Manual release checks

1. Open the downloaded directory through `file://` and through the loopback server.
2. Import a supported audio file, play/pause, seek, adjust volume, mute, switch tracks and test repeat/shuffle.
3. Select different presets and check that audio continues without clipping or errors.
4. Enter/exit fullscreen with the playlist initially open and initially closed.
5. Background the tab, return, and confirm rendering stops/resumes without interrupting audio.
6. Play a supported video, then switch back to audio. Confirm video visibility and audio visualization recovery.
7. Resize to 320px, 390px and desktop widths, then test keyboard focus and slider keys.
8. Check developer console and network requests. No private filenames, media or screenshots should be committed.
9. Disconnect networking and verify the downloaded player still works.

## Evidence and limits

Local checks used desktop Microsoft Edge on Windows. WAV audio and a generated WebM video were exercised. Browser CI targets Linux Chromium, but its first hosted run is still pending. Real mobile hardware, Firefox and Safari are not yet verified. Do not claim universal codec or accessibility compliance from these checks.

UI regression checks also exercise actual metadata/state/counts, immersive sizing, idle visibility, keyboard recovery, playlist restoration and mobile drawer interactions including touch.
