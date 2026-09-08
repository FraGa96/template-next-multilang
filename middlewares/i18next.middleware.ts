import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { MiddlewareFactory } from './middlewares.utils';
import { DEFAULT_LOCALE, NEXT_LOCALE_COOKIE_NAME, SUPPORTED_LOCALES } from '@/utils/locales.utils';

export const withI18n: MiddlewareFactory = (next) => {
  return async (request, _next) => {
    const handleI18n = createMiddleware({
      locales: SUPPORTED_LOCALES,
      defaultLocale: DEFAULT_LOCALE,
      localePrefix: 'never'
    });
    const i18nResponse = handleI18n(request);

    const finalResponse = (await next(request, _next) ?? NextResponse.next()) as NextResponse;

    const localeCookie = i18nResponse.cookies.get(NEXT_LOCALE_COOKIE_NAME);
    if (localeCookie) {
      finalResponse.cookies.set(localeCookie);
    }

    return finalResponse;
  };
};