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
