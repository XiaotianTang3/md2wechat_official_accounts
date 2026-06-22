import { defaultSchema } from "hast-util-sanitize";
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

// 在默认 sanitize schema 上额外允许 data: URL（用于本地图片的 data URL 渲染）。
// 协议列表是合集，不影响 http/https 的原有行为。
const sanitizeSchema = {
  ...defaultSchema,
  protocols: {
    ...defaultSchema.protocols,
    src: [...(defaultSchema.protocols?.src ?? []), "data"],
  },
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
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
