import type { Theme, ThemeColors } from "@/types/theme";

const mono =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

function starryNightStyles(c: ThemeColors): Theme["styles"] {
  const { primary, accent, dark, paper, muted } = c;
  const codeBg = "#EDE8D8";
  const blockquoteBg = "#F2EFE4";
  const tbodyTint = "#FAF6EC";

  return {
    section: {
      margin: "0 0 1.25em",
      padding: "1em 1.1em",
      backgroundColor: paper,
      color: dark,
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(13, 27, 42, 0.08)",
      border: `1px solid ${codeBg}`,
    },
    h1: {
      margin: "0 0 0.65em",
      paddingBottom: "0.35em",
      borderBottom: `2px solid ${accent}`,
      color: dark,
      fontSize: "1.65em",
      fontWeight: 600,
      lineHeight: 1.35,
      letterSpacing: "-0.02em",
    },
    h2: {
      margin: "1.25em 0 0.5em",
      color: primary,
      fontSize: "1.35em",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h3: {
      margin: "1em 0 0.45em",
      color: primary,
      fontSize: "1.12em",
      fontWeight: 600,
      lineHeight: 1.45,
    },
    p: {
      margin: "0 0 0.9em",
      color: dark,
      fontSize: "16px",
      lineHeight: 1.75,
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
      margin: "0 0 1em",
      padding: "0.85em 1em",
      borderLeft: `4px solid ${accent}`,
      backgroundColor: blockquoteBg,
      color: dark,
      fontSize: "15px",
      lineHeight: 1.7,
      borderRadius: "0 6px 6px 0",
    },
    ul: {
      margin: "0 0 1em",
      paddingLeft: "1.35em",
      color: dark,
      lineHeight: 1.75,
    },
    ol: {
      margin: "0 0 1em",
      paddingLeft: "1.35em",
      color: dark,
      lineHeight: 1.75,
    },
    li: {
      margin: "0.35em 0",
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
      backgroundColor: codeBg,
      color: primary,
      padding: "0.15em 0.45em",
      borderRadius: "4px",
    },
    pre: {
      margin: "0 0 1em",
      padding: "1em 1.1em",
      backgroundColor: dark,
      color: paper,
      fontSize: "14px",
      lineHeight: 1.55,
      borderRadius: "8px",
      overflowX: "auto",
      fontFamily: mono,
      border: `1px solid ${primary}`,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "0 0 1em",
      fontSize: "15px",
      lineHeight: 1.6,
    },
    thead: {
      backgroundColor: primary,
      color: paper,
    },
    tbody: {
      backgroundColor: tbodyTint,
    },
    tr: {
      borderBottom: `1px solid ${codeBg}`,
    },
    th: {
      padding: "10px 12px",
      textAlign: "left",
      fontWeight: 600,
      border: `1px solid ${primary}`,
    },
    td: {
      padding: "10px 12px",
      border: `1px solid #E8E0D0`,
      color: dark,
    },
    img: {
      display: "block",
      margin: "0.75em 0",
      borderRadius: "4px",
    },
    hr: {
      margin: "1.5em 0",
      border: "none",
      borderTop: `1px solid ${muted}`,
      opacity: 0.85,
    },
  };
}

function minimalStyles(c: ThemeColors): Theme["styles"] {
  const { dark, paper, muted } = c;

  return {
    section: {
      margin: "0",
      padding: "0",
      backgroundColor: paper,
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
      backgroundColor: paper,
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

function warmCardStyles(c: ThemeColors): Theme["styles"] {
  const { primary, accent, dark, paper, muted } = c;

  return {
    section: {
      margin: "0",
      padding: "0",
      backgroundColor: paper,
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

const STARRY_COLORS: ThemeColors = {
  primary: "#1E3A5F",
  accent: "#F4A261",
  dark: "#0D1B2A",
  paper: "#F8F4E3",
  muted: "#6B7280",
};

const MINIMAL_COLORS: ThemeColors = {
  primary: "#1F2937",
  accent: "#6B7280",
  dark: "#111827",
  paper: "#FFFFFF",
  muted: "#8A8F98",
};

const WARM_COLORS: ThemeColors = {
  primary: "#1E3A8A",
  accent: "#38BDF8",
  dark: "#0F172A",
  paper: "#F8FAFC",
  muted: "#64748B",
};

export const starryNight: Theme = {
  id: "starryNight",
  name: "星夜手记",
  colors: STARRY_COLORS,
  styles: starryNightStyles(STARRY_COLORS),
};

export const minimal: Theme = {
  id: "minimal",
  name: "极简长文",
  colors: MINIMAL_COLORS,
  styles: minimalStyles(MINIMAL_COLORS),
};

export const warmCard: Theme = {
  id: "warmCard",
  name: "星舰科技",
  colors: WARM_COLORS,
  styles: warmCardStyles(WARM_COLORS),
};

export const THEMES: Theme[] = [starryNight, minimal, warmCard];

export const DEFAULT_THEME_ID = "starryNight" as const;

export const DEFAULT_THEME =
  THEMES.find((t) => t.id === DEFAULT_THEME_ID) ?? starryNight;
