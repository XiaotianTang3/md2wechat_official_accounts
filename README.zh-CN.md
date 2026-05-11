# md2wechat

[English](README.md)

**md2wechat** 是一个本地优先的 **微信公众号 Markdown 排版工具**。

用普通 Markdown 写作，实时预览接近微信公众号白底正文的排版效果，然后一键复制带 **inline style** 的富文本到微信公众号后台。

> 普通 Markdown → 已消毒 HTML → inline style 排版 → 复制到公众号后台

md2wechat 不是 CMS，也不是在线协作平台。默认无后端、无登录、无数据库，内容只保存在你的浏览器本地。

## 截图

### 编辑器预览

![md2wechat 编辑器预览](docs/assets/study-daily-default.png)

### 粘贴到微信公众号后台后的效果

![微信公众号后台粘贴效果](docs/assets/wechat-paste-result.png)

### 模板示例

![星舰科技模板预览](docs/assets/starship-default.png)

![留学日报暖橙配色预览](docs/assets/study-daily-warm-orange.png)

## 为什么做这个

微信公众号编辑器适合发布，不适合写作和排版。常见问题是：

- 长文写作和结构调整不方便
- Markdown 内容需要手工重新排版
- 网页 CSS / Tailwind class 复制到公众号后经常失效
- 预览很好看，但粘贴到公众号白底环境后效果变样

md2wechat 的目标是把写作和排版前移到一个轻量工具里：用标准 Markdown 写内容，用排版模板生成适合公众号粘贴的 inline style 富文本。

## 功能

- Markdown 编辑与实时预览
- GFM 支持：表格、任务列表等
- 一键复制富文本到微信公众号后台
- 导入 / 导出 `.md`
- 自动保存草稿、排版和配色到浏览器 `localStorage`
- 多种公众号文章排版模板
- 多套配色方案
- 白底优先的预览策略，减少“网页卡片好看、公众号里变样”的问题

## 快速开始

要求：

- Node.js 20+
- npm
- 现代浏览器，推荐 Chrome / Edge

```bash
git clone https://github.com/XiaotianTang3/md2wechat_official_accounts.git
cd md2wechat_official_accounts
npm install
npm run dev
```

打开：

```txt
http://localhost:3000
```

生产构建：

```bash
npm run build
npm run start
```

代码检查：

```bash
npm run lint
```

## 使用方式

1. 在左侧写 Markdown，或导入 `.md` 文件
2. 在工具栏选择「排版」模板
3. 选择「配色」方案，或保留「默认」
4. 在右侧检查公众号正文预览
5. 点击「复制到公众号」
6. 粘贴到微信公众号后台
7. 用微信公众号自己的预览做最终确认

## 排版模板

工具栏中的「排版」控制文章结构和版式。当前内置：

- **极简长文**：克制、正文优先，适合长文、随笔、方法论文章。
- **星舰科技**：标题和强调更明确，适合 AI、科技产品分析、结构化内容。
- **留学日报**：黄色高亮分节，适合留学、教育、职场和热点评论类公众号长文。
- **仿新华社**：蓝色小标题、红色重点强调，适合新闻稿、官方资讯和正式媒体报道。

排版模板控制的是字号、行距、标题、引用、表格、代码块等结构样式。

## 配色方案

工具栏中的「配色」控制标题、强调色、引用、表格、代码块等局部元素的颜色。

当前内置：

- **默认**：使用当前排版模板自己的原生配色
- **墨黑灰**：正式、克制，适合长文
- **星空蓝**：科技、AI、产品分析
- **松石绿**：教程、知识整理
- **胶片棕**：个人随笔、故事、复盘
- **紫雾**：轻科技、未来感内容
- **暖橙**：方法论、经验总结、轻知识卡片

「默认」不是全局固定色，而是当前模板的原生配色。例如「留学日报」默认是黄标风格，「仿新华社」默认是蓝红撞色。选择其它配色时，会用对应 palette 覆盖模板配色。

## 支持的 Markdown

md2wechat 使用 unified / remark / rehype 渲染 Markdown，并支持常见 GFM 内容：

- 标题：`#` / `##` / `###`
- 段落与换行
- 加粗、斜体、链接、inline code
- 引用块
- 无序 / 有序列表
- 任务列表
- 表格
- 代码块
- 分割线
- 图片

项目里有一份人工验证样稿：

```txt
docs/validation-markdown-sample.md
```

可以导入它测试不同模板和配色在预览、公众号后台粘贴、公众号手机预览里的表现。

## 复制到公众号

点击「复制到公众号」会复制经过 inline style 处理的 HTML，同时附带纯文本 fallback。

设计原则：

- 不依赖外部 CSS
- 不把 Tailwind class 写进正文
- 不强行复制整页背景色
- 优先保证在公众号默认白底下清晰可读
- 表格、引用、代码块等局部样式尽量保留

不同浏览器和微信公众号编辑器版本对富文本粘贴的支持可能有差异，最终效果以实际粘贴结果为准。建议在微信公众号后台粘贴后，再用公众号自己的预览做最终检查。

## 图片边界

md2wechat 会渲染 Markdown 图片。远程图片在部分情况下可以随富文本一起粘贴到微信公众号后台，例如：

```md
![图片说明](https://placehold.co/800x320.png?text=md2wechat+image+test)
```

但图片不是当前版本的核心承诺：

- 远程图片能否保留，取决于微信公众号后台对外链图片的处理
- 本地图片路径（如 `./assets/demo.png` 或 `/Users/.../demo.png`）通常无法被公众号后台直接使用
- 正式发布时，更可靠的方式是在公众号后台手动上传图片，再调整到对应位置

因此，md2wechat 当前主要负责正文、标题、引用、表格、代码块等文本排版；图片以公众号最终预览为准。

## 隐私

md2wechat 默认只使用浏览器 `localStorage` 保存本地状态：

- 草稿内容
- 当前排版模板
- 当前配色方案

没有账号系统，不会把文章内容上传到服务器。复制到公众号发生在你的浏览器和微信公众号后台之间。

## 工作原理

简化流程：

1. Markdown 通过 unified / remark / rehype 转成语义 HTML
2. `rehype-sanitize` 清洗 HTML
3. 当前排版模板和配色方案被转换成 inline style
4. 预览区展示同一份 inline style HTML
5. 点击复制时写入剪贴板的 `text/html` 和 `text/plain`

Tailwind CSS 只用于应用外壳 UI，不进入复制给公众号的正文 HTML。

## 限制

当前刻意不做：

- 自定义 Markdown DSL
- 自由调色器 / HEX 输入
- 元素级 CSS 编辑
- 主题市场
- 图片上传 / 图床 / 微信素材库管理
- 后端同步
- 登录和权限系统
- 复杂模板系统
- 手机壳模拟预览

已知限制：

- 微信公众号后台可能清洗或改写部分样式
- 不同浏览器的富文本剪贴板行为可能不同
- 表格、代码块、远程图片在公众号最终效果中需要人工检查
- 本地图片建议在公众号后台手动上传

这个项目优先保持轻量、直接、可复制到公众号。

## 开发

技术栈：

- Next.js App Router
- React
- TypeScript
- Tailwind CSS：只用于应用外壳 UI
- unified / remark / rehype：Markdown 转 HTML
- rehype-sanitize：HTML 安全处理

常用命令：

```bash
npm run dev
npm run lint
npm run build
```

排版模板主要在：

```txt
lib/themes.ts
```

配色方案主要在：

```txt
lib/palettes.ts
```

Markdown 渲染和复制链路分别在：

```txt
lib/markdown.ts
lib/inlineStyles.ts
lib/clipboard.ts
```

## 部署

可以部署到 Vercel 或其它支持 Next.js 的平台。

如果只是个人使用，本地运行就够了。部署后它仍然是一个前端工具，默认不包含后端、登录和云端同步。

## 许可证

MIT
