export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("无法读取文件为文本"));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("读取文件失败"));
    reader.readAsText(file, "UTF-8");
  });
}

function triggerDownload(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportMarkdownFile(markdown: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });
  triggerDownload("wechat-article.md", blob);
}

export type ExportHtmlOptions = {
  title?: string;
  sectionStyle?: string;
};

export function exportHtmlDocument(
  inlineBodyHtml: string,
  options: ExportHtmlOptions = {},
): void {
  if (typeof document === "undefined") return;
  const title = options.title ?? "Wechat Article";
  const sectionStyle =
    options.sectionStyle ??
    "max-width:720px;margin:0 auto;padding:24px;box-sizing:border-box;";

  const doc = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <section style="${escapeAttr(sectionStyle)}">
${inlineBodyHtml}
  </section>
</body>
</html>`;

  const blob = new Blob([doc], { type: "text/html;charset=utf-8" });
  triggerDownload("wechat-article.html", blob);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape for use inside a double-quoted HTML attribute */
function escapeAttr(text: string): string {
  return text.replace(/"/g, "&quot;");
}
