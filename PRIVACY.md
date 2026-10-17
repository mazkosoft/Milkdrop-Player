# Privacy / 隐私说明

## Application behavior

Media files are selected through the browser's file picker and referenced using temporary Blob URLs. Audio/video decoding and visualization run in the browser. This code contains no media upload endpoint, analytics, advertising, account system or remote media library.

The selected filenames are displayed in the playlist during the current session. The application does not write the playlist or selected media to localStorage, IndexedDB or cookies. Refreshing or closing the page clears that session. The browser and operating system may independently keep downloads, caches, history or file-picker history.

Butterchurn and its preset bundle are served from `vendor/`, rather than a runtime CDN. A hosted copy still makes normal requests to the hosting provider for application assets. GitHub Pages and other hosts may retain request logs under their own policies. Local operation using the downloaded folder does not need an internet connection.

This document describes the checked-in application. Browser extensions, modified forks, injected scripts and hosting configuration can change its behavior. This is not a guarantee about those separate systems.

## 中文

所选媒体通过临时 Blob URL 在浏览器中解码与播放，音频可视化也在本地执行。本项目代码不提供媒体上传接口、统计、广告或账号系统。

文件名仅显示于当前会话的播放列表。应用不通过 localStorage、IndexedDB 或 Cookie 保存列表和媒体，刷新或关闭后会清空。浏览器和操作系统可能自行保存历史、缓存或文件选择记录。

依赖由本地 `vendor/` 提供。线上访问仍会向静态托管服务请求应用资源，托管方可能保留访问日志；完整下载后本地运行不需要联网。扩展、修改版和托管配置不在本说明覆盖范围内。
