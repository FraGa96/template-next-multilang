import type { MetadataRoute } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

const APP_DIR = join(process.cwd(), 'app');

const SEGMENT_SKIP = /^(_|\(|api$|components$|lib$)/;

function collectRoutes(dir: string, urlPath = ''): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });

  const hasPage = entries.some(
    (e) => e.isFile() && (e.name === 'page.tsx' || e.name === 'page.ts'),
  );

  const routes: string[] = hasPage ? [urlPath || '/'] : [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SEGMENT_SKIP.test(entry.name)) continue;
    if (entry.name.startsWith('[')) continue;

    const childPath = `${urlPath}/${entry.name}`;
    routes.push(...collectRoutes(join(dir, entry.name), childPath));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return collectRoutes(APP_DIR).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'monthly' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));
}
