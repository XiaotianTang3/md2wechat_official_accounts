type PreviewPaneProps = {
  /** 已应用 applyInlineStyles 的 HTML（内层节点为 inline style，无 Tailwind class） */
  html: string;
  isPending?: boolean;
  /** 预览容器背景，仅作用于外壳，不写入 innerHTML */
  shellBackground?: string;
};

export function PreviewPane({
  html,
  isPending,
  shellBackground,
}: PreviewPaneProps) {
  return (
    <div className="flex w-1/2 min-h-0 flex-col p-4">
      <div
        className="preview-shell relative min-h-0 flex-1 overflow-auto rounded border border-zinc-300 bg-white p-4 text-zinc-900 shadow-sm"
        style={
          shellBackground
            ? { backgroundColor: shellBackground }
            : { backgroundColor: "#fff" }
        }
      >
        {isPending ? (
          <span className="pointer-events-none absolute right-3 top-3 text-xs text-zinc-400">
            解析中…
          </span>
        ) : null}
        {/*
          富文本复制使用父组件中的 html 字符串（applyInlineStyles 之后），
          请勿用本节点 outerHTML 作为剪贴板来源。
        */}
        <div
          role="region"
          aria-label="正文预览"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
