import { listImages, putImage, type ImageRecord } from "@/lib/image-store";

/** 2MB 单图上限。base64 编码后约 2.7MB，IndexedDB 没有 5MB localStorage 那样的硬限制，但仍设一道护栏。 */
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export type ImageRef = {
  /** id 与 filename 相同；id 是 markdown 里的 ref 标识，filename 给用户看。 */
  id: string;
  filename: string;
  dataUrl: string;
};

export type ImageMap = Record<string, ImageRef>;

/** 把 Blob 读成 base64 data URL。预览 / 复制前的中间表示。 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("无法读取图片"));
    };
    reader.onerror = () => reject(reader.error ?? new Error("读取图片失败"));
    reader.readAsDataURL(blob);
  });
}

/** base64 data URL 反向变 Blob（用于把历史草稿里的 data URL 迁到 IndexedDB）。 */
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

/** 启动时从 IndexedDB 读全部图片，构建 filename → dataUrl map。 */
export async function loadImageMap(): Promise<ImageMap> {
  const records = await listImages();
  const map: ImageMap = {};
  await Promise.all(
    records.map(async (r) => {
      const dataUrl = await blobToDataUrl(r.blob);
      map[r.id] = { id: r.id, filename: r.filename, dataUrl };
    }),
  );
  return map;
}

/** 把 markdown 里的 `image:filename` 引用替换成 data URL，供 remark 渲染。未知 ref 原样保留，remark 会渲染成坏链接。 */
export function substituteRefsInMarkdown(md: string, map: ImageMap): string {
  return md.replace(/\(image:([^)]+)\)/g, (match, id) => {
    const ref = map[id];
    return ref ? `(${ref.dataUrl})` : match;
  });
}

/**
 * 复制到公众号时，把 HTML 里的 `<img src="data:...">` 整段替换成占位提示。
 * plain text fallback 也用同一段文字，确保粘贴后用户能找到要手动上传的位置。
 */
export function replaceImgsWithMarkers(
  html: string,
  map: ImageMap,
): { html: string; plainTextMarker: string } {
  const dataUrlToFilename = new Map<string, string>();
  for (const ref of Object.values(map)) {
    dataUrlToFilename.set(ref.dataUrl, ref.filename);
  }

  const htmlReplaced = html.replace(
    /<img[^>]*src="([^"]*)"[^>]*\/?>/g,
    (_match, src: string) => {
      const filename = dataUrlToFilename.get(src) ?? "图片";
      const marker = `[请手动上传图片] ${filename}`;
      // 醒目的琥珀色提示块：亮黄背景 + 深色文字 + 加粗 + 粗左侧色条 + 轻微边框。
      // 公众号粘贴时 inline style 整体保留，确保用户在长文里一眼能找到。
      return (
        `<p style="margin:1.2em 0;padding:1em 1.2em;` +
        `background:#fff3cd;border:2px solid #f59e0b;` +
        `border-left:6px solid #d97706;` +
        `color:#854d0e;font-size:0.95em;font-weight:700;` +
        `letter-spacing:0.02em;">${marker}</p>`
      );
    },
  );

  return { html: htmlReplaced, plainTextMarker: "[图片]" };
}

/**
 * 解决文件重名：内容相同则复用现有 id；不同则依次尝试 `-2`、`-3` …
 * 返回新 id（已确认 IDB 里不存在冲突），并把记录 put 进 IndexedDB。
 */
export async function insertImage(
  filename: string,
  blob: Blob,
  existing: ImageMap,
): Promise<{ id: string; dataUrl: string; reused: boolean }> {
  if (blob.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `图片太大（${formatBytes(blob.size)} > ${formatBytes(MAX_IMAGE_BYTES)}），请压缩后重试`,
    );
  }
  if (!blob.type.startsWith("image/")) {
    throw new Error("不是图片文件");
  }
  const dataUrl = await blobToDataUrl(blob);

  // 同名 + 同内容 → 复用
  const exact = existing[filename];
  if (exact && exact.dataUrl === dataUrl) {
    return { id: filename, dataUrl, reused: true };
  }

  // 同名但内容不同 → 追加 -2 / -3 …
  let id = filename;
  if (exact) {
    const dot = filename.lastIndexOf(".");
    const base = dot >= 0 ? filename.slice(0, dot) : filename;
    const ext = dot >= 0 ? filename.slice(dot) : "";
    for (let n = 2; n < 1000; n += 1) {
      const candidate = `${base}-${n}${ext}`;
      if (!existing[candidate]) {
        id = candidate;
        break;
      }
    }
  }

  const record: ImageRecord = {
    id,
    filename: id,
    blob,
    size: blob.size,
    addedAt: Date.now(),
  };
  await putImage(record);
  return { id, dataUrl, reused: false };
}

/**
 * 从 markdown 里删除某个 image: 引用，包括该 ref 所在行。
 * 顺带把 3+ 个连续换行压缩成 2 个（避免删除后留大段空行）。
 */
export function removeImageFromMarkdown(md: string, id: string): string {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // 匹配整段 ![alt](image:id[,size])，前面可有空白，后面可有空白/换行
  const refRegex = new RegExp(
    `\\s*!?\\[[^\\]]*\\]\\(image:${escaped}(?:,[^)]+)?\\)\\s*`,
    "g",
  );
  const cleaned = md.replace(refRegex, " ");
  return cleaned.replace(/\n{3,}/g, "\n\n");
}

/** 把历史草稿里的 data URL 提取出来，迁到 IndexedDB。返回迁移后的 markdown 和新 map。 */
export async function migrateDataUrlsInDraft(
  md: string,
  existing: ImageMap,
): Promise<{ md: string; addedToMap: ImageMap }> {
  const dataUrlRegex = /!\[([^\]]*)\]\((data:image\/[^)]+)\)/g;
  const matches = [...md.matchAll(dataUrlRegex)];
  if (matches.length === 0) return { md, addedToMap: {} };

  const addedToMap: ImageMap = {};
  let nextMd = md;

  for (const m of matches) {
    const alt = m[1];
    const dataUrl = m[2];
    try {
      const blob = await dataUrlToBlob(dataUrl);
      const result = await insertImage(alt || `migrated-${Date.now()}.png`, blob, {
        ...existing,
        ...addedToMap,
      });
      addedToMap[result.id] = {
        id: result.id,
        filename: result.id,
        dataUrl: result.dataUrl,
      };
      nextMd = nextMd.replace(m[0], `![${alt}](image:${result.id})`);
    } catch {
      // 迁移失败保留原 markdown，不阻塞启动
    }
  }

  return { md: nextMd, addedToMap };
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
