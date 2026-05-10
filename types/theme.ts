import type { CSSProperties } from "react";

export type ThemeColors = {
  primary: string;
  accent: string;
  dark: string;
  paper: string;
  muted: string;
};

export type ThemeId = "starryNight" | "minimal" | "warmCard";

export type Theme = {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
  styles: Partial<Record<string, CSSProperties>>;
};
