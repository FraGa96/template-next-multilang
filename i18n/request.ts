import { NEXT_LOCALE_COOKIE_NAME } from '@/utils/locales.utils';
import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get(NEXT_LOCALE_COOKIE_NAME)?.value || 'en';
  const messages = (await import(`../locales/${locale}.ts`)).default;

  return {
    locale,
    messages,
  };
});
