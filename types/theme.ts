import type { CSSProperties } from "react";

export type LayoutThemeId = "minimal" | "starship" | "studyDaily" | "xinhua";

export type ColorPaletteId =
  | "default"
  | "inkGray"
  | "starBlue"
  | "teal"
  | "filmBrown"
  | "violetMist"
  | "warmOrange";

// Phase 1: UI still selects a single "theme" (layout).
export type ThemeId = LayoutThemeId;

export type ThemeColors = {
  primary: string;
  accent: string;
  dark: string;
  paper: string;
  muted: string;
};

export type Theme = {
  id: LayoutThemeId;
  name: string;
  colors: ThemeColors;
  styles: Partial<Record<string, CSSProperties>>;
};

export type LayoutTheme = {
  id: LayoutThemeId;
  name: string;
  defaultColors: ThemeColors;
  createStyles: (colors: ThemeColors) => Theme["styles"];
};

export type ColorPalette = {
  id: ColorPaletteId;
  name: string;
  description?: string;
  /** `default` intentionally has no fixed colors. */
  colors?: ThemeColors;
};
