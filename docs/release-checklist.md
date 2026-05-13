# 发布前检查清单

在正式开源发布、打 **tag**、发 GitHub **release** 或对外传播前，用本清单做最后一轮核对。  
本文件只描述检查项；**不**代替维护者执行 `commit` / `tag` / `push`。

---

## 1. 工作区状态

- [ ] 已运行 `git status --short`，变更在预期范围内（本轮文档/开源包装相关）。
- [ ] 确认**没有**把内部 prompt 目录误加入版本库或误提交其中文件：
  - `docs/OpenSource-prompts/`（应在 [.gitignore](../.gitignore) 中忽略）
  - `docs/cursor-prompts/`（同上）
- [ ] 若 `git status` 出现上述目录下的 **tracked** 新文件，应先移出暂存区或从索引删除后再发布。

## 2. 自动检查

- [ ] 本地执行 `npm run lint` 通过。
- [ ] 本地执行 `npm run build` 通过。
- [ ] 确认 GitHub Actions CI 配置文件存在：[`.github/workflows/ci.yml`](../.github/workflows/ci.yml)（CI 名称、Node 版本等以仓库现状为准，无明确错误则不改动）。

## 3. README 检查

- [ ] [README.md](../README.md) 为**中文**默认入口；[README.en.md](../README.en.md) 为**英文**辅助入口。
- [ ] 两份 README 顶部语言切换互链正确。
- [ ] 不再依赖「第二份完整中文 README」旧模式：若仓库中已无 `README.zh-CN.md` 或仅存跳转 stub，主文档链向应以 `README.md` / `README.en.md` 为准。
- [ ] `docs/assets/` 下截图路径在 README 中引用正确、文件存在。
- [ ] Quick Start 中的 `git clone` / `npm install` / `npm run dev` 等与仓库一致。
- [ ] 快速通读：无过度承诺（如在线托管服务、自动发布公众号、图片上传/CDN、云同步、SaaS、主题市场等与本项目边界不符的表述）。

## 4. 贡献与验证文档

- [ ] [CONTRIBUTING.md](../CONTRIBUTING.md) 存在，且为中文主文档。
- [ ] [manual-validation-checklist.md](manual-validation-checklist.md) 存在，且为中文主文档。
- [ ] [validation-markdown-sample.md](validation-markdown-sample.md) 存在。
- [ ] 上述文档内相对链接（CONTRIBUTING ↔ docs、README ↔ CONTRIBUTING 等）可打开、无断链。

## 5. 人工验证

- [ ] 已按 [人工验证清单](manual-validation-checklist.md) 至少完成一次 **Smoke validation**。
- [ ] 若本次准备正式 **release** 或对外宣传，已完成 **Release validation**（见该清单中 Smoke / Release 区分）。
- [ ] 明确以下仍只能**人工**完成，CI 无法替代：
  - 真实微信公众号后台粘贴结果
  - 各浏览器富文本剪贴板差异
  - 微信内手机预览
  - 主观可读性是否「够好」

## 6. 隐私与仓库卫生

- [ ] 无本地绝对路径、聊天记录、内部 session、token、账号密码等敏感内容进入 **commit**。
- [ ] 公开 PR / issue 截图仅使用验证样稿内容，并对账号、草稿标题、登录态等打码。
- [ ] `.env*` 与内部 prompt 目录仍由 `.gitignore` 覆盖，未被误跟踪。

## 7. package / repo metadata

- [ ] `package.json` 中 `repository` / `bugs` / `homepage` 与 `git remote -v` 指向的仓库一致（发布前由维护者再对一眼）。
- [ ] `"private": true` 保留（应用仓库，不发布 npm）。
- [ ] 仓库内无「npm publish / registry 发布」类流程被当作正式步骤写进必读文档（除非策略变更）。

## 8. 版本与发布决策

维护者填写（或暂空）：

| 项目 | 内容 |
| --- | --- |
| 计划版本号或 tag 名 | （例如 `v0.1.0`，或写「待维护者决定」） |
| 默认分支名 | （通常为 `main`，以远程为准） |

以下命令**仅供参考**，在本地核对完毕、维护者确认 message 与 tag 后再执行；**本阶段任务不应自动执行这些命令**：

```bash
git status --short
git add .
git commit -m "docs: prepare md2wechat open-source packaging"
git tag v0.x.x
git push origin main
git push origin v0.x.x
```

请将 `v0.x.x`、`main`、commit message 替换为实际决定；若使用其他远程名或分支名，自行替换 `origin` / `main`。

---

## 发布后仍需维护者手动完成的事项

- 在 GitHub 上创建 **release**、填写 release note（若需要）。
- 对外公告渠道（若有）的文案与链接。
- 任何与组织、账号、合规相关的最终确认。

以上不在本仓库自动化范围内。
