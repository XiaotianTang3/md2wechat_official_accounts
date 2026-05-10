# md2wechat

本地使用的 **微信公众号 Markdown 排版** 小工具：左侧写 Markdown，右侧实时预览，一键复制 **带 inline 样式** 的富文本，便于粘贴到公众号后台。

## 主题

内置三种排版主题（工具栏下拉切换）：

- **星夜手记**：偏个人品牌与知识型内容，温暖纸色与卡片阅读感。
- **极简长文**：克制、正文优先的公众号长文风，少装饰、大字号与舒展行距。
- **星舰科技**：科技媒体 / AI 分析向，章节标题色块突出，表格与引用对比清晰。

复制与预览均使用当前主题生成的 **内联样式 HTML**，不依赖外部 CSS 或 Tailwind class 进正文。

## 功能概要

- Markdown 编辑与实时预览（GFM：表格、任务列表等）
- 复制富文本到剪贴板、复制 Markdown
- 导入 / 导出 `.md`，导出带文档壳的 `.html`
- 草稿与当前主题 id 保存在浏览器 `localStorage`

## 开发与运行

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

```bash
npm run build
npm run start
```

生产构建与本地预览。

## 技术栈

Next.js（App Router）、React、TypeScript、Tailwind CSS（仅应用外壳）、unified / remark / rehype、rehype-sanitize。

## 部署

可部署到 [Vercel](https://vercel.com) 等支持 Next.js 的平台；默认无后端、无登录。
