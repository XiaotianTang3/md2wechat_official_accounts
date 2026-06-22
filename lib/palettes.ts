import type { ColorPalette, ColorPaletteId, LayoutThemeId, ThemeColors } from "@/types/theme";
import { DEFAULT_THEME_ID, LAYOUT_THEMES } from "@/lib/themes";
import { deriveDerivedTokens } from "@/lib/color";

export const PALETTES: ColorPalette[] = [
  { id: "default", name: "默认" },
  {
    id: "caramelCocoa",
    name: "焦糖·可可",
    description: "Brunello Cucinelli / Loro Piana 意式软奢。文化、人物、生活方式。",
    themes: ["editorial"],
    inspiration: ["Brunello Cucinelli", "Loro Piana"],
    colors: {
      primary: "#5A4030",
      accent: "#8B5A3C",
      dark: "#2A1F15",
      paper: "#F8F2E5",
      muted: "#8A7860",
    },
  },
  {
    id: "inkOxblood",
    name: "墨红·牛津黑",
    description: "Margaret Howell / Turnbull & Asser 牛津风。学术、评论、深度。",
    themes: ["editorial"],
    inspiration: ["Margaret Howell", "Turnbull & Asser"],
    colors: {
      primary: "#3A2A22",
      accent: "#6E2418",
      dark: "#1F1A14",
      paper: "#F5F0E8",
      muted: "#7A685C",
    },
  },
  {
    id: "ivoryInkBrass",
    name: "象牙·墨黑·黄铜",
    description: "Hermès / Chanel 编辑感。商业、财经、长论。",
    themes: ["editorial"],
    inspiration: ["Hermès", "Chanel"],
    colors: {
      primary: "#4A4239",
      accent: "#A8895E",
      dark: "#1F1A14",
      paper: "#F6F1E8",
      muted: "#8A7E6A",
    },
  },
  {
    id: "midnightInk",
    name: "午夜·深蓝",
    description: "晚点 LatePost / FT 中文网。科技、商业深度报道。",
    themes: ["editorial"],
    inspiration: ["晚点 LatePost", "FT 中文网"],
    colors: {
      primary: "#1F2A3D",
      dark: "#0E1622",
      accent: "#1F3A6B",
      muted: "#6E7787",
      paper: "#F1F0EC",
    },
  },
  {
    id: "oatTobacco",
    name: "燕麦·烟草·深棕",
    description: "Loro Piana / Bottega Veneta 深烟草。生活方式、文化随笔、深度长文。",
    themes: ["editorial"],
    inspiration: ["Loro Piana", "Bottega Veneta"],
    colors: {
      primary: "#5A3A20",
      accent: "#7C4A21",
      dark: "#2A1F12",
      paper: "#F0E5D0",
      muted: "#6E5040",
    },
  },
  {
    id: "stoneSage",
    name: "石色·鼠尾草·黄铜",
    description: "Aesop / Margaret Howell。设计、产品、文化深度。",
    themes: ["editorial"],
    inspiration: ["Aesop", "Margaret Howell"],
    colors: {
      primary: "#3D3833",
      accent: "#8E9476",
      dark: "#1C1A17",
      paper: "#E8E2D5",
      muted: "#7A7468",
    },
  },
  {
    id: "washiSumi",
    name: "和纸·墨·朱赤",
    description: "The Row / Hato Press 极简。文学、艺术、设计批评。",
    themes: ["editorial"],
    inspiration: ["The Row", "Hato Press"],
    colors: {
      primary: "#3D362F",
      accent: "#A83A2A",
      dark: "#1A1714",
      paper: "#F4EFE5",
      muted: "#8A7E70",
    },
  },
  {
    id: "inkGray",
    name: "墨黑灰",
    description: "适合正式长文。",
    colors: {
      primary: "#1F2937",
      accent: "#6B7280",
      dark: "#111827",
      paper: "#FFFFFF",
      muted: "#8A8F98",
    },
  },
  {
    id: "starBlue",
    name: "星空蓝",
    description: "适合科技分析、AI 产品文章。",
    colors: {
      primary: "#1E3A8A",
      accent: "#38BDF8",
      dark: "#0F172A",
      paper: "#F8FAFC",
      muted: "#64748B",
    },
  },
  {
    id: "teal",
    name: "松石绿",
    description: "适合教程、知识整理。",
    colors: {
      primary: "#0F766E",
      accent: "#2DD4BF",
      dark: "#134E4A",
      paper: "#F0FDFA",
      muted: "#5E7C78",
    },
  },
  {
    id: "filmBrown",
    name: "胶片棕",
    description: "适合个人随笔、故事、复盘。",
    colors: {
      primary: "#7C4A21",
      accent: "#D97706",
      dark: "#2F241D",
      paper: "#FFFBEB",
      muted: "#8B735C",
    },
  },
  {
    id: "violetMist",
    name: "紫雾",
    description: "适合 AI、未来感、轻科技内容。",
    colors: {
      primary: "#6D28D9",
      accent: "#A78BFA",
      dark: "#2E1065",
      paper: "#FAF5FF",
      muted: "#7C6A93",
    },
  },
  {
    id: "warmOrange",
    name: "暖橙",
    description: "适合方法论、经验总结、轻知识卡片。",
    colors: {
      primary: "#9A3412",
      accent: "#F97316",
      dark: "#292524",
      paper: "#FFF7ED",
      muted: "#78716C",
    },
  },
];

export function getDefaultColorsForLayout(layoutId: LayoutThemeId): ThemeColors {
  const layout =
    LAYOUT_THEMES.find((t) => t.id === layoutId) ??
    LAYOUT_THEMES.find((t) => t.id === DEFAULT_THEME_ID) ??
    LAYOUT_THEMES[0];
  return layout.defaultColors;
}

export function normalizeStoredPaletteId(raw: string | null): ColorPaletteId {
  if (raw === null || raw === "") return "default";
  const found = PALETTES.some((p) => p.id === raw);
  return (found ? raw : "default") as ColorPaletteId;
}

export function isPaletteValidForLayout(
  paletteId: ColorPaletteId,
  layoutId: LayoutThemeId,
): boolean {
  if (paletteId === "default") return true;
  const palette = PALETTES.find((p) => p.id === paletteId);
  if (!palette || !palette.themes || palette.themes.length === 0) return true;
  return palette.themes.includes(layoutId);
}

export function resolvePaletteColors(
  layoutId: LayoutThemeId,
  paletteId: ColorPaletteId,
): ThemeColors {
  const base =
    paletteId === "default"
      ? getDefaultColorsForLayout(layoutId)
      : PALETTES.find((p) => p.id === paletteId)?.colors ??
        getDefaultColorsForLayout(layoutId);
  // Always populate surface / border so themes can rely on them.
  return deriveDerivedTokens(base);
}

