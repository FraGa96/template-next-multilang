import { NextResponse } from 'next/server';
import { NEXT_THEME_COOKIE_NAME, SUPPORTED_THEMES } from '@/utils/themes.utils';

export async function POST(request: Request) {
  const body = await request.json();
  const theme = SUPPORTED_THEMES.includes(body.theme) ? body.theme : SUPPORTED_THEMES[0];

  const response = NextResponse.json({ theme });
  response.cookies.set(NEXT_THEME_COOKIE_NAME, theme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
