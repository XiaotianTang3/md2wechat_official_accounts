import type { Theme } from "@/types/theme";

function camelToKebab(prop: string): string {
  return prop.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);
}

function serializeCssValue(key: string, value: string | number): string {
  if (typeof value === "number") {
    if (
      key === "fontWeight" ||
      key === "lineHeight" ||
      key === "opacity" ||
      key === "zIndex" ||
      key === "flexGrow" ||
      key === "flexShrink" ||
      key === "order"
    ) {
      return String(value);
    }
    return `${value}px`;
  }
  return value;
}

function applyCssProperties(
  el: HTMLElement,
  props: Record<string, string | number | undefined>,
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    el.style.setProperty(camelToKebab(key), serializeCssValue(key, value));
  }
}

/**
 * GitHub 风格的代码高亮配色（亮色背景）。
 * 对应 rehype-highlight 给 token span 加的 hljs-* class。
 * inline style 化后才能在 公众号 粘贴里存活。
 */
const HLJS_COLORS: Record<string, string> = {
  "hljs-keyword": "#d73a49",
  "hljs-built_in": "#005cc5",
  "hljs-type": "#d73a49",
  "hljs-literal": "#005cc5",
  "hljs-number": "#005cc5",
  "hljs-string": "#032f62",
  "hljs-symbol": "#032f62",
  "hljs-regexp": "#032f62",
  "hljs-comment": "#6a737d",
  "hljs-quote": "#6a737d",
  "hljs-doctag": "#6a737d",
  "hljs-meta": "#6a737d",
  "hljs-meta-keyword": "#6a737d",
  "hljs-meta-string": "#032f62",
  "hljs-attr": "#22863a",
  "hljs-attribute": "#22863a",
  "hljs-name": "#22863a",
  "hljs-tag": "#22863a",
  "hljs-title": "#6f42c1",
  "hljs-section": "#6f42c1",
  "hljs-variable": "#e36209",
  "hljs-template-variable": "#e36209",
  "hljs-bullet": "#e36209",
  "hljs-params": "#24292e",
  "hljs-selector-tag": "#22863a",
  "hljs-selector-id": "#005cc5",
  "hljs-selector-class": "#6f42c1",
  "hljs-selector-attr": "#e36209",
  "hljs-selector-pseudo": "#005cc5",
  "hljs-addition": "#22863a",
  "hljs-deletion": "#b31d28",
};

function applyHljsStyles(el: HTMLElement): void {
  const classAttr = el.getAttribute("class") ?? "";
  if (!classAttr.includes("hljs-")) return;
  for (const cls of classAttr.split(/\s+/)) {
    const color = HLJS_COLORS[cls];
    if (color) el.style.setProperty("color", color);
    if (cls === "hljs-emphasis") el.style.setProperty("font-style", "italic");
    if (cls === "hljs-strong") el.style.setProperty("font-weight", "bold");
    if (cls === "hljs-deletion") el.style.setProperty("text-decoration", "line-through");
  }
}

/**
 * 将 sanitize 后的语义 HTML 转为适合微信公众号粘贴的 inline style HTML。
 * 依赖 DOMParser，仅在浏览器中生效；否则原样返回。
 */
export function applyInlineStyles(html: string, theme: Theme): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return html;
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;
  if (!body) return html;

  const elements = body.querySelectorAll("*");

  for (const node of elements) {
    const el = node as HTMLElement;
    // 代码高亮的 hljs-* class 必须先转成 inline style，再清掉 class，
    // 否则 公众号粘贴时 class 会被清，颜色就丢了。
    applyHljsStyles(el);
    el.removeAttribute("class");

    const tag = el.tagName.toLowerCase();
    const rules = theme.styles[tag];
    if (rules) {
      if (tag === "code" && el.parentElement?.tagName === "PRE") {
        applyCssProperties(el, {
          ...rules,
          backgroundColor: "transparent",
          color: "inherit",
          padding: 0,
          borderRadius: 0,
          fontSize: "inherit",
        });
      } else {
        applyCssProperties(el, rules as Record<string, string | number | undefined>);
      }
    }

    if (tag === "a") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }

    if (tag === "img") {
      el.style.setProperty("max-width", "100%");
      el.style.setProperty("height", "auto");
    }
  }

  return body.innerHTML;
}
