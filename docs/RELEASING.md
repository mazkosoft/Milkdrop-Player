# 发布与维护 / Releasing

## 发布前必须完成

1. 阅读 [LICENSING.md](LICENSING.md)。取得 `wmp-svg` 所需文件及修改版的再分发授权，保留完整条款与证据。当前不能把这些文件直接视作 MIT。
2. 在 `release-status.json` 填入已创建的真实仓库地址；记录授权证据文件，并在确实确认授权后更新对应状态。根据完整授权关系更新 `package.json` 的 `license` 字段及第三方声明。
3. 保留根目录 MIT 声明中的 `Copyright (c) 2026 Mazko`。它只覆盖原创贡献。若上游条款不同，应按条款调整分发方式。
4. GitHub 用户名已确认为 `mazkosoft`。本地仓库名为 `Milkdrop-Player`，当前尚未配置 GitHub 远端或在线演示地址。创建后再向 README 添加真实的仓库/演示链接，避免预先宣称链接可用。
5. 在 GitHub 启用 Issues、私密漏洞报告与适当的分支保护。主分支建议命名 `main`，要求 CI 通过，禁止强制推送。若 GitHub 方案不支持某项设置，记录实际配置。

## 本地检查

```sh
npm ci --ignore-scripts
npm run check
npm test
npx playwright install chromium
npm run test:browser
npm run build
npm run release:check
```

最后一个命令当前应失败，明确报告授权和仓库信息未完成。不要通过虚填字段消除错误。依照 [TESTING.md](TESTING.md) 完成实际视觉、全屏、视频和后台行为检查。构建目录只包含发布所需文件，不含桌面备份。

## 创建仓库并上传

在授权完成后，可使用 GitHub Desktop：

1. 选择准备好的项目文件夹作为本地仓库，默认分支设为 `main`。
2. 先检查变更列表，确认 `backup-*`、`node_modules`、`dist`、私人媒体和本机路径未被纳入。
3. 创建首个提交，检查所有 README 图片、相对路径和授权文件。
4. 使用 Publish repository，所有者选择 `mazkosoft`，输入最终仓库名，按发布意图选择可见性。
5. 检查 GitHub 上的 CI 结果。CI 文件已在本地准备，其首次远端执行尚未完成。

也可使用 Git CLI：在项目目录运行 `git init -b main`，检查 `git status` 后再添加与提交。使用 GitHub 页面提供的真实远端 URL 配置 `origin`，不要复制一个尚未创建的仓库地址。

## GitHub Pages

本项目的 Pages workflow 只支持手动触发，先执行授权就绪检查和测试，再部署 allowlist 构建产物。准备文件本身不会启用 Pages 或部署网站。

1. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 确认 `release:check` 通过，然后在 Actions 手动运行 **Deploy Pages**。
3. 使用 workflow 返回的实际网址更新 README 与仓库 About 的 Website 字段。
4. 打开实际网站，检查本地媒体导入、预设、全屏及子路径下的相对资源。

默认 Pages 部署使用 `github-pages` environment、最小权限和固定的官方 Action 提交。相关配置见 [GitHub 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 首次 Release

确认授权、CI、Pages 与手动检查全部完成后，将 `CHANGELOG.md` 的 Unreleased 内容整理为实际发布日期和版本，例如首次候选 `v0.1.0`。仓库当前没有任何已发布版本。

使用 [RELEASE_NOTES.md](RELEASE_NOTES.md) 的草稿，检查版本号与实际修改。先创建 Draft Release、上传只含 `dist/` 内容的完整 ZIP，确认解压后可离线运行，再发布。不要上传备份、私人媒体、依赖安装目录或许可证未覆盖的额外素材。

## 更新第三方文件

在受控更新中下载固定版本，核对包来源与上游许可证，重新运行浏览器检查，再更新 `vendor/manifest.json` 的校验值和 THIRD_PARTY_NOTICES。不要只修改 checksum 来掩盖来源不明的文件变化。
