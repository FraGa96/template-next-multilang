import { getTranslations } from 'next-intl/server';

export default async function OfflinePage() {
  const t = await getTranslations('common.offline');

  return (
    <div
      role="status"
      className={
        'flex flex-1 flex-col items-center justify-center'
        + ' gap-2 p-8 text-center'
      }
    >
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
