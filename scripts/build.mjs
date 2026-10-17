import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { root, distributionFiles } from './files.mjs';

const output = resolve(root, 'dist');
if (dirname(output) !== resolve(root)) throw new Error('Output must stay inside the project');
console.log(`Rebuilding generated directory: ${output}`);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of distributionFiles) {
    await mkdir(dirname(join(output, name)), { recursive: true });
    await cp(join(root, name), join(output, name));
}
console.log(`Copied ${distributionFiles.length} player and license files to dist/`);
