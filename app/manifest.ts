import type { MetadataRoute } from 'next';

// Replace name/short_name/description and drop real icon-192.png / icon-512.png
// files into public/ before shipping this as an installable PWA.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js Multilanguage Template',
    short_name: 'Template',
    description: 'A modern, production-ready multilingual Next.js template.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
