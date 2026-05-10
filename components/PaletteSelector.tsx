import { useEffect, useMemo, useRef, useState } from "react";
import type { ColorPaletteId, ThemeColors } from "@/types/theme";
import { PALETTES } from "@/lib/palettes";

type PaletteSelectorProps = {
  value: ColorPaletteId;
  onChange: (id: ColorPaletteId) => void;
  currentSwatchColors: ThemeColors;
};

function SwatchDots({ colors }: { colors: ThemeColors }) {
  const dots = useMemo(
    () => [colors.primary, colors.accent, colors.paper],
    [colors],
  );
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {dots.map((c) => (
        <span
          key={c}
          className="h-2.5 w-2.5 rounded-full border border-zinc-300"
          style={{ backgroundColor: c }}
        />
      ))}
    </span>
  );
}

export function PaletteSelector({
  value,
  onChange,
  currentSwatchColors,
}: PaletteSelectorProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const currentLabel = useMemo(
    () => PALETTES.find((p) => p.id === value)?.name ?? "默认",
    [value],
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: MouseEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (e.target instanceof Node && !root.contains(e.target)) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 hover:bg-zinc-50"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <SwatchDots colors={currentSwatchColors} />
        <span>{currentLabel}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="配色风格"
          className="absolute left-0 top-full z-20 mt-2 w-56 rounded border border-zinc-200 bg-white p-1 shadow-lg"
        >
          <div className="px-2 py-2 text-xs font-medium text-zinc-600">
            配色风格
          </div>
          <div className="flex flex-col">
            {PALETTES.map((p) => {
              const pressed = p.id === value;
              const swatch =
                p.id === "default" || !p.colors ? currentSwatchColors : p.colors;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={pressed}
                  className={[
                    "flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm",
                    pressed
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-800 hover:bg-zinc-50",
                  ].join(" ")}
                  onClick={() => {
                    onChange(p.id);
                    setOpen(false);
                  }}
                >
                  <span className="w-4 text-zinc-700" aria-hidden>
                    {pressed ? "✓" : ""}
                  </span>
                  <span className="flex-1">{p.name}</span>
                  <SwatchDots colors={swatch} />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

