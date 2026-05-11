"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { EditorPane } from "@/components/EditorPane";
import { PreviewPane } from "@/components/PreviewPane";
import { Toolbar } from "@/components/Toolbar";
import { copyRichHtml } from "@/lib/clipboard";
import { exportMarkdownFile, readFileAsText } from "@/lib/file";
import { applyInlineStyles } from "@/lib/inlineStyles";
import { markdownToHtml } from "@/lib/markdown";
import { SAMPLE_MARKDOWN } from "@/lib/sample-markdown";
import {
  loadDraft,
  loadPaletteId,
  loadThemeId,
  saveDraft,
  savePaletteId,
  saveThemeId,
} from "@/lib/storage";
import {
  getDefaultColorsForLayout,
  normalizeStoredPaletteId,
  resolvePaletteColors,
} from "@/lib/palettes";
import { createTheme, DEFAULT_THEME_ID, THEMES } from "@/lib/themes";
import type { ColorPaletteId, LayoutThemeId } from "@/types/theme";

const HINT_MS = 2500;

function isThemeId(id: string): id is LayoutThemeId {
  return THEMES.some((t) => t.id === id);
}

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [layoutId, setLayoutId] = useState<LayoutThemeId>(DEFAULT_THEME_ID);
  const [paletteId, setPaletteId] = useState<ColorPaletteId>("default");
  const [storageReady, setStorageReady] = useState(false);
  const currentTheme = useMemo(() => {
    const colors = resolvePaletteColors(layoutId, paletteId);
    return createTheme(layoutId, colors);
  }, [layoutId, paletteId]);
  const [html, setHtml] = useState("");
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const requestId = useRef(0);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    /* Mount-only: read localStorage once. Synchronous setState is intentional; rule disallows generic sync setState in effects. */
    /* eslint-disable react-hooks/set-state-in-effect */
    const draft = loadDraft();
    const tid = loadThemeId();
    const pid = loadPaletteId();

    if (draft !== null) {
      setMarkdown(draft);
    }
    const initialLayoutId =
      tid !== null && isThemeId(tid) ? tid : DEFAULT_THEME_ID;
    setLayoutId(initialLayoutId);
    setPaletteId(normalizeStoredPaletteId(pid));
    setStorageReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    saveDraft(markdown);
    saveThemeId(layoutId);
    savePaletteId(paletteId);
  }, [markdown, layoutId, paletteId, storageReady]);

  useEffect(() => {
    const id = ++requestId.current;
    void markdownToHtml(markdown).then((raw) => {
      if (id !== requestId.current) return;
      const styled = applyInlineStyles(raw, currentTheme);
      startTransition(() => {
        setHtml(styled);
      });
    });
  }, [markdown, currentTheme]);

  function showCopyHint(message: string) {
    if (hintTimer.current) clearTimeout(hintTimer.current);
    setCopyHint(message);
    hintTimer.current = setTimeout(() => {
      setCopyHint(null);
      hintTimer.current = null;
    }, HINT_MS);
  }

  async function handleCopyWechat() {
    try {
      await copyRichHtml(html, markdown);
      showCopyHint("已复制");
    } catch {
      showCopyHint("复制失败");
    }
  }

  function handleImportMarkdownClick() {
    importInputRef.current?.click();
  }

  async function handleImportFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      setMarkdown(text);
      showCopyHint("已导入");
    } catch {
      showCopyHint("导入失败");
    }
  }

  function handleExportMarkdown() {
    exportMarkdownFile(markdown);
    showCopyHint("已导出");
  }

  useEffect(() => {
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  const copyWechatDisabled = html.trim() === "" || isPending;

  return (
    <div className="flex h-screen min-h-0 flex-col bg-zinc-100">
      <input
        ref={importInputRef}
        type="file"
        accept=".md,.markdown,text/plain"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => void handleImportFileChange(e)}
      />
      <Toolbar
        themes={THEMES}
        themeId={layoutId}
        onThemeIdChange={(id) => {
          if (isThemeId(id)) setLayoutId(id);
        }}
        paletteId={paletteId}
        onPaletteIdChange={setPaletteId}
        paletteSwatchColors={resolvePaletteColors(layoutId, paletteId)}
        paletteDefaultSwatchColors={getDefaultColorsForLayout(layoutId)}
        primaryAccentColor={currentTheme.colors.primary}
        onImportMarkdown={handleImportMarkdownClick}
        onExportMarkdown={handleExportMarkdown}
        onCopyWechat={() => void handleCopyWechat()}
        copyWechatDisabled={copyWechatDisabled}
        copyHint={copyHint}
      />
      <div className="flex min-h-0 flex-1">
        <EditorPane value={markdown} onChange={setMarkdown} />
        <PreviewPane html={html} isPending={isPending} />
      </div>
    </div>
  );
}
