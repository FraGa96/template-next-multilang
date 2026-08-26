export async function clearServiceWorkerCaches(): Promise<void> {
  if (!('caches' in window)) return;
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
}
