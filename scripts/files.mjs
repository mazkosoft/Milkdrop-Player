import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const runtimeFiles = [
    'index.html', 'wmplayer.js', 'wmplayer.playlist.js', 'wmplayer.slider.js',
    'wmplayer.css', 'wmplayer.buttons.css', 'wmplayer.slider.css',
    ...readdirSync(root).filter(name => /^spritesheet-[\w-]+\.svg$/.test(name)),
    'vendor/butterchurn.min.js', 'vendor/butterchurnPresets.min.js',
    'vendor/LICENSE-butterchurn', 'vendor/LICENSE-butterchurn-presets',
];
export const distributionFiles = [...runtimeFiles, 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'PRIVACY.md', 'vendor/manifest.json', 'docs/LICENSING.md', 'docs/provenance.json', 'docs/DESIGN_REFERENCE.md'];
