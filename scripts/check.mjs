import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Script } from 'node:vm';
import { createHash } from 'node:crypto';
import { root, distributionFiles } from './files.mjs';

for (const name of distributionFiles) assert.ok(existsSync(join(root, name)), `Missing asset: ${name}`);
for (const name of readdirSync(root).filter(name => name.endsWith('.js'))) new Script(readFileSync(join(root, name), 'utf8'), { filename: name });
const html = readFileSync(join(root, 'index.html'), 'utf8');
for (const [, attributes, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const src = attributes.match(/src="([^"]+)"/);
    if (src) {
        assert.ok(!/^https?:/.test(src[1]), 'Runtime scripts must be local');
        assert.ok(existsSync(join(root, src[1])), `Missing script: ${src[1]}`);
    } else new Script(body, { filename: 'index.html inline script' });
}
for (const name of ['wmplayer.css', 'wmplayer.buttons.css', 'wmplayer.slider.css']) {
    for (const [, target] of readFileSync(join(root, name), 'utf8').matchAll(/url\(["']?([^\s)'"#]+)(?:#[^)]*)?["']?\)/g)) {
        if (!target.startsWith('data:')) assert.ok(existsSync(join(root, target)), `${name}: missing ${target}`);
    }
}
const manifest = JSON.parse(readFileSync(join(root, 'vendor/manifest.json'), 'utf8'));
for (const file of manifest.files) {
    const actual = createHash('sha256').update(readFileSync(join(root, file.path))).digest('hex');
    assert.equal(actual, file.sha256, `Vendor checksum mismatch: ${file.path}`);
}
for (const name of ['README.md', 'README.zh-CN.md', 'CONTRIBUTING.md', 'SECURITY.md', 'PRIVACY.md', 'THIRD_PARTY_NOTICES.md', 'docs/RELEASING.md']) {
    for (const [, target] of readFileSync(join(root, name), 'utf8').matchAll(/\]\(([^\s)]+)\)/g)) {
        if (/^(https?:|mailto:|#)/.test(target)) continue;
        const base = name.includes('/') ? join(root, name, '..') : root;
        assert.ok(existsSync(join(base, decodeURIComponent(target.split('#')[0]))), `${name}: broken local link ${target}`);
    }
}
console.log('PASS: JavaScript syntax, runtime asset paths, vendor checksums and documentation links');
