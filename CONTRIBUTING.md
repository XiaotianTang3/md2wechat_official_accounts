# 参与 md2wechat 贡献

感谢你的关注。本文说明如何参与贡献，同时避免把项目扩张到既定边界之外。

## 项目范围

md2wechat 是一个**本地优先**工具：用**普通 Markdown** 写作，在**微信公众号**白底编辑环境下调试排版预览，并将带 **inline style** 的富文本复制到公众号后台。

默认**无后端**、**无登录**、**无数据库**。草稿与界面偏好保存在浏览器中（例如 `localStorage`）。

## 我们欢迎的贡献

例如：

- 文档修正与表述澄清
- 可复现的缺陷报告，以及在范围内的针对性修复
- 可维护性、可访问性，或 Markdown → 预览 → 复制链路上的小改进
- 与下文人工验证流程相匹配的测试或验证思路

维护者会审核每个变更。若与范围冲突或长期维护成本过高，贡献可能被拒绝。

## 不在范围内

请**不要**提议或实现：

- 自定义 Markdown DSL
- 后端服务、账号体系、登录或云同步
- 图片上传、CDN 托管、微信素材库管理
- 主题市场或「主题商店」
- 任意 CSS 编辑或自由 HEX 取色器
- 手机壳 / 设备边框类模拟预览（除非后续明确要求）
- 把 md2wechat 做成 CMS、协作平台或 SaaS 形态

若不确定，请先简短讨论再投入大 PR。

## 本地开发

```bash
npm install
npm run dev
```

需要时在另一终端：

```bash
npm run lint
npm run build
```

请使用与项目 `package.json` 中 Next.js 兼容的 Node.js LTS 版本。

## 人工验证

分步清单（含 Smoke / Release、环境记录、元素表、失败判定）：**[`docs/manual-validation-checklist.md`](docs/manual-validation-checklist.md)**。

端到端检查预览与粘贴行为时，请使用样稿 **[`docs/validation-markdown-sample.md`](docs/validation-markdown-sample.md)**。

建议流程（样稿文件开头也有说明）：

1. 将样稿载入或粘贴进 md2wechat
2. 尝试不同**排版模板**与**配色方案**
3. 复制到微信公众号后台，与应用内预览对照
4. 若改动影响粘贴效果，可在微信内做手机预览核对

正式开源发布、打 tag、发 GitHub release 或对外传播前的**最终文档与流程核对**，见 **[`docs/release-checklist.md`](docs/release-checklist.md)**。

## PR 检查清单

提交 PR 前请确认：

- [ ] `npm run lint` 通过
- [ ] `npm run build` 通过
- [ ] 已用 [`docs/validation-markdown-sample.md`](docs/validation-markdown-sample.md) 做过测试
- [ ] 若改动影响**渲染**或**剪贴板复制**：至少在微信公众号后台完成**一次手动粘贴**并粗查结果
- [ ] 若改动为**文档**：已检查**截图**与 **README 链接**（默认中文 [README.md](README.md) 与英文 [README.en.md](README.en.md) 等）

## 微信公众号后台粘贴行为

实际环境会有差异，例如：

- 粘贴后，微信编辑器可能**清洗或改写**部分样式
- **富文本剪贴板**行为因浏览器、操作系统而异
- **表格**、**代码块**、**远程图片**应在微信最终呈现中再确认
- **本地图片**更稳妥的方式是在微信编辑器中上传，不要假设从剪贴板「一定带上」

## 编码与格式约定

- 遵循仓库 **[`.editorconfig`](.editorconfig)**（UTF-8、LF、两空格缩进、文件末换行；Markdown 在需要时保留行尾空格等）。
- **不要引入 Prettier**（或其它全仓格式化工具），除非维护者在全项目范围采纳。

## npm 发布边界

本仓库是**应用**，不是发布到 npm 的库。**`package.json` 保留 `"private": true`**，以降低误执行 `npm publish` 的风险。

除非维护者明确调整策略，否则请勿在贡献中加入 npm publish、发 npm 包、registry 流程等。
