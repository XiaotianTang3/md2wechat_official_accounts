# md2wechat

**中文** | [English](README.en.md)

[![CI](https://github.com/XiaotianTang3/md2wechat_official_accounts/actions/workflows/ci.yml/badge.svg)](https://github.com/XiaotianTang3/md2wechat_official_accounts/actions/workflows/ci.yml)

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
- 插入本地图片（在编辑器内可见，复制到公众号后变成占位提示）
- 自动保存草稿、排版和配色到浏览器 `localStorage`，图片数据存进浏览器 IndexedDB
- 多种公众号文章排版模板
- 多套配色方案
- 白底优先的预览策略，减少「网页卡片好看、公众号里变样」的问题

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
- **报刊（v2 新增）**：编辑感版式。默认配色为纯净墨黑 + 板岩灰强调（无彩色倾向）；切换到下方 4 套编辑感配色可获得各自的彩色组合，accent 色会显在 h2 下划线、粗体、链接、行内 code、表头、引用条上。

排版模板控制的是字号、行距、标题、引用、表格、代码块等结构样式。

## 配色方案

工具栏中的「配色」控制标题、强调色、引用、表格、代码块等局部元素的颜色。

当前内置：

- **默认**：使用当前排版模板自己的原生配色
- **焦糖·可可（报刊 v3）**：Brunello Cucinelli / Loro Piana 意式软奢。文化、人物、生活方式。
- **墨红·牛津黑（报刊 v3）**：Margaret Howell / Turnbull & Asser 牛津风。学术、评论、深度。
- **象牙·墨黑·黄铜（v2）**：Hermès / Chanel 编辑感。商业、财经、长论。
- **午夜·深蓝（报刊 v3）**：晚点 LatePost / FT 中文网。科技、商业深度报道。
- **燕麦·烟草·深棕（v2）**：Loro Piana / Bottega Veneta 深烟草。生活方式、文化随笔、深度长文。
- **石色·鼠尾草·黄铜（v2）**：Aesop / Margaret Howell。设计、产品、文化深度。
- **和纸·墨·朱赤（v2）**：The Row / Hato Press 极简。文学、艺术、设计批评。
- **墨黑灰**：正式、克制，适合长文
- **星空蓝**：科技、AI、产品分析
- **松石绿**：教程、知识整理
- **胶片棕**：个人随笔、故事、复盘
- **紫雾**：轻科技、未来感内容
- **暖橙**：方法论、经验总结、轻知识卡片

v2 起新增「报刊」主题，配套 7 套编辑感配色——每套由 paper（背景）+ dark（文字）+ accent（强调色）三个维度定义独特颜色身份，互不重叠：

- **焦糖·可可**：暖奶白 + 焦糖棕（意式软奢）
- **墨红·牛津黑**：暖象牙 + 酒红（牛津学术）
- **象牙·墨黑·黄铜**：暖象牙 + 黄铜（Hermès 编辑）
- **午夜·深蓝**：暖冷灰 + 深海军蓝（晚点 / FT）
- **燕麦·烟草·深棕**：深燕麦 + 烟草棕（Bottega 单色）
- **石色·鼠尾草·黄铜**：凉石色 + 鼠尾草绿（Aesop）
- **和纸·墨·朱赤**：和纸白 + 朱赤（Hato Press 极简）

「报刊」的「默认」配色为纯净墨黑 + 板岩灰强调，与 7 套彩色配色皆不重叠。旧主题与老配色保持不变。

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

可以导入它测试不同模板和配色在预览、公众号后台粘贴、公众号手机预览里的表现。详细步骤见 [docs/manual-validation-checklist.md](docs/manual-validation-checklist.md)。

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

md2wechat 的核心能力是**正文、标题、引用、表格、代码块**等文本排版，**不承诺**把图片稳定嵌入剪贴板并粘贴到微信公众号后台。

**远程图片（http / https）**：

- 在预览中正常显示
- 复制时 HTML 里保留 `<img src="https://...">`
- 是否在公众号后台保留，取决于微信对外链图片的处理——**best-effort，不保证**

**本地图片**：

工具栏「插入图片」按钮可选择本地文件，但走的是「**编辑器内可见，复制时降级为占位提示**」的策略：

- markdown 里插入 `![filename](image:filename)`，肉眼可读，不污染源码
- 实际图片存进浏览器 **IndexedDB**（不是 localStorage，留足空间）
- 预览里能正确看到图
- 复制到公众号时，HTML 里的 `<img>` 自动替换成 `<p>[图片：filename，请在公众号后台手动上传后插入]</p>`，plain text 同样使用该占位
- 复制 Markdown 时 ref 保持原样，方便你继续在 md2wechat 内编辑

**显式不做**：

- 不做后端 / 图床 / CDN
- 不做公众号素材库上传
- 不做浏览器扩展 / 原生剪贴板助手
- 不为了图片复制能力改大架构
- 不对图片在公众号最终发布时的状态做任何保证

**实际工作流建议**：

1. 在 md2wechat 里写完正文、决定好图片位置
2. 复制到公众号后台，得到带「[图片：filename，请在公众号后台手动上传后插入]」的占位
3. 在公众号后台按占位位置上传对应图片
4. 在公众号里完成最终预览和发布

## 隐私

md2wechat 默认只使用浏览器 `localStorage` 保存本地状态：

- 草稿内容
- 当前排版模板
- 当前配色方案

没有账号系统，不会把文章内容上传到服务器。复制到公众号发生在你的浏览器和微信公众号后台之间。

## 工作原理

简化流程：

1. Markdown 里的 `image:filename` 短引用替换成 data URL（基于 IndexedDB 里的图片数据）
2. Markdown 通过 unified / remark / rehype 转成语义 HTML
3. `rehype-sanitize` 清洗 HTML（已放行 `data:` 协议以支持本地图片 data URL）
4. 当前排版模板和配色方案被转换成 inline style
5. 预览区展示同一份 inline style HTML
6. 点击复制到公众号时，HTML 里的 `<img src="data:...">` 替换成「[图片：filename，请在公众号后台手动上传后插入]」占位，再写入剪贴板

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
- 本地图片在编辑器内可见，复制到公众号后会变成占位提示，需要在公众号后台手动上传
- 远程图片在公众号里是否保留，取决于公众号后台处理——best-effort，不保证

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

## 参与贡献

项目范围、PR 检查清单与人工验证说明见根目录 [CONTRIBUTING.md](CONTRIBUTING.md)。发布前最终核对见 [docs/release-checklist.md](docs/release-checklist.md)。

## 许可证

MIT
