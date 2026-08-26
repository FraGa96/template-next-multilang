import { cookies } from 'next/headers';
import { NEXT_THEME_COOKIE_NAME, coerceTheme, type Theme } from '@/utils/themes.utils';

export async function getResolvedTheme(): Promise<Theme> {
  const cookieTheme = (await cookies()).get(NEXT_THEME_COOKIE_NAME)?.value;
  return coerceTheme(cookieTheme);
}
