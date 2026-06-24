"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { EditorPane, type EditorPaneHandle } from "@/components/EditorPane";
import { ImageListPanel } from "@/components/ImageListPanel";
import { PreviewPane } from "@/components/PreviewPane";
import { Toolbar } from "@/components/Toolbar";
import { copyRichHtml, copyMarkdown } from "@/lib/clipboard";
import { exportMarkdownFile, readFileAsText } from "@/lib/file";
import { deleteImage as deleteImageFromIDB } from "@/lib/image-store";
import {
  type ImageMap,
  insertImage,
  loadImageMap,
  migrateDataUrlsInDraft,
  removeImageFromMarkdown,
} from "@/lib/image-map";
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
  isPaletteValidForLayout,
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
  const [imageMap, setImageMap] = useState<ImageMap>({});
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
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<EditorPaneHandle | null>(null);
  const imageMapRef = useRef<ImageMap>({});
  // 避免 useEffect 把保存的 imageMap 覆盖回空对象
  const imageMapLoaded = useRef(false);

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
    const initialPaletteId = isPaletteValidForLayout(
      normalizeStoredPaletteId(pid),
      initialLayoutId,
    )
      ? normalizeStoredPaletteId(pid)
      : "default";
    setPaletteId(initialPaletteId);
    setStorageReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // 异步加载图片库 + 迁移历史草稿里的 data URL。
  // 跟 localStorage 读取分两个 effect，因为 IndexedDB 是 async。
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const map = await loadImageMap();
      if (cancelled) return;
      imageMapRef.current = map;
      setImageMap(map);
      imageMapLoaded.current = true;

      // 检查当前 markdown 里有没有 data URL（旧 v1 失败方案的产物）需要迁移
      const draft = loadDraft() ?? SAMPLE_MARKDOWN;
      if (draft.includes("data:image/")) {
        const { md: migrated, addedToMap } = await migrateDataUrlsInDraft(
          draft,
          map,
        );
        if (cancelled) return;
        if (Object.keys(addedToMap).length > 0) {
          const next = { ...map, ...addedToMap };
          imageMapRef.current = next;
          setImageMap(next);
          setMarkdown(migrated);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    saveDraft(markdown);
    saveThemeId(layoutId);
    savePaletteId(paletteId);
  }, [markdown, layoutId, paletteId, storageReady]);

  // Premium palettes (e.g. editorial-only) must not survive a theme switch.
  // Done in the change handler (not an effect) to avoid cascading renders.

  useEffect(() => {
    const id = ++requestId.current;
    void markdownToHtml(markdown, { imageMap }).then((raw) => {
      if (id !== requestId.current) return;
      const styled = applyInlineStyles(raw, currentTheme);
      startTransition(() => {
        setHtml(styled);
      });
    });
  }, [markdown, currentTheme, imageMap]);

  function handleThemeIdChange(id: string) {
    if (!isThemeId(id)) return;
    setLayoutId(id);
    if (!isPaletteValidForLayout(paletteId, id)) {
      setPaletteId("default");
    }
  }

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
      await copyRichHtml(html, markdown, { imageMap });
      showCopyHint("已复制");
    } catch {
      showCopyHint("复制失败");
    }
  }

  async function handleCopyMarkdown() {
    try {
      await copyMarkdown(markdown);
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

  function handleInsertImageClick() {
    imageInputRef.current?.click();
  }

  async function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const { id, dataUrl, reused } = await insertImage(
        file.name,
        file,
        imageMapRef.current,
      );
      const nextMap = { ...imageMapRef.current, [id]: { id, filename: id, dataUrl } };
      imageMapRef.current = nextMap;
      setImageMap(nextMap);
      const snippet = `\n\n![${id}](image:${id})\n\n`;
      editorRef.current?.insertAtCursor(snippet);
      showCopyHint(reused ? "已存在，已复用" : "已插入");
    } catch (err) {
      showCopyHint(err instanceof Error ? err.message : "插入失败");
    }
  }

  async function handleDeleteImage(id: string) {
    try {
      await deleteImageFromIDB(id);
      const nextMap = { ...imageMapRef.current };
      delete nextMap[id];
      imageMapRef.current = nextMap;
      setImageMap(nextMap);
      setMarkdown((m) => removeImageFromMarkdown(m, id));
      showCopyHint("已删除");
    } catch (err) {
      showCopyHint(err instanceof Error ? err.message : "删除失败");
    }
  }

  useEffect(() => {
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  const copyWechatDisabled = html.trim() === "" || isPending;
  const copyMarkdownDisabled = markdown.trim() === "" || isPending;

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
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => void handleImageFileChange(e)}
      />
      <Toolbar
        themes={THEMES}
        themeId={layoutId}
        onThemeIdChange={handleThemeIdChange}
        paletteId={paletteId}
        onPaletteIdChange={setPaletteId}
        paletteSwatchColors={resolvePaletteColors(layoutId, paletteId)}
        paletteDefaultSwatchColors={getDefaultColorsForLayout(layoutId)}
        primaryAccentColor={currentTheme.colors.primary}
        onImportMarkdown={handleImportMarkdownClick}
        onExportMarkdown={handleExportMarkdown}
        onInsertImage={handleInsertImageClick}
        onCopyWechat={() => void handleCopyWechat()}
        onCopyMarkdown={() => void handleCopyMarkdown()}
        copyWechatDisabled={copyWechatDisabled}
        copyMarkdownDisabled={copyMarkdownDisabled}
        copyHint={copyHint}
      />
      <ImageListPanel
        markdown={markdown}
        imageMap={imageMap}
        onDelete={(id) => void handleDeleteImage(id)}
      />
      <div className="flex min-h-0 flex-1">
        <EditorPane ref={editorRef} value={markdown} onChange={setMarkdown} />
        <PreviewPane html={html} isPending={isPending} />
      </div>
    </div>
  );
}
