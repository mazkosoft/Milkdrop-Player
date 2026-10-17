# Licensing review / 授权核对

## Original contributions

Following the existing CRT-Simulator project convention, the original integration and repository tooling use MIT with `Copyright (c) 2026 Mazko`. The root LICENSE covers those original contributions only. It does not grant rights to upstream-derived code, SVGs, presets or trademarks.

The package metadata currently says `UNLICENSED` because the combined distribution has unresolved upstream permission. That is a release-status marker, not a replacement for the separate MIT grants already supplied for original contributions and vendor packages.

## WMP components and SVG assets

Source: https://github.com/DavidJCobb/wmp-svg

Reviewed revision: `84df38f3cebcc0d6d34547b60afd1beb5dbec3d7` on 2026-10-17.

The current project contains the upstream `src/wmplayer.playlist.js`, `src/wmplayer.slider.css`, `src/wmplayer.buttons.css` and ten `src/spritesheet-*.svg` files. Their Git blob hashes match after CRLF normalization. `wmplayer.js` and `wmplayer.css` contain local changes to the upstream component/layout. `wmplayer.slider.js` normalizes the stylesheet base URL to avoid a duplicate slash. Details are recorded in `provenance.json` beside this document.

No LICENSE, COPYING or equivalent license file was found in the reviewed upstream tree. This establishes a missing permission record; it does not establish that the author has never granted permission elsewhere. Public source availability alone does not grant redistribution rights. See [GitHub's no-license explanation](https://choosealicense.com/no-permission/).

Before publishing the combined repository or demo, obtain an applicable upstream license or written permission covering the actual JS/CSS/SVG files, modifications, public source distribution and hosted use. Preserve the terms and attribution in the repository and downloads. If prior permission already exists, record that evidence instead of requesting it again.

The draft in `PERMISSION_REQUEST.md` has not been sent. If permission is unavailable, remove/replace these upstream files under a separately approved implementation scope. A credit line alone is not a license.

## Visualizer dependencies

The bundled Butterchurn 2.6.7 and butterchurn-presets 2.4.7 packages include upstream MIT notices. Preserve both notices. `vendor/manifest.json` records exact source URLs and SHA-256 checksums. The preset package's own notice is recorded as supplied; this review does not claim to have independently traced each preset's historical authorship.

## Current release state

`release-status.json` records the unresolved permission and repository URL. `npm run release:check` intentionally fails while those records remain incomplete. The Pages workflow is manual and runs that check before deployment. The local preparation archive is for maintainer review, not a statement that the combined project is cleared for public redistribution.

## 中文

沿用 CRT-Simulator 的既有约定，Mazko 原创贡献使用 MIT。上游播放器、CSS 和 SVG 不会因为本地修改或添加 MIT 文件就自动变为 MIT。当前已精确比对来源，但未在核对的上游版本中找到许可证。

公开发布整个仓库、下载包或在线演示前，应记录已有有效授权，或取得覆盖这些文件及修改版的明确授权。如果无法取得，需在另行确定的开发范围内替换相关实现和素材。署名不能代替授权。
