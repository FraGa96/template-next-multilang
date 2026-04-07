import createMiddleware from 'next-intl/middleware';
import { MiddlewareFactory } from './middlewares.utils';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/utils/locales.utils';

export const withI18n: MiddlewareFactory = (next) => {
  return async (request, _next) => {
    const handleI18n = createMiddleware({
      locales: SUPPORTED_LOCALES,
      defaultLocale: DEFAULT_LOCALE,
      localePrefix: 'never'
    });
    const i18nResponse = handleI18n(request);

    const finalResponse = await next(request, _next);

    i18nResponse.headers.forEach((value, key) => {
      finalResponse?.headers?.set?.(key, value);
    });

    return finalResponse;
  };
};