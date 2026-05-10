import type { Theme } from "@/types/theme";

type ThemeSelectorProps = {
  themes: Theme[];
  value: string;
  onChange: (id: string) => void;
};

export function ThemeSelector({ themes, value, onChange }: ThemeSelectorProps) {
  return (
    <select
      className="rounded border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900"
      value={value}
      aria-label="选择主题"
      onChange={(e) => onChange(e.target.value)}
    >
      {themes.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
