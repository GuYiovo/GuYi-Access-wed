# GuYi Access 版本更新记录维护说明

本目录用于保存网站的版本更新内容。更新正文不会写进 `index.html` 或 `js/main.js`，而是由首页按需读取。

## 目录结构

```text
changelog/
├── index.json       # 更新记录索引，只保存日期、版本、文件名和简短摘要
├── README.md        # 本说明文件
├── 2026.11.18.md    # 2026.11.18 版本的完整更新正文
└── 后续日期.md       # 以后每个版本新增一个 Markdown 文件
```

## 新增一个版本

1. 在本目录新增一个 Markdown 文件，文件名使用日期，例如 `2026.12.01.md`。
2. 在该文件中写入本次更新内容，支持 Markdown 标题、列表、加粗、链接和行内代码。
3. 打开 `index.json`，在 `entries` 数组最前面新增一项，示例：

```json
{
  "date": "2026.12.01",
  "version": "2026.12.01",
  "file": "2026.12.01.md",
  "title": "本次更新标题",
  "summary": "一行简短摘要"
}
```

4. 保存并部署整个 `changelog` 目录。首页会自动显示新日期；访客点击日期后，才会读取对应的 Markdown 正文。

## 为什么使用 Markdown

Markdown 比纯文本更适合长期维护：可以分级标题、列出变更、加入链接和代码片段，同时仍然是轻量的纯文本文件。每个版本独立保存，几百条记录也不会全部塞进网页源码。首页只读取很小的索引文件，正文按需加载。

## 云端版本号

首页从以下地址读取当前最新版本号，不需要每次更新时改动 HTML：

`https://cloudvariables.pages.dev/GuYiAccessversionnumbervariable.txt`

首次打开会显示已确认的 `2026.11.18` 作为本地兜底值，然后尝试同步云端版本。Cloudflare Pages 对静态资源默认提供跨域读取响应头，普通静态 TXT 文件通常不需要额外配置。若以后将版本号改由 Pages Functions / Worker 动态返回，或自定义响应覆盖了跨域响应头，则需要额外配置 CORS。静态资源可在该站点的 `_headers` 文件中配置：

```text
/GuYiAccessversionnumbervariable.txt
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, HEAD, OPTIONS
```


## 页面入口

版本更新列表现在位于独立页面 `changelog.html`，网站导航栏中的“更新日志”会跳转到这里。版本正文仍保存在本目录的独立 Markdown 文件中，`index.json` 继续作为记录索引。
