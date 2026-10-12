export const THEME_STORAGE_KEY = 'bubufu.theme';

export type ThemePreference = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export function readThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light' || value === 'dark' || value === 'auto') return value;
  } catch {
    // Storage can be blocked. The page still follows the system.
  }
  return 'auto';
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'dark') return 'dark';
  if (preference === 'light') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolveTheme(preference);
}

export function writeTheme(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Apply for this page even when the preference cannot be stored.
  }
  applyTheme(preference);
  window.dispatchEvent(new Event('bubufu-theme'));
}
