import type { LayoutTheme, LayoutThemeId, Theme, ThemeColors } from "@/types/theme";

const mono =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

function minimalStyles(c: ThemeColors): Theme["styles"] {
  const { dark, muted } = c;

  return {
    section: {
      margin: "0",
      padding: "0",
      backgroundColor: "#ffffff",
      color: dark,
      borderRadius: "0",
      border: "none",
      boxShadow: "none",
    },
    h1: {
      margin: "0 0 18px",
      padding: "0",
      color: dark,
      fontSize: "22px",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.03em",
    },
    h2: {
      margin: "36px 0 18px",
      padding: "0",
      color: dark,
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.45,
      letterSpacing: "0.02em",
    },
    h3: {
      margin: "28px 0 14px",
      padding: "0",
      color: dark,
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    p: {
      margin: "0 0 24px",
      color: "rgba(0,0,0,0.9)",
      fontSize: "17px",
      lineHeight: 1.6,
      letterSpacing: "0.034em",
      textAlign: "justify",
    },
    strong: {
      color: dark,
      fontWeight: 600,
    },
    em: {
      color: muted,
      fontStyle: "italic",
    },
    blockquote: {
      margin: "4px 0 24px",
      padding: "0 0 0 14px",
      borderLeft: "3px solid #D1D5DB",
      backgroundColor: "transparent",
      color: "#4B5563",
      fontSize: "16px",
      lineHeight: 1.75,
    },
    ul: {
      margin: "0 0 24px",
      paddingLeft: "1.35em",
      color: dark,
      fontSize: "17px",
      lineHeight: 1.7,
    },
    ol: {
      margin: "0 0 24px",
      paddingLeft: "1.35em",
      color: dark,
      fontSize: "17px",
      lineHeight: 1.7,
    },
    li: {
      margin: "0 0 8px",
    },
    a: {
      color: "#374151",
      textDecoration: "underline",
      textDecorationColor: "#9CA3AF",
      textUnderlineOffset: "3px",
    },
    code: {
      fontFamily: mono,
      fontSize: "0.9em",
      backgroundColor: "#F3F4F6",
      color: "#111827",
      padding: "0.12em 0.35em",
      borderRadius: "3px",
    },
    pre: {
      margin: "0 0 24px",
      padding: "14px 16px",
      backgroundColor: "#F6F7F8",
      color: "#111827",
      fontSize: "14px",
      lineHeight: 1.65,
      borderRadius: "4px",
      overflowX: "auto",
      fontFamily: mono,
      border: "1px solid #E5E7EB",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "8px 0 24px",
      fontSize: "15px",
      lineHeight: 1.6,
    },
    thead: {
      backgroundColor: "#F3F4F6",
      color: dark,
    },
    tbody: {
      backgroundColor: "#ffffff",
    },
    tr: {
      borderBottom: "1px solid #E5E7EB",
    },
    th: {
      padding: "9px 10px",
      textAlign: "left",
      fontWeight: 600,
      border: "1px solid #E5E7EB",
    },
    td: {
      padding: "9px 10px",
      border: "1px solid #E5E7EB",
      color: dark,
    },
    img: {
      display: "block",
      margin: "8px 0 24px",
      borderRadius: "2px",
    },
    hr: {
      margin: "36px 0",
      border: "none",
      borderTop: "1px solid #E5E7EB",
    },
  };
}

function starshipStyles(c: ThemeColors): Theme["styles"] {
  const { primary, accent, dark, muted } = c;

  return {
    section: {
      margin: "0",
      padding: "0",
      backgroundColor: "#ffffff",
      color: dark,
      borderRadius: "0",
      border: "none",
      boxShadow: "none",
    },
    h1: {
      margin: "0 0 18px",
      padding: "0",
      color: dark,
      fontSize: "22px",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.02em",
    },
    h2: {
      margin: "36px 0 16px",
      padding: "8px 16px",
      color: "#F8FAFC",
      backgroundColor: primary,
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "0.03em",
      borderRadius: "2px",
      borderLeft: `4px solid ${accent}`,
    },
    h3: {
      margin: "28px 0 14px",
      padding: "0 0 0 10px",
      color: primary,
      fontSize: "17px",
      fontWeight: 600,
      lineHeight: 1.5,
      borderLeft: `3px solid ${accent}`,
    },
    p: {
      margin: "0 0 20px",
      color: "#14161A",
      fontSize: "15px",
      lineHeight: 1.6,
      letterSpacing: "0.034em",
      textAlign: "justify",
    },
    strong: {
      color: primary,
      fontWeight: 600,
    },
    em: {
      color: muted,
      fontStyle: "italic",
    },
    blockquote: {
      margin: "24px 0",
      padding: "16px 20px",
      borderLeft: `4px solid ${accent}`,
      backgroundColor: "#EEF6FF",
      color: "#1E293B",
      fontSize: "15px",
      lineHeight: 1.6,
      borderRadius: "0 4px 4px 0",
    },
    ul: {
      margin: "0 0 20px",
      paddingLeft: "1.35em",
      color: dark,
      fontSize: "15px",
      lineHeight: 1.7,
    },
    ol: {
      margin: "0 0 20px",
      paddingLeft: "1.35em",
      color: dark,
      fontSize: "15px",
      lineHeight: 1.7,
    },
    li: {
      margin: "0 0 7px",
    },
    a: {
      color: primary,
      textDecoration: "underline",
      textDecorationColor: accent,
      textUnderlineOffset: "3px",
    },
    code: {
      fontFamily: mono,
      fontSize: "0.9em",
      backgroundColor: "#E0F2FE",
      color: "#075985",
      padding: "0.12em 0.4em",
      borderRadius: "3px",
    },
    pre: {
      margin: "0 0 20px",
      padding: "14px 16px",
      backgroundColor: "#0F172A",
      color: "#E0F2FE",
      fontSize: "14px",
      lineHeight: 1.6,
      borderRadius: "6px",
      overflowX: "auto",
      fontFamily: mono,
      border: "1px solid #1E3A8A",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "16px 0 24px",
      fontSize: "14px",
      lineHeight: 1.6,
    },
    thead: {
      backgroundColor: primary,
      color: "#F8FAFC",
    },
    tbody: {
      backgroundColor: "#FFFFFF",
    },
    tr: {
      borderBottom: "1px solid #D7E3F0",
    },
    th: {
      padding: "8px 12px",
      textAlign: "left",
      fontWeight: 700,
      border: "1px solid #D7E3F0",
    },
    td: {
      padding: "8px 12px",
      border: "1px solid #D7E3F0",
      color: "#14161A",
    },
    img: {
      display: "block",
      margin: "8px 0 24px",
      borderRadius: "4px",
    },
    hr: {
      margin: "36px 0",
      border: "none",
      borderTop: "1px solid #CBD5E1",
    },
  };
}

const MINIMAL_COLORS: ThemeColors = {
  primary: "#1F2937",
  accent: "#6B7280",
  dark: "#111827",
  paper: "#FFFFFF",
  muted: "#8A8F98",
};

const STARSHIP_COLORS: ThemeColors = {
  primary: "#1E3A8A",
  accent: "#38BDF8",
  dark: "#0F172A",
  paper: "#F8FAFC",
  muted: "#64748B",
};

export const LAYOUT_THEMES: LayoutTheme[] = [
  {
    id: "minimal",
    name: "极简长文",
    defaultColors: MINIMAL_COLORS,
    createStyles: minimalStyles,
  },
  {
    id: "starship",
    name: "星舰科技",
    defaultColors: STARSHIP_COLORS,
    createStyles: starshipStyles,
  },
];

export function createTheme(
  layoutId: LayoutThemeId,
  colors?: ThemeColors,
): Theme {
  const layout =
    LAYOUT_THEMES.find((t) => t.id === layoutId) ?? LAYOUT_THEMES[0];
  const finalColors = colors ?? layout.defaultColors;
  return {
    id: layout.id,
    name: layout.name,
    colors: finalColors,
    styles: layout.createStyles(finalColors),
  };
}

export const minimal = createTheme("minimal");

export const starship = createTheme("starship");

export const THEMES: Theme[] = [minimal, starship];

export const DEFAULT_THEME_ID = "minimal" as const;

export const DEFAULT_THEME =
  THEMES.find((t) => t.id === DEFAULT_THEME_ID) ?? minimal;
