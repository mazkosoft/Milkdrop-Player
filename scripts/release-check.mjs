import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './files.mjs';

const review = JSON.parse(readFileSync(join(root, 'release-status.json'), 'utf8'));
const failures = [];
if (!review.upstreamPermissionConfirmed) failures.push('wmp-svg redistribution/modification permission has not been documented. See docs/LICENSING.md.');
if (!review.permissionEvidence || !existsSync(join(root, review.permissionEvidence))) failures.push('Add the permission or upstream license evidence file.');
if (!review.repository || !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(review.repository)) failures.push('Set the actual GitHub repository URL.');
if (JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).license === 'UNLICENSED') failures.push('Finalize the package license after verifying upstream terms.');
if (failures.length) {
    console.error('PUBLIC RELEASE NOT READY\n' + failures.map(item => `- ${item}`).join('\n'));
    process.exitCode = 1;
} else console.log('Release metadata checks passed. Follow docs/RELEASING.md for manual verification.');
