import type { Theme } from "@/types/theme";
import type { ColorPaletteId, ThemeColors } from "@/types/theme";
import { PaletteSelector } from "@/components/PaletteSelector";
import { ThemeSelector } from "@/components/ThemeSelector";

const btnSecondary =
  "rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-50";

const btnPrimary =
  "rounded px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const groupLabel = "text-xs font-medium text-zinc-500";

function Divider() {
  return (
    <span
      aria-hidden
      className="hidden h-5 w-px shrink-0 bg-zinc-200 sm:inline-block"
    />
  );
}

type ToolbarProps = {
  themes: Theme[];
  themeId: string;
  onThemeIdChange: (id: string) => void;
  paletteId: ColorPaletteId;
  onPaletteIdChange: (id: ColorPaletteId) => void;
  paletteSwatchColors: ThemeColors;
  paletteDefaultSwatchColors: ThemeColors;
  primaryAccentColor: string;
  onImportMarkdown: () => void;
  onExportMarkdown: () => void;
  onCopyWechat: () => void;
  onCopyMarkdown: () => void;
  copyWechatDisabled?: boolean;
  copyMarkdownDisabled?: boolean;
  copyHint: string | null;
};

export function Toolbar({
  themes,
  themeId,
  onThemeIdChange,
  paletteId,
  onPaletteIdChange,
  paletteSwatchColors,
  paletteDefaultSwatchColors,
  primaryAccentColor,
  onImportMarkdown,
  onExportMarkdown,
  onCopyWechat,
  onCopyMarkdown,
  copyWechatDisabled,
  copyMarkdownDisabled,
  copyHint,
}: ToolbarProps) {
  return (
    <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-zinc-200 bg-white px-4 py-2 sm:gap-x-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex items-center gap-2">
          <span className={groupLabel}>排版</span>
          <ThemeSelector
            themes={themes}
            value={themeId}
            onChange={onThemeIdChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className={groupLabel}>配色</span>
          <PaletteSelector
            value={paletteId}
            onChange={onPaletteIdChange}
            currentSwatchColors={paletteSwatchColors}
            defaultSwatchColors={paletteDefaultSwatchColors}
            layoutId={themeId as import("@/types/theme").LayoutThemeId}
          />
        </div>
      </div>

      <Divider />

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={btnSecondary} onClick={onImportMarkdown}>
          导入 Markdown
        </button>
        <button type="button" className={btnSecondary} onClick={onExportMarkdown}>
          导出 Markdown
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
          className={btnPrimary}
          style={{ backgroundColor: primaryAccentColor }}
          disabled={copyWechatDisabled}
          onClick={onCopyWechat}
        >
          复制到公众号
        </button>
        <button
          type="button"
          className={btnSecondary}
          disabled={copyMarkdownDisabled}
          onClick={onCopyMarkdown}
        >
          复制 Markdown
        </button>
      </div>
    </header>
  );
}
