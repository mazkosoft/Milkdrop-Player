import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { request } from 'node:http';
import { readFileSync } from 'node:fs';
import { Script, createContext } from 'node:vm';
import { join } from 'node:path';
import { createDevServer } from '../scripts/serve.mjs';
import { root } from '../scripts/files.mjs';

function localRequest(url, method = 'GET') {
    return new Promise((resolve, reject) => {
        const req = request(url, {method}, response => { response.resume(); resolve(response); });
        req.on('error', reject);
        req.end();
    });
}

test('development server serves assets but rejects metadata, backups and traversal', async () => {
    const server = createDevServer();
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
        const page = await localRequest(base);
        assert.equal(page.statusCode, 200);
        assert.match(page.headers['content-type'], /text\/html/);
        assert.equal((await localRequest(`${base}/vendor/butterchurn.min.js`)).statusCode, 200);
        for (const name of ['.git/config', '.env', 'backup-old/index.html', '%2e%2e%2fpackage.json', 'package.json']) assert.equal((await localRequest(`${base}/${name}`)).statusCode, 404);
        assert.equal((await localRequest(base, 'POST')).statusCode, 405);
    } finally { await new Promise(resolve => server.close(resolve)); }
});

test('playlist moves between tracks, loops and clears', () => {
    const context = createContext({ EventTarget, Event, CustomEvent, navigator: {}, URL, window: {location: {href: 'http://localhost/'}} });
    const Playlist = new Script(readFileSync(join(root, 'wmplayer.playlist.js'), 'utf8') + '\nWMPlaylist;').runInContext(context);
    const list = new Playlist();
    assert.equal(list.empty(), true);
    list.add({src: 'one.wav', audio_only: true});
    list.add({src: 'two.wav', audio_only: true});
    assert.equal(list.size, 2);
    assert.equal(list.index, 0);
    list.toNext();
    assert.equal(list.index, 1);
    assert.equal(list.toNext(), false);
    list.loop = true;
    list.toNext();
    assert.equal(list.index, 0);
    list.clear();
    assert.equal(list.currentItem, null);
    assert.equal(list.empty(), true);
});
