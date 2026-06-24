import { useMemo } from "react";
import type { ImageMap } from "@/lib/image-map";
import { parseImageRefs } from "@/lib/image-refs";

type ImageListPanelProps = {
  markdown: string;
  imageMap: ImageMap;
  onDelete: (id: string) => void;
};

export function ImageListPanel({
  markdown,
  imageMap,
  onDelete,
}: ImageListPanelProps) {
  const entries = useMemo(() => parseImageRefs(markdown), [markdown]);

  if (entries.length === 0) return null;

  return (
    <div className="shrink-0 border-b border-zinc-200 bg-zinc-50 px-4 py-1.5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-xs font-medium text-zinc-500">
          图片（{entries.length}）
        </span>
        {entries.map((entry) => {
          const hasData = !!imageMap[entry.id];
          return (
            <span
              key={entry.id}
              className={[
                "inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 text-xs",
                hasData
                  ? "border-zinc-200 bg-white text-zinc-700"
                  : "border-red-200 bg-red-50 text-red-700",
              ].join(" ")}
              title={hasData ? entry.filename : "图片数据已丢失"}
            >
              <span className="max-w-[160px] truncate">{entry.filename}</span>
              {entry.occurrences > 1 ? (
                <span className="text-zinc-400">×{entry.occurrences}</span>
              ) : null}
              {!hasData ? (
                <span aria-label="图片数据已丢失" title="图片数据已丢失">
                  ⚠
                </span>
              ) : null}
              <button
                type="button"
                className="ml-0.5 text-zinc-400 hover:text-red-600"
                aria-label={`删除 ${entry.filename}`}
                title="删除"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm(`确定删除 ${entry.filename}？`)
                  ) {
                    onDelete(entry.id);
                  }
                }}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
