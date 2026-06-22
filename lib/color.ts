// Shared color-mixing utilities used by both the theme factories
// (`lib/themes.ts`) and the palette resolver (`lib/palettes.ts`).
// Previously lived as private helpers inside themes.ts; promoted to
// a shared module so palette resolution can derive `surface` and
// `border` tokens the same way themes consume them.

export function parseHex(hex: string): [number, number, number] {
  const s = hex.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}

export function mixColor(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

/**
 * Derive `surface` (paper minus ~10 L) and `border` (paper minus ~40 L)
 * from a palette's `paper` and `dark`. Used as a fallback when a palette
 * doesn't declare them explicitly. These are the same ratios the editorial
 * theme has used since v1; now they're exposed as tokens for all themes.
 */
export function deriveDerivedTokens<T extends { paper: string; dark: string }>(
  colors: T,
): T & { surface: string; border: string } {
  return {
    ...colors,
    surface:
      (colors as Record<string, unknown>).surface as string | undefined ??
      mixColor(colors.paper, colors.dark, 0.06),
    border:
      (colors as Record<string, unknown>).border as string | undefined ??
      mixColor(colors.paper, colors.dark, 0.18),
  };
}