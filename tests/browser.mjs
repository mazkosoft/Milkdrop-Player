import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { createDevServer } from '../scripts/serve.mjs';
import { root } from '../scripts/files.mjs';

function testTone() {
    const rate = 16000, samples = rate * 30, data = Buffer.alloc(44 + samples * 2);
    data.write('RIFF'); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8);
    data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(1, 22);
    data.writeUInt32LE(rate, 24); data.writeUInt32LE(rate * 2, 28);
    data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34); data.write('data', 36);
    data.writeUInt32LE(samples * 2, 40);
    for (let i = 0; i < samples; i++) data.writeInt16LE(Math.sin(2 * Math.PI * 220 * i / rate) * 4000, 44 + i * 2);
    return {name: 'Generated test tone.wav', mimeType: 'audio/wav', buffer: data};
}

const server = createDevServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');
let browser;
try {
    browser = await chromium.launch({headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? {channel: process.env.PLAYWRIGHT_CHANNEL} : {}), args: ['--autoplay-policy=no-user-gesture-required']});
    const page = await browser.newPage({viewport: {width: 1280, height: 800}});
    const errors = [], externalRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    page.on('request', request => {
        if (!request.url().startsWith(base) && !/^(blob:|data:)/.test(request.url())) externalRequests.push(request.url());
    });
    await page.goto(base);
    assert.equal(await page.locator('#pSel option').count(), 100);
    assert.match(await page.locator('.playlist-empty').innerText(), /暂无/);
    const screenshots = process.argv.includes('--screenshots');
    if (screenshots) {
        await mkdir(join(root, 'docs/images'), {recursive: true});
        await page.screenshot({path: join(root, 'docs/images/welcome.png')});
    }
    await page.evaluate(() => {
        window.visualStats = {frames: 0, presets: []};
        const create = butterchurn.default.createVisualizer;
        butterchurn.default.createVisualizer = (...args) => {
            const visualizer = create(...args);
            const render = visualizer.render.bind(visualizer), load = visualizer.loadPreset.bind(visualizer);
            visualizer.render = (...args) => { visualStats.frames++; return render(...args); };
            visualizer.loadPreset = (...args) => { visualStats.presets.push(args[1]); return load(...args); };
            return visualizer;
        };
    });
    await page.locator('#f').setInputFiles([testTone(), {...testTone(), name: 'Second generated tone.wav'}]);
    await page.waitForFunction(() => document.querySelector('wm-player').currentTime > .2 && visualStats.frames > 0);
    assert.equal(await page.locator('.playlist-item').count(), 2);
    assert.equal(await page.evaluate(() => visualStats.presets[0]), 0);
    async function checkGeometry() {
        await page.waitForFunction(() => {
            const root = document.querySelector('wm-player').shadowRoot, canvas = root.getElementById('canvas'), content = root.querySelector('.content');
            return canvas.width === Math.round(content.clientWidth) && canvas.height === Math.round(content.clientHeight);
        });
    }
    await checkGeometry();
    await page.locator('.play-pause').click();
    await page.waitForTimeout(100);
    const frames = await page.evaluate(() => visualStats.frames);
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(() => visualStats.frames), frames);
    await page.locator('.play-pause').click();
    await page.waitForFunction(count => visualStats.frames > count, frames);
    // Simulate visibility events because headless tab focus is platform-dependent.
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', {configurable: true, get: () => true}); document.dispatchEvent(new Event('visibilitychange')); });
    await page.waitForTimeout(100);
    const hiddenFrames = await page.evaluate(() => visualStats.frames);
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(() => visualStats.frames), hiddenFrames);
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    await page.waitForFunction(count => visualStats.frames > count, hiddenFrames);
    await page.locator('#pSel').selectOption({index: 1});
    assert.equal(await page.evaluate(() => visualStats.presets.at(-1)), 1.5);
    await page.locator('#playlist-toggle').click();
    await checkGeometry();
    assert.equal(await page.locator('#playlist-toggle').getAttribute('aria-pressed'), 'false');
    await page.locator('#playlist-toggle').click();
    await page.locator('.fullscreen').click();
    await page.waitForFunction(() => document.fullscreenElement === document.querySelector('wm-player'));
    assert.ok(await page.locator('#canvas').isVisible());
    assert.equal(await page.locator('#playlist-toggle').getAttribute('aria-pressed'), 'false');
    await page.locator('.fullscreen').click();
    await page.waitForFunction(() => !document.fullscreenElement && document.querySelector('wm-player').classList.contains('show-playlist'));
    assert.equal(await page.locator('#playlist-toggle').getAttribute('aria-pressed'), 'true');
    await page.locator('.playlist-item').nth(1).click();
    assert.equal(await page.locator('.playlist-item').nth(1).getAttribute('aria-current'), 'true');
    if (screenshots) await page.screenshot({path: join(root, 'docs/images/desktop.png')});
    for (const width of [390, 320]) {
        await page.setViewportSize({width, height: 844});
        await checkGeometry();
        const box = await page.locator('.controls').boundingBox();
        assert.ok(box.x >= 0 && box.x + box.width <= width + 1, `Controls clipped at ${width}px`);
        if (screenshots && width === 390) await page.screenshot({path: join(root, 'docs/images/mobile.png')});
    }
    await page.locator('#f').setInputFiles({name: 'not-media.txt', mimeType: 'text/plain', buffer: Buffer.from('test')});
    assert.match(await page.locator('#status').innerText(), /请选择/);
    assert.equal(await page.locator('.playlist-item').count(), 2);
    await page.locator('#f').setInputFiles(testTone());
    assert.equal(await page.locator('.playlist-item').count(), 3);

    const video = await page.evaluate(async () => {
        const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 90;
        const context = canvas.getContext('2d'), stream = canvas.captureStream(10);
        const recorder = new MediaRecorder(stream, {mimeType: 'video/webm'}), chunks = [];
        recorder.ondataavailable = event => chunks.push(event.data);
        const stopped = new Promise(resolve => recorder.onstop = resolve);
        let tick = 0;
        recorder.start();
        const interval = setInterval(() => { context.fillStyle = tick++ % 2 ? '#2477bb' : '#337799'; context.fillRect(0, 0, 160, 90); }, 50);
        await new Promise(resolve => setTimeout(resolve, 1200));
        clearInterval(interval); recorder.stop(); await stopped;
        stream.getTracks().forEach(track => track.stop());
        return Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer()));
    });
    await page.locator('#f').setInputFiles({name: 'Generated video.webm', mimeType: 'video/webm', buffer: Buffer.from(video)});
    if (!await page.locator('.playlist-item').nth(3).isVisible()) await page.locator('#playlist-toggle').click();
    await page.locator('.playlist-item').nth(3).click();
    await page.waitForFunction(() => document.querySelector('wm-player').videoWidth === 160 && document.querySelector('wm-player').currentTime > 0);
    await page.waitForTimeout(100);
    const videoFrames = await page.evaluate(() => visualStats.frames);
    await page.waitForTimeout(200);
    assert.equal(await page.evaluate(() => visualStats.frames), videoFrames);
    await page.locator('.playlist-item').first().click();
    await page.waitForFunction(count => visualStats.frames > count, videoFrames);

    const fallback = await browser.newPage();
    fallback.on('pageerror', error => errors.push(error.message));
    await fallback.route('**/vendor/**', route => route.abort());
    await fallback.goto(base);
    assert.match(await fallback.locator('#status').innerText(), /依赖加载失败/);
    await fallback.locator('#f').setInputFiles(testTone());
    await fallback.waitForFunction(() => document.querySelector('wm-player').currentTime > .2);
    await fallback.evaluate(() => {
        const player = document.querySelector('wm-player'); player.pause();
        player.shadowRoot.querySelector('video').play = () => Promise.reject(new DOMException('test rejection', 'NotAllowedError'));
    });
    await fallback.locator('.playlist-item').click();
    await fallback.waitForFunction(() => document.querySelector('wm-player').shadowRoot.getElementById('status').textContent.includes('播放失败'));
    assert.deepEqual(errors, []);
    assert.deepEqual(externalRequests, []);
    console.log('PASS: local loading, WAV/WebM playback, render lifecycle, video/audio switching, presets, fullscreen, playlist, 320/390px layouts, import validation, missing-dependency fallback, rejected playback, no external runtime requests');
} finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
}
