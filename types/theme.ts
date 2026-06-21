import type { CSSProperties } from "react";

export type LayoutThemeId =
  | "minimal"
  | "starship"
  | "studyDaily"
  | "xinhua"
  | "editorial";

export type ColorPaletteId =
  | "default"
  | "inkGray"
  | "starBlue"
  | "teal"
  | "filmBrown"
  | "violetMist"
  | "warmOrange"
  | "ivoryInkBrass"
  | "oatTobacco"
  | "stoneSage"
  | "washiSumi";

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
  /**
   * Restrict this palette to specific layout themes. Omit / empty = applies
   * to every theme. Premium palettes are scoped to `editorial` so the
   * warm-paper / accent-link design only ships where it was meant to live.
   */
  themes?: LayoutThemeId[];
};
