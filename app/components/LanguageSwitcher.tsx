'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  NEXT_LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  type Locale,
} from '@/utils/locales.utils';

function getCurrentLocale(): Locale {
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${NEXT_LOCALE_COOKIE_NAME}=`))
    ?.split('=')[1];

  return (SUPPORTED_LOCALES.includes(cookieValue as Locale)
    ? (cookieValue as Locale)
    : SUPPORTED_LOCALES[0]);
}

export default function LanguageSwitcher({ label }: { label: string }) {
  const [lang, setLang] = useState<Locale>(SUPPORTED_LOCALES[0]);
  const router = useRouter();

  useEffect(() => {
    setLang(getCurrentLocale());
  }, []);

  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;

    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: nextLocale }),
    });

    setLang(nextLocale);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 md:w-39.5">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        {label}
      </label>

      <select
        value={lang}
        onChange={handleChange}
        className={'h-12 w-full rounded-full border border-black/8'
          + ' bg-white px-4 text-base text-black outline-none'
          + ' transition hover:border-black/30 dark:border-white/[.145]'
          + ' dark:bg-zinc-950 dark:text-zinc-50'}
      >
        {SUPPORTED_LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
