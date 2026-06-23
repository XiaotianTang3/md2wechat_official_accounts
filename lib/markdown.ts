import { defaultSchema } from "hast-util-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { ImageMap } from "@/lib/image-map";
import { substituteRefsInMarkdown } from "@/lib/image-map";

/**
 * 输出为已通过 rehype-sanitize 的语义 HTML。
 * 预览与后续复制前应在客户端对返回值调用 applyInlineStyles(html, theme)。
 */
export type { Theme } from "@/types/theme";

// 在默认 sanitize schema 上：
// 1. 允许 span 上携带 className（rehype-highlight 给代码 token 加的 hljs-* 类需要它穿过 sanitize）
// 2. 允许 data: 协议（本地图片的 data URL 渲染需要）
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    span: ["className"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: [...(defaultSchema.protocols?.src ?? []), "data"],
  },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeHighlight, { detect: true, ignoreMissing: true })
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeStringify);

export async function markdownToHtml(
  markdown: string,
  options?: { imageMap?: ImageMap },
): Promise<string> {
  // 先把短引用 `image:filename` 替换成 data URL，再交给 remark 解析。
  const substituted = options?.imageMap
    ? substituteRefsInMarkdown(markdown, options.imageMap)
    : markdown;
  const file = await processor.process(substituted);
  return String(file);
}
