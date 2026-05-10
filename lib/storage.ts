export const STORAGE_KEY_DRAFT = "wechat-md-editor:draft";
export const STORAGE_KEY_THEME = "wechat-md-editor:theme";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadDraft(): string | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
    if (raw === null) return null;
    return raw;
  } catch {
    return null;
  }
}

export function saveDraft(markdown: string): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY_DRAFT, markdown);
  } catch {
    /* quota or private mode */
  }
}

export function loadThemeId(): string | null {
  if (!canUseStorage()) return null;
  try {
    return localStorage.getItem(STORAGE_KEY_THEME);
  } catch {
    return null;
  }
}

export function saveThemeId(themeId: string): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY_THEME, themeId);
  } catch {
    /* quota or private mode */
  }
}
