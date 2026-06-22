/**
 * 将内联样式 HTML 写入系统剪贴板（富文本 + 纯文本），供微信公众号等富文本编辑器粘贴。
 * 必须使用已 applyInlineStyles 的 HTML 字符串，勿从预览 DOM 抓取。
 */

function copyViaExecCommand(html: string): void {
  const div = document.createElement("div");
  div.setAttribute("contenteditable", "true");
  div.style.position = "fixed";
  div.style.left = "-9999px";
  div.style.top = "0";
  div.innerHTML = html;
  document.body.appendChild(div);

  const selection = window.getSelection();
  if (!selection) {
    document.body.removeChild(div);
    throw new Error("无法访问选区");
  }

  div.focus();
  const range = document.createRange();
  range.selectNodeContents(div);
  selection.removeAllRanges();
  selection.addRange(range);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    document.body.removeChild(div);
  }

  if (!ok) {
    throw new Error("execCommand('copy') 失败");
  }
}

function canUseClipboardWrite(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard?.write === "function" &&
    typeof ClipboardItem !== "undefined" &&
    typeof Blob !== "undefined"
  );
}

export async function copyRichHtml(
  html: string,
  plainText: string,
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("copyRichHtml 仅在浏览器中可用");
  }

  if (canUseClipboardWrite()) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch {
      // 部分浏览器对多 MIME 的 ClipboardItem 较严，降级到 execCommand
    }
  }

  copyViaExecCommand(html);
}

export async function copyMarkdown(text: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("copyMarkdown 仅在浏览器中可用");
  }
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // 老浏览器 / 权限受限环境：降级到 execCommand
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
  if (!ok) {
    throw new Error("execCommand('copy') 失败");
  }
}
