# Contributing / 参与贡献

Please read [the licensing status](docs/LICENSING.md) before redistributing this project. The upstream permission review is still open.

## Getting started

Use Node.js 22+ and npm. Run `npm ci --ignore-scripts`, then `npm run dev`. The player itself is plain HTML, CSS and JavaScript. Keep it usable without a build step.

Before submitting a change:

```sh
npm run check
npm test
npm run test:browser
npm run build
```

Install the browser once with `npx playwright install chromium`. Follow [TESTING.md](docs/TESTING.md) for visual and platform checks.

## Issues and pull requests

- Use the bug template with browser/OS versions, reproduction steps and console errors. Do not attach private media, tokens or personal filesystem paths.
- For UI changes, include before/after screenshots at desktop and narrow widths.
- Keep changes focused. Explain the user-visible behavior and the checks performed.
- Preserve upstream credits and license notices. Do not edit minified vendor bundles by hand.
- New assets, code and presets must include their source and a verified license or explicit permission. Public visibility of a repository is not permission to redistribute it.
- Use `textContent` for media filenames. Keep file processing local unless an explicitly documented feature requires a network request.
- Use normal keyboard focus, accessible control names and visible error feedback. Do not add a framework or production dependency for a small native-browser task.

Original contributions to this project are submitted under the MIT terms in [LICENSE](LICENSE), to the extent you own the contribution. Contributions do not change the rights of upstream material. Include relevant third-party terms if your contribution incorporates external work. No CLA or DCO is currently required.

中文反馈和 PR 均可。请提供浏览器/系统版本、复现步骤和实际验证结果；修改界面时附桌面与窄屏截图。不要上传私人音视频。第三方资源须说明来源及可核实授权，不能用本项目 MIT 覆盖其原有权利。
