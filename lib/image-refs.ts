import type { ImageMap } from "@/lib/image-map";

/** 解析 markdown 里所有 `image:filename[,size]` 引用，去重后返回。 */
export type ImageEntry = {
  id: string;
  filename: string;
  /** 当前 markdown 里的尺寸后缀。null = 全宽（无后缀）。 */
  currentSize: string | null;
  occurrences: number;
  /** ref 出现在 markdown 但 IndexedDB 里没有对应记录。 */
  hasMissing: boolean;
};

const REF_PATTERN = /\(image:([^,)]+)(?:,([^)]+))?\)/g;

export function parseImageRefs(md: string): ImageEntry[] {
  const seen = new Map<string, ImageEntry>();
  for (const m of md.matchAll(REF_PATTERN)) {
    const id = m[1];
    const size = m[2] || null;
    const existing = seen.get(id);
    if (existing) {
      existing.occurrences += 1;
    } else {
      seen.set(id, {
        id,
        filename: id,
        currentSize: size,
        occurrences: 1,
        hasMissing: false,
      });
    }
  }
  return Array.from(seen.values());
}

export function markMissing(entries: ImageEntry[], imageMap: ImageMap): void {
  for (const e of entries) {
    e.hasMissing = !imageMap[e.id];
  }
}
