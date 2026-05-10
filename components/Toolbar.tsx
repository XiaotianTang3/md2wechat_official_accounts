import type { Theme } from "@/types/theme";
import { ThemeSelector } from "@/components/ThemeSelector";

const btnSecondary =
  "rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-50";

type ToolbarProps = {
  themes: Theme[];
  themeId: string;
  onThemeIdChange: (id: string) => void;
  primaryAccentColor: string;
  onImportMarkdown: () => void;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onCopyWechat: () => void;
  onCopyMarkdown: () => void;
  copyWechatDisabled?: boolean;
  copyHint: string | null;
};

export function Toolbar({
  themes,
  themeId,
  onThemeIdChange,
  primaryAccentColor,
  onImportMarkdown,
  onExportMarkdown,
  onExportHtml,
  onCopyWechat,
  onCopyMarkdown,
  copyWechatDisabled,
  copyHint,
}: ToolbarProps) {
  return (
    <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-zinc-200 bg-white px-4 py-2 sm:gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600">主题</span>
        <ThemeSelector
          themes={themes}
          value={themeId}
          onChange={onThemeIdChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={btnSecondary} onClick={onImportMarkdown}>
          导入 Markdown
        </button>
        <button type="button" className={btnSecondary} onClick={onExportMarkdown}>
          导出 Markdown
        </button>
        <button type="button" className={btnSecondary} onClick={onExportHtml}>
          导出 HTML
        </button>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        {copyHint ? (
          <span className="text-sm text-zinc-600" role="status">
            {copyHint}
          </span>
        ) : null}
        <button
          type="button"
          className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-50 disabled:opacity-50"
          disabled={copyWechatDisabled}
          onClick={onCopyWechat}
        >
          复制到公众号
        </button>
        <button
          type="button"
          className="rounded px-3 py-1.5 text-sm text-white hover:opacity-90"
          style={{ backgroundColor: primaryAccentColor }}
          onClick={onCopyMarkdown}
        >
          复制 Markdown
        </button>
      </div>
    </header>
  );
}
