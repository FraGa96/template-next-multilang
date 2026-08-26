export const NEXT_THEME_COOKIE_NAME = 'NEXT_THEME';
export const SUPPORTED_THEMES = ['light', 'dark'] as const;
export const DEFAULT_THEME = 'light';
export type Theme = (typeof SUPPORTED_THEMES)[number];

export function coerceTheme(
  candidate: string | undefined,
  fallback: Theme = DEFAULT_THEME,
): Theme {
  return SUPPORTED_THEMES.includes(candidate as Theme)
    ? (candidate as Theme)
    : fallback;
}
