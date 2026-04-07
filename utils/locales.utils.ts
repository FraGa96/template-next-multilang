export const NEXT_LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en';
export type Locale = (typeof SUPPORTED_LOCALES)[number];