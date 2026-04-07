import { NextResponse } from 'next/server';
import { NEXT_LOCALE_COOKIE_NAME, SUPPORTED_LOCALES } from '@/utils/locales.utils';

export async function POST(request: Request) {
  const body = await request.json();
  const locale = SUPPORTED_LOCALES.includes(body.locale) ? body.locale : SUPPORTED_LOCALES[0];

  const response = NextResponse.json({ locale });
  response.cookies.set(NEXT_LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
